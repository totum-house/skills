#!/usr/bin/env python3
"""
Mede quanto cada fonte pesa na "base" de uma sessao Claude (o que entra no
contexto antes de voce digitar). Uso:
    python3 scripts/auditar-base-tokens.py ~/.claude/projects/<pasta>/<sessao>.jsonl
Estimativa: 1 token ~ 3,5 caracteres (descricoes) / 3 (nomes de tool).
Depende dos registros prompt_snapshot/skill_listing do transcript (Cowork e
Claude Code recentes). Se faltar algum, a secao sai vazia.
"""
import json, sys, collections

T = lambda n, d=3.5: round(n / d)
A = collections.defaultdict(list)
for line in open(sys.argv[1], encoding="utf-8", errors="ignore"):
    try:
        a = json.loads(line).get("attachment")
    except Exception:
        continue
    if a:
        A[a.get("type")].append(a)

rows = collections.Counter()
snap = [p for p in A.get("prompt_snapshot", []) if "tools" in p]
if snap:
    rows["(fixo) system prompt"] += T(len(json.dumps(snap[-1]["systemPrompt"])))
    for t in snap[-1]["tools"]:
        n = t.get("name", "")
        k = "tools: " + (n.split("__")[1] if n.startswith("mcp__") else "nativas (fixo)")
        rows[k] += T(len(json.dumps(t)))
sl = [s for s in A.get("skill_listing", []) if s.get("isInitial")] or A.get("skill_listing", [])
if sl:
    for ln in sl[0]["content"].splitlines():
        if ln.startswith("- "):
            head = ln[2:].split(" ", 1)[0]
            rows["skills: " + (head.split(":")[0] if head.count(":") >= 2 or ":" in head[:-1] else "sem prefixo")] += T(len(ln))
for d in A.get("mcp_instructions_delta", [])[:1]:
    for b in d.get("addedBlocks", []):
        s = b if isinstance(b, str) else json.dumps(b)
        rows["instrucoes MCP: " + s.split("\n", 1)[0].strip("# ")] += T(len(s))
for d in A.get("deferred_tools_delta", [])[:1]:
    for n in d.get("addedNames", []):
        rows["nomes de tools: " + (n.split("__")[1] if n.startswith("mcp__") else "nativas")] += T(len(n) + 1, 3.0)
for h in A.get("hook_additional_context", [])[:3]:
    rows["hooks SessionStart"] += T(len(json.dumps(h)))

total = sum(rows.values())
print(f"BASE ESTIMADA: ~{total:,} tokens\n".replace(",", "."))
# agrupa por servidor/plugin para decidir o que desligar
grp = collections.Counter()
for k, v in rows.items():
    grp[k.split(": ", 1)[-1].lower().replace("_", "-")] += v
print("Por fonte (somando tools + instrucoes + nomes + skills):")
for k, v in grp.most_common(30):
    print(f"  {k:40} ~{v:>6,}  ({v/total:.0%})".replace(",", "."))
