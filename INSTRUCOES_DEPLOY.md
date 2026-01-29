# 🚀 Instruções de Deploy - Correção do Nginx

## ⚠️ Problema Atual
O nginx está tentando carregar certificados SSL que ainda não existem.

## ✅ Solução Imediata (Execute no Servidor)

### 1. Corrigir configuração do nginx

```bash
# Parar nginx
docker compose stop nginx

# Remover configuração com SSL e usar a inicial (sem SSL)
docker compose run --rm --entrypoint "sh" nginx -c "
  cd /etc/nginx/conf.d
  rm -f default.conf
  cp default-init.conf default.conf
  echo 'Configuração inicial aplicada'
"

# Reiniciar nginx
docker compose up -d nginx

# Verificar se está funcionando
docker compose logs nginx
docker compose ps
```

### 2. Verificar se o site está acessível

```bash
curl http://localhost
# ou acesse http://seu-ip no navegador
```

### 3. Gerar certificado SSL

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

### 4. Ativar configuração SSL

```bash
# Parar nginx
docker compose stop nginx

# Usar configuração com SSL
docker compose run --rm --entrypoint "sh" nginx -c "
  cd /etc/nginx/conf.d
  rm -f default.conf
  cp default-ssl.conf default.conf
  echo 'Configuração SSL ativada'
"

# Reiniciar nginx
docker compose up -d nginx

# Verificar logs
docker compose logs nginx
```

## 📝 Arquivos de Configuração

- **default.conf**: Configuração ativa (inicialmente sem SSL)
- **default-init.conf**: Backup da configuração sem SSL
- **default-ssl.conf**: Configuração com SSL (usar após gerar certificado)

## 🔄 Scripts Disponíveis

- `scripts/fix-nginx-now.sh`: Corrige nginx rapidamente
- `scripts/ativar-ssl.sh`: Ativa SSL após certificado ser gerado
- `scripts/configure-ssl.sh`: Script completo de configuração SSL

## ✅ Checklist

- [ ] Nginx funcionando sem SSL (porta 80)
- [ ] Site acessível via HTTP
- [ ] Certificado SSL gerado
- [ ] SSL ativado e funcionando (porta 443)
- [ ] Redirecionamento HTTP → HTTPS funcionando
