#!/bin/bash
set -e

# Deploy Domus Italínea - Build e sobe app + nginx
# Uso: ./scripts/deploy.sh

cd "$(dirname "$0")/.."

echo "🚀 Deploy Domus Italínea"
echo ""

# Opcional: avisar se .env não existe
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado."
    echo "   Crie a partir de .env.example e configure (ex: NEXT_PUBLIC_GTM_ID)."
    echo "   Continuando mesmo assim (build sem variáveis de ambiente)..."
    echo ""
fi

echo "📦 Build da aplicação..."
docker compose build app

echo ""
echo "🔄 Subindo containers..."
docker compose up -d app nginx

echo ""
echo "✅ Deploy concluído."
echo ""
echo "📋 Comandos úteis:"
echo "   Logs:    docker compose logs -f app"
echo "   Nginx:   docker compose logs -f nginx"
echo "   Parar:   docker compose down"
echo ""
echo "🌐 Site em http://localhost (ou seu domínio na porta 80)"
echo "   Para HTTPS: ./scripts/gerar-ssl.sh e depois ./scripts/ativar-ssl.sh"
echo ""
