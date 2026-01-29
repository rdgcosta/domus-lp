# 🚀 Comandos Simples - Nginx + Next.js

## ✅ Deploy Básico (Sem SSL)

### 1. Build e iniciar

```bash
# Build da aplicação
docker compose build

# Iniciar tudo
docker compose up -d

# Verificar status
docker compose ps

# Ver logs
docker compose logs -f app
docker compose logs -f nginx
```

### 2. Verificar se está funcionando

```bash
# Testar localmente
curl http://localhost

# Ou acesse no navegador
# http://seu-ip-ou-dominio
```

## 🔄 Comandos Úteis

```bash
# Parar tudo
docker compose down

# Reiniciar
docker compose restart

# Ver logs em tempo real
docker compose logs -f

# Rebuild após mudanças
docker compose build app
docker compose up -d app
```

## 📝 Estrutura Simplificada

- **app**: Aplicação Next.js (porta 3000 interno)
- **nginx**: Proxy reverso (porta 80 externa)

Sem SSL por enquanto. Adicione depois quando necessário.
