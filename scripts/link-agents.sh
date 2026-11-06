#!/bin/bash
# link-agents.sh: liga os agentes locais ao repo central totum-house/skills.
# Idempotente. Nunca apaga: o que for substituído vai para quarentena com timestamp.
# Compatível com bash 3.2 (macOS).
#
# Uso: scripts/link-agents.sh [--dry-run]
#
# Alvos (formato do nome da pasta no agente):
#   opencode -> ~/.opencode/skills/<categoria>--<sub>--<skill>   (symlink)
#   hermes   -> ~/.hermes/skills/<skill>                          (symlink)
#   codex    -> ~/.codex/skills/<skill>                           (symlink)
#   claude   -> ~/.claude/skills: só move para quarentena as cópias soltas
#               que o repo já entrega via plugin (marketplace totum-house).

set -u
REPO="$(cd "$(dirname "$0")/.." && pwd)"
DRY=0; [ "${1:-}" = "--dry-run" ] && DRY=1
TS="$(date +%Y%m%d-%H%M%S)"
QUAR="$HOME/.skills-quarentena/$TS"
LIST="$(mktemp)"
CRIADOS=0; ATUALIZADOS=0; QUARENTENA=0; PULADOS=0

run() { if [ $DRY = 1 ]; then echo "  [dry] $*"; else "$@"; fi; }

quarentena() { # $1 caminho, $2 agente
  local dest="$QUAR/$2"
  run mkdir -p "$dest"
  run mv "$1" "$dest/"
  QUARENTENA=$((QUARENTENA+1))
  echo "  quarentena: $1 -> $dest/"
}

# 1) inventário das skills do repo (pastas com SKILL.md)
( cd "$REPO" && find . -name SKILL.md \
    -not -path './.git/*' -not -path './mods/*' -not -path './.local/*' \
  | sed 's|/SKILL.md$||;s|^\./||' | sort ) > "$LIST"
TOTAL=$(wc -l < "$LIST" | tr -d ' ')
echo "Repo: $REPO ($TOTAL skills)"

link_um() { # $1 dir_alvo, $2 nome, $3 caminho_repo, $4 agente
  local alvo="$1/$2" origem="$REPO/$3"
  if [ -L "$alvo" ]; then
    if [ "$(readlink "$alvo")" != "$origem" ]; then
      run ln -sfn "$origem" "$alvo"; ATUALIZADOS=$((ATUALIZADOS+1))
    fi
  elif [ -e "$alvo" ]; then
    if [ -d "$alvo" ] && [ ! -f "$alvo/SKILL.md" ]; then
      echo "  pulado (pasta de categoria do agente): $alvo"; PULADOS=$((PULADOS+1)); return
    fi
    quarentena "$alvo" "$4"
    run ln -s "$origem" "$alvo"; CRIADOS=$((CRIADOS+1))
  else
    run ln -s "$origem" "$alvo"; CRIADOS=$((CRIADOS+1))
  fi
}

limpar_quebrados() { # $1 dir_alvo, $2 agente: links que apontam pro repo e sumiram
  local l
  for l in "$1"/*; do
    [ -L "$l" ] || continue
    case "$(readlink "$l")" in "$REPO"/*) [ -e "$l" ] || quarentena "$l" "$2" ;; esac
  done
}

# 2) agentes com symlink
for agente in opencode hermes codex; do
  case $agente in
    opencode) DIR="$HOME/.opencode/skills" ;;
    hermes)   DIR="$HOME/.hermes/skills" ;;
    codex)    DIR="$HOME/.codex/skills" ;;
  esac
  [ -d "$(dirname "$DIR")" ] || { echo "== $agente: não instalado, pulando"; continue; }
  run mkdir -p "$DIR"
  echo "== $agente ($DIR)"
  while read -r p; do
    if [ $agente = opencode ]; then nome="$(echo "$p" | sed 's|/|--|g')"; else nome="$(basename "$p")"; fi
    link_um "$DIR" "$nome" "$p" "$agente"
  done < "$LIST"
  limpar_quebrados "$DIR" "$agente"
done

# 3) hermes: cópias antigas com prefixo totum- de skills que o repo já tem
if [ -d "$HOME/.hermes/skills" ]; then
  while read -r p; do
    b="$(basename "$p")"
    for dup in "totum-$b" "totum-totum-$b"; do
      d="$HOME/.hermes/skills/$dup"
      [ -d "$d" ] && [ ! -L "$d" ] && quarentena "$d" hermes-duplicatas
    done
  done < "$LIST"
  # guia-code foi fundida na karpathy-guidelines
  [ -d "$HOME/.hermes/skills/totum-guia-code" ] && quarentena "$HOME/.hermes/skills/totum-guia-code" hermes-duplicatas
fi

# 4a) claude: sobe versão e atualiza os plugins cujo conteúdo mudou
if [ -f "$REPO/scripts/claude-plugins-refresh.py" ]; then
  echo "== claude plugins (marketplace totum-house)"
  if [ $DRY = 1 ]; then /usr/bin/python3 "$REPO/scripts/claude-plugins-refresh.py" --dry-run
  else /usr/bin/python3 "$REPO/scripts/claude-plugins-refresh.py"; fi
fi

# 4b) claude: o Claude Code recebe as skills pelo marketplace totum-house (plugins).
#    Só tira da frente as cópias/links soltos se os plugins já estiverem instalados,
#    senão o Claude Code ficaria sem as skills.
IP="$HOME/.claude/plugins/installed_plugins.json"
if [ -d "$HOME/.claude/skills" ]; then
  if [ -f "$IP" ] && grep -q '@totum-house' "$IP"; then
    echo "== claude (~/.claude/skills: plugins totum-house instalados, removendo duplicatas soltas)"
    while read -r p; do
      for nome in "$(echo "$p" | sed 's|/|--|g')" "$(basename "$p")"; do
        d="$HOME/.claude/skills/$nome"
        { [ -e "$d" ] || [ -L "$d" ]; } && quarentena "$d" claude
      done
    done < "$LIST"
    limpar_quebrados "$HOME/.claude/skills" claude
  else
    echo "== claude: plugins totum-house não instalados, mantendo ~/.claude/skills como está"
  fi
fi

rm -f "$LIST"
echo "Resumo: criados=$CRIADOS atualizados=$ATUALIZADOS quarentena=$QUARENTENA pulados=$PULADOS"
[ $QUARENTENA -gt 0 ] && echo "Quarentena em: $QUAR"
exit 0
