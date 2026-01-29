#!/bin/bash

# Script para renovar certificado SSL

echo "🔄 Renovando certificado SSL..."

# Renovar certificado
docker compose run --rm certbot renew

# Recarregar nginx
docker compose exec nginx nginx -s reload

echo "✅ Renovação concluída"
