# 🚀 Guia de Deploy - Domus Italínea

## Pré-requisitos

- Docker e Docker Compose instalados
- Domínio configurado apontando para o servidor
- Portas 80 e 443 liberadas no firewall

## 📋 Passos para Deploy

### 1. Configurar Domínio

Edite os arquivos de configuração do nginx com seu domínio:

```bash
# Edite nginx/conf.d/default.conf
# Substitua domusitalinea.com.br pelo seu domínio
```

### 2. Build e Iniciar Containers

```bash
# Build da aplicação
docker compose build

# Iniciar containers (sem SSL inicialmente)
docker compose up -d app nginx
```

### 3. Configurar SSL com Certbot

#### Opção A: Script Automatizado

```bash
chmod +x scripts/setup-ssl.sh
./scripts/setup-ssl.sh
```

#### Opção B: Manual

```bash
# Solicitar certificado SSL
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email seu-email@exemplo.com \
  --agree-tos \
  --no-eff-email \
  -d domusitalinea.com.br \
  -d www.domusitalinea.com.br

# Recarregar nginx
docker compose exec nginx nginx -s reload
```

### 4. Iniciar Todos os Serviços

```bash
docker compose up -d
```

## 🔄 Comandos Úteis

### Ver logs
```bash
docker compose logs -f app
docker compose logs -f nginx
docker compose logs -f certbot
```

### Reiniciar serviços
```bash
docker compose restart app
docker compose restart nginx
```

### Parar serviços
```bash
docker compose down
```

### Renovar certificado SSL manualmente
```bash
docker compose run --rm certbot renew
docker compose exec nginx nginx -s reload
```

### Rebuild após mudanças
```bash
docker compose build app
docker compose up -d app
```

## 🔒 Renovação Automática de SSL

O Certbot está configurado para renovar automaticamente os certificados a cada 12 horas. O nginx recarrega automaticamente após renovações.

## 📝 Notas Importantes

1. **Primeira vez**: Use `default-ssl.conf` temporariamente para obter o certificado
2. **Após SSL**: Certifique-se de que `default.conf` está ativo
3. **Domínio**: Certifique-se de que o DNS está apontando para o servidor antes de solicitar o certificado
4. **Email**: Use um email válido para receber notificações de renovação

## 🐛 Troubleshooting

### Certificado não gerado
- Verifique se o domínio está apontando para o servidor
- Verifique se as portas 80 e 443 estão acessíveis
- Verifique os logs: `docker compose logs certbot`

### Nginx não inicia
- Verifique a sintaxe: `docker compose exec nginx nginx -t`
- Verifique os logs: `docker compose logs nginx`

### App não responde
- Verifique se o app está rodando: `docker compose ps`
- Verifique os logs: `docker compose logs app`
