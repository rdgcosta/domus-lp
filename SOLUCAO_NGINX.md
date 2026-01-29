# 🔧 Solução para Erro do Nginx

## Problema
O nginx está tentando carregar certificados SSL que ainda não existem.

## Solução Rápida (Execute no servidor)

### Passo 1: Corrigir configuração do nginx

```bash
# Parar nginx
docker compose stop nginx

# Remover configuração com SSL e usar a inicial
docker compose run --rm --entrypoint "sh" nginx -c "
  cd /etc/nginx/conf.d
  rm -f default.conf
  cp default-init.conf default.conf
  cat default.conf
"

# Reiniciar nginx
docker compose up -d nginx
```

### Passo 2: Verificar se nginx está funcionando

```bash
docker compose logs nginx
docker compose ps
```

### Passo 3: Gerar certificado SSL

```bash
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email contato@domusitalinea.com.br \
  --agree-tos \
  --no-eff-email \
  -d domusitalinea.com.br \
  -d www.domusitalinea.com.br
```

### Passo 4: Ativar configuração SSL

```bash
# Parar nginx
docker compose stop nginx

# Usar configuração com SSL
docker compose run --rm --entrypoint "sh" nginx -c "
  cd /etc/nginx/conf.d
  rm -f default.conf
  # O default.conf com SSL será usado automaticamente
  # (ele já está no volume, apenas remova o default-init.conf se quiser)
"

# Reiniciar nginx
docker compose up -d nginx
```

## Alternativa: Script Automatizado

Execute no servidor:

```bash
chmod +x scripts/fix-nginx-now.sh
./scripts/fix-nginx-now.sh
```

Depois gere o certificado e ative SSL conforme passo 3 e 4 acima.
