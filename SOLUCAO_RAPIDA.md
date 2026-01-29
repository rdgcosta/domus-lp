# ⚡ Solução Rápida - Nginx com Erro de SSL

## 🔴 Problema
Nginx está tentando carregar certificado SSL que não existe.

## ✅ Solução (Execute no Servidor)

### Passo 1: Verificar qual arquivo está ativo

```bash
cd ~/domus-lp
cat nginx/conf.d/default.conf | head -5
```

Se mostrar `ssl_certificate`, está usando configuração com SSL.

### Passo 2: Trocar para configuração SEM SSL

```bash
# Parar nginx
docker compose stop nginx

# Remover configuração atual
rm -f nginx/conf.d/default.conf

# Copiar configuração sem SSL
cp nginx/conf.d/default-init.conf nginx/conf.d/default.conf

# Verificar conteúdo (deve mostrar apenas "listen 80", sem SSL)
cat nginx/conf.d/default.conf | grep -E "listen|ssl"

# Reiniciar nginx
docker compose up -d nginx

# Verificar logs
docker compose logs nginx --tail 20
```

### Passo 3: Verificar se está funcionando

```bash
# Ver status
docker compose ps

# Testar acesso
curl http://localhost
```

## 🔒 Depois de Gerar Certificado SSL

```bash
# 1. Gerar certificado
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email contato@domusitalinea.com.br \
  --agree-tos \
  --no-eff-email \
  -d domusitalinea.com.br \
  -d www.domusitalinea.com.br

# 2. Ativar SSL
docker compose stop nginx
rm -f nginx/conf.d/default.conf
cp nginx/conf.d/default-ssl.conf nginx/conf.d/default.conf
docker compose up -d nginx

# 3. Verificar
docker compose logs nginx
```

## 📋 Checklist

- [ ] `default.conf` não contém `ssl_certificate` (antes de gerar SSL)
- [ ] Nginx inicia sem erros
- [ ] Site acessível via HTTP (porta 80)
- [ ] Certificado SSL gerado
- [ ] `default.conf` contém `ssl_certificate` (após gerar SSL)
- [ ] Site acessível via HTTPS (porta 443)
