#!/usr/bin/env python3
"""claude-plugins-refresh.py: mantém os plugins do marketplace totum-house no
Claude Code iguais ao clone local.

O Claude Code copia cada plugin para ~/.claude/plugins/cache/<marketplace>/<plugin>/<versão>
e só troca a cópia quando a versão sobe. Este script compara as pastas de cada plugin
instalado com o cache; se o conteúdo mudou, sobe a versão patch no marketplace.json
e roda `claude plugin marketplace update` + `claude plugin update`.

Uso: scripts/claude-plugins-refresh.py [--dry-run]
Não faz commit: a tarefa de sync commita a mudança de versão.
"""
import filecmp, json, os, shutil, subprocess, sys
from pathlib import Path

DRY = "--dry-run" in sys.argv
REPO = Path(__file__).resolve().parent.parent
MKT = "totum-house"
HOME = Path.home()
IGN = {".git", ".DS_Store", ".local", "__pycache__"}

def claude_bin():
    for c in (shutil.which("claude"), str(HOME / ".local/bin/claude")):
        if c and os.path.exists(c):
            return c
    return None

def differ(a: Path, b: Path) -> bool:
    if not a.exists() or not b.exists():
        return a.exists() != b.exists()
    d = filecmp.dircmp(a, b, ignore=list(IGN))
    def walk(x):
        if x.left_only or x.right_only or x.funny_files:
            return True
        _, mism, errs = filecmp.cmpfiles(x.left, x.right, x.common_files, shallow=False)
        if mism or errs:
            return True
        return any(walk(s) for s in x.subdirs.values())
    return walk(d)

def main():
    ip = HOME / ".claude/plugins/installed_plugins.json"
    if not ip.exists():
        print("claude: installed_plugins.json não encontrado, pulando"); return 0
    inst = json.loads(ip.read_text()).get("plugins", {})
    mp_path = REPO / ".claude-plugin/marketplace.json"
    mp = json.loads(mp_path.read_text(encoding="utf-8"))
    bumped = []
    for p in mp["plugins"]:
        key = f'{p["name"]}@{MKT}'
        if key not in inst or not inst[key]:
            continue
        cache = Path(inst[key][0]["installPath"])
        dirs = list(p.get("skills") or [])
        if p.get("hooks"):
            dirs.append("./hooks")
        changed = [d for d in dirs if differ(REPO / d, cache / d)]
        if changed or not cache.exists():
            a = [int(x) for x in p.get("version", "1.0.0").split(".")]
            new = f"{a[0]}.{a[1]}.{a[2] + 1}"
            print(f"{p['name']}: {p.get('version')} -> {new} (mudou: {', '.join(changed) or 'cache ausente'})")
            p["version"] = new
            bumped.append(p["name"])
    if not bumped:
        print("claude: plugins totum-house já iguais ao repo"); return 0
    if DRY:
        print("[dry] nada gravado"); return 0
    mp_path.write_text(json.dumps(mp, ensure_ascii=False, indent=4) + "\n", encoding="utf-8")
    cb = claude_bin()
    if not cb:
        print("claude: CLI não encontrado; versões subiram mas o update fica pendente"); return 1
    subprocess.run([cb, "plugin", "marketplace", "update", MKT], check=False)
    falhas = []
    for n in bumped:
        r = subprocess.run([cb, "plugin", "update", f"{n}@{MKT}"], capture_output=True, text=True)
        print(f"update {n}: {'ok' if r.returncode == 0 else 'FALHOU'} {r.stdout.strip().splitlines()[-1:] if r.stdout else ''}")
        if r.returncode != 0:
            falhas.append(n)
    print("claude: reinicie as sessões do Claude Code para carregar as versões novas")
    return 1 if falhas else 0

if __name__ == "__main__":
    sys.exit(main())
