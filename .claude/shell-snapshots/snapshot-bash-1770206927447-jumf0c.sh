# Snapshot file
# Unset all aliases to avoid conflicts with functions
unalias -a 2>/dev/null || true
shopt -s expand_aliases
# Check for rg availability
if ! (unalias rg 2>/dev/null; command -v rg) >/dev/null 2>&1; then
  alias rg='/home/clara/.local/share/claude/versions/2.1.29 --ripgrep'
fi
export PATH=/opt/homebrew/bin\:/usr/local/bin\:/usr/bin\:/bin\:/usr/local/bin\:/usr/bin\:/bin\:/usr/local/games\:/usr/games
