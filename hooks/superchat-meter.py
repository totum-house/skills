#!/usr/bin/env python3
"""
superchat-meter: hook UserPromptSubmit do plugin totum-skills.

A cada mensagem do usuario, le o transcript da sessao (JSONL), conta
mensagens e tokens reais (campo usage da API) e:
  - injeta uma linha curta de status no contexto do Claude;
  - quando cruza um nivel (amarelo/laranja/vermelho), manda o Claude
    acionar a skill superchat-totum e mostra um aviso ao usuario.

Funciona onde hooks de plugin rodam: Claude Code e Cowork.
Nao roda no chat comum do claude.ai (la nao existe hook).

Config por variavel de ambiente (opcional):
  TOTUM_CONTEXT_WINDOW   janela em tokens (padrao: auto, 200k ou 1M;
                         auto e hipotese, fixe o valor se souber)
  TOTUM_SUPERCHAT_QUIET  "1" = so fala quando cruzar nivel
"""
import json, os, sys

LEVELS = [  # (nome, % janela, turnos)
    ("VERMELHO", 0.90, 60),
    ("LARANJA", 0.75, 45),
    ("AMARELO", 0.50, 30),
]
ORDER = {None: 0, "AMARELO": 1, "LARANJA": 2, "VERMELHO": 3}
ICON = {"AMARELO": "🟡", "LARANJA": "🟠", "VERMELHO": "🔴"}


def is_real_user_msg(entry):
    if entry.get("type") != "user" or entry.get("isMeta") or entry.get("isSidechain"):
        return False
    content = (entry.get("message") or {}).get("content")
    if isinstance(content, str):
        return not content.startswith("<command-") and bool(content.strip())
    if isinstance(content, list):
        # tool_result tambem chega como "user"; so conta se tiver texto/imagem
        return any(isinstance(b, dict) and b.get("type") in ("text", "image") for b in content)
    return False


STOP = set("""
para pela pelo como mais isso esse essa este esta aqui agora tambem entao porque quando onde
voce voces vamos fazer quero preciso pode podemos sobre depois antes ainda muito tudo todos
coisa coisas assim mesmo qual quais ficar fica deixa deixar seria seja sendo tenho temos
""".split())


def user_text(entry):
    c = (entry.get("message") or {}).get("content")
    if isinstance(c, str):
        return c
    if isinstance(c, list):
        return " ".join(b.get("text", "") for b in c if isinstance(b, dict) and b.get("type") == "text")
    return ""


def keywords(texts):
    import re
    words = re.findall(r"[a-zA-Z\u00C0-\u00ff0-9_-]{5,}", " ".join(texts).lower())
    return {w for w in words if w not in STOP}


