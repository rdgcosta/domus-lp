#!/bin/bash

# Script de correção rápida para executar no servidor

echo "🔧 Corrigindo nginx..."

# Parar nginx
docker compose stop nginx

# Remover default.conf problemático e usar default-init.conf
docker compose run --rm --entrypoint "sh" nginx -c "
  cd /etc/nginx/conf.d
  rm -f default.conf
  cp default-init.conf default.conf
  echo 'Configuração inicial aplicada'
"

# Reiniciar nginx
docker compose up -d nginx

echo "✅ Nginx corrigido e reiniciado"
echo "📝 Agora você pode gerar o certificado SSL com:"
echo "   docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --email seu-email@exemplo.com --agree-tos --no-eff-email -d domusitalinea.com.br -d www.domusitalinea.com.br"
