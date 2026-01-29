#!/bin/bash

# Script para corrigir configuração do nginx quando SSL ainda não existe

echo "🔧 Corrigindo configuração do nginx..."

# Parar nginx temporariamente
docker compose stop nginx

# Remover default.conf se existir e usar default-init.conf
docker compose run --rm --entrypoint "sh" nginx -c "
  if [ -f /etc/nginx/conf.d/default.conf ]; then
    rm /etc/nginx/conf.d/default.conf
  fi
  if [ ! -f /etc/nginx/conf.d/default-init.conf ]; then
    echo 'Erro: default-init.conf não encontrado'
    exit 1
  fi
"

# Reiniciar nginx
docker compose up -d nginx

echo "✅ Nginx configurado para funcionar sem SSL"
echo "📝 Próximo passo: Execute o script de SSL para gerar certificados"
