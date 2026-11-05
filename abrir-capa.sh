#!/usr/bin/env bash
# Inicia a versao React em uma porta fixa para o GitHub Codespaces.
# Uso na raiz do repositorio: bash abrir-capa.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT/lovable"

if ! command -v bun >/dev/null 2>&1; then
  printf '\nBun nao encontrado. Instale com: npm install -g bun\n'
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Instalando dependencias da capa..."
  bun install --frozen-lockfile
fi

echo
echo "=============================================="
echo " CAPA REACT - PREVIA NO CODESPACES"
echo " Porta FIXA: 5173"
echo " Abra o endereco da porta 5173 na aba Ports."
echo " A porta deve permanecer PRIVATE."
echo " Nao feche este terminal enquanto visualizar."
echo "=============================================="
echo
exec bun run dev -- --host 0.0.0.0 --port 5173 --strictPort