def recommend(user_msgs, compactions):
    """compact = mesmo assunto; superchat = assunto mudou ou ja compactou."""
    if compactions:
        return "superchat", "ja houve compactacao; compactar de novo perde mais detalhe"
    if len(user_msgs) < 6:
        return "compact", "poucas mensagens para medir mudanca de assunto"
    k = max(2, len(user_msgs) // 3)
    early, late = keywords(user_msgs[:k]), keywords(user_msgs[-3:])
    if not early or not late:
        return "compact", "texto insuficiente para comparar"
    overlap = len(early & late) / max(1, min(len(early), len(late)))
    if overlap < 0.15:
        return "superchat", f"assunto mudou (sobreposicao de termos {overlap:.0%})"
    return "compact", f"mesmo assunto (sobreposicao de termos {overlap:.0%})"


def scan(path):
    turns, last_ctx, out_total, compactions, first_ctx = 0, 0, 0, 0, 0
    user_msgs = []
    seen = {}
    with open(path, encoding="utf-8", errors="ignore") as f:
        for line in f:
            try:
                e = json.loads(line)
            except Exception:
                continue
            if e.get("type") == "system" and e.get("subtype") == "compact_boundary":
                compactions += 1
            if is_real_user_msg(e):
                turns += 1
                t = user_text(e)
                if t and not t.lstrip().startswith("<"):
                    user_msgs.append(t[:2000])
            if e.get("type") == "assistant" and not e.get("isSidechain"):
                msg = e.get("message") or {}
                u = msg.get("usage") or {}
                if not u:
                    continue
                ctx = (u.get("input_tokens", 0) + u.get("cache_creation_input_tokens", 0)
                       + u.get("cache_read_input_tokens", 0) + u.get("output_tokens", 0))
                if ctx:
                    last_ctx = ctx
                    first_ctx = first_ctx or ctx
                seen[msg.get("id") or id(e)] = u.get("output_tokens", 0)
    out_total = sum(seen.values())
    return turns, last_ctx, out_total, compactions, first_ctx, user_msgs


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return
    path = data.get("transcript_path")
    if not path or not os.path.exists(path):
        return
    turns, ctx, out_total, compactions, base, user_msgs = scan(path)
    rec, why = recommend(user_msgs, compactions)
    turns += 1  # a mensagem que esta chegando agora

    env_win = os.environ.get("TOTUM_CONTEXT_WINDOW")
    # Hipotese: sessao que ja nasce com >100k (muita tool/skill carregada, tipico do
    # Cowork) ou que passou de 200k so faz sentido numa janela de 1M.
    if env_win and env_win.isdigit():
        window = int(env_win)
    else:
        window = 1_000_000 if (ctx > 200_000 or base > 100_000) else 200_000
    pct = ctx / window if window else 0

    level = None
    for name, p, t in LEVELS:
        if pct >= p or turns >= t or (compactions and name == "VERMELHO"):
            level = name
            break

    # estado por sessao para avisar so uma vez por nivel
    sid = data.get("session_id") or os.path.basename(path)
    state_dir = os.path.join(os.path.expanduser("~"), ".claude", "superchat-totum")
    state_file = os.path.join(state_dir, f"{sid}.json")
    try:
        prev = json.load(open(state_file)).get("level")
    except Exception:
        prev = None

    status = (f"[superchat-meter] turno {turns} | contexto {ctx:,} tok "
              f"(~{pct:.0%} de {window:,}) | saida acumulada {out_total:,} tok"
              f" | base inicial {base:,} tok"
              f"{' | compactado ' + str(compactions) + 'x' if compactions else ''}").replace(",", ".")

    out = {}
    if level and ORDER[level] > ORDER[prev]:
        out["systemMessage"] = f"{ICON[level]} Superchat: {status.split('] ')[1]}"
        acao = ("/compact (no Claude Code; foque no que importa, ex: /compact foca nas decisoes e arquivos)"
                if rec == "compact" else "superchat: CHECKPOINT + chat novo")
        out["systemMessage"] += f" | recomendado: {'/compact' if rec == 'compact' else 'superchat'} ({why})"
        ctx_msg = (f"{status}\nNIVEL {level} atingido (medicao real via hook, nao estimativa). "
                   f"Recomendacao do hook: {acao}. Motivo: {why}. "
                   "Antes de responder ao pedido, acione a skill superchat-totum na FASE 1: "
                   "mostre o alerta com esses numeros e a recomendacao, e pergunte se o usuario "
                   "quer seguir com ela. Nunca migre sem confirmacao. "
                   "Depois responda normalmente ao que foi pedido.")
        try:
            os.makedirs(state_dir, exist_ok=True)
            json.dump({"level": level, "turns": turns, "ctx": ctx}, open(state_file, "w"))
        except Exception:
            pass
    elif os.environ.get("TOTUM_SUPERCHAT_QUIET") == "1":
        return
    else:
        ctx_msg = status
    out["hookSpecificOutput"] = {"hookEventName": "UserPromptSubmit", "additionalContext": ctx_msg}
    print(json.dumps(out, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass  # hook nunca pode travar o chat
    sys.exit(0)
