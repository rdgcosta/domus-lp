#!/bin/bash

# Script para executar DIRETAMENTE no servidor
# Este script modifica os arquivos locais antes de reiniciar o container

echo "🔧 Corrigindo configuração do nginx..."

# Parar nginx
docker compose stop nginx

# Modificar arquivo local (não dentro do container)
cd "$(dirname "$0")/.."

# Remover default.conf e usar default-init.conf
if [ -f nginx/conf.d/default-init.conf ]; then
    rm -f nginx/conf.d/default.conf
    cp nginx/conf.d/default-init.conf nginx/conf.d/default.conf
    echo "✅ Configuração sem SSL aplicada"
else
    echo "❌ Arquivo default-init.conf não encontrado"
    exit 1
fi

# Reiniciar nginx
docker compose up -d nginx

echo "✅ Nginx corrigido e reiniciado"
echo "📝 Verifique os logs: docker compose logs nginx"
