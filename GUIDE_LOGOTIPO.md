# 📐 Guia de Logotipo - Domus Italínea

## 📏 Tamanhos Recomendados

### 1. **Logo Principal (Header)**
- **Tamanho**: 200-300px de largura (altura proporcional)
- **Formato**: SVG (preferencial) ou PNG com fundo transparente
- **Resolução**: 2x para telas retina (400-600px se PNG)
- **Arquivo**: `/public/logo.svg` ou `/public/logo.png`

**Por quê SVG?**
- Escalável sem perda de qualidade
- Menor tamanho de arquivo
- Funciona bem em qualquer tamanho
- Suporta transparência nativa

### 2. **Favicon**
- **Tamanho**: 32x32px (mínimo), 192x192px (recomendado)
- **Formato**: PNG ou ICO
- **Arquivo**: `/public/favicon.ico` ou `/public/favicon.png`
- **Múltiplos tamanhos**: 16x16, 32x32, 96x96, 192x192, 512x512

### 3. **Open Graph / Social Media**
- **Tamanho**: 1200x630px (proporção 1.91:1)
- **Formato**: PNG ou JPG
- **Arquivo**: `/public/og-image.jpg` ou `/public/og-image.png`
- **Peso**: Máximo 1MB (otimizado)

### 4. **Apple Touch Icon**
- **Tamanho**: 180x180px
- **Formato**: PNG
- **Arquivo**: `/public/apple-touch-icon.png`

## 📁 Estrutura de Arquivos Recomendada

```
public/
├── logo.svg              (logo principal - SVG)
├── logo.png              (fallback se não usar SVG)
├── logo-white.svg        (versão branca para fundos escuros)
├── favicon.ico           (16x16, 32x32)
├── favicon.png           (192x192)
├── apple-touch-icon.png  (180x180)
└── og-image.jpg          (1200x630)
```

## 🎨 Especificações Técnicas

### Logo Principal
- **Formato preferido**: SVG
- **Largura máxima**: 300px (no header)
- **Altura**: Proporcional (geralmente 40-80px no header)
- **Fundo**: Transparente
- **Cores**: Suportar modo claro e escuro (se necessário)

### Favicon
- **Formato**: ICO (suporta múltiplos tamanhos) ou PNG
- **Tamanhos**: 16x16, 32x32, 96x96, 192x192
- **Fundo**: Pode ser transparente ou sólido

### Open Graph
- **Dimensões**: 1200x630px
- **Formato**: JPG (menor tamanho) ou PNG (melhor qualidade)
- **Conteúdo**: Logo + texto/tagline (opcional)
- **Peso**: < 1MB

## ✅ Checklist de Preparação

- [ ] Logo principal em SVG (ou PNG com transparência)
- [ ] Versão branca do logo (para fundos escuros)
- [ ] Favicon em múltiplos tamanhos
- [ ] Imagem Open Graph (1200x630px)
- [ ] Apple Touch Icon (180x180px)

## 🔧 Como Adicionar ao Projeto

### 1. Coloque os arquivos em `/public/`

### 2. Atualize o Header (`components/layout/Header.tsx`)

```tsx
// Substituir o texto por:
<Image 
  src="/logo.svg" 
  alt="Domus Italínea" 
  width={200} 
  height={60}
  priority
/>
```

### 3. Adicione Favicon (`app/layout.tsx`)

```tsx
export const metadata: Metadata = {
  // ... outras configurações
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
```

### 4. Atualize Open Graph (`app/layout.tsx`)

```tsx
openGraph: {
  // ... outras configurações
  images: ['/og-image.jpg'],
},
```

## 💡 Dicas

1. **SVG é sempre melhor** para logos - escalável e leve
2. **Otimize imagens** antes de adicionar (use ferramentas como TinyPNG, ImageOptim)
3. **Teste em diferentes dispositivos** - mobile, tablet, desktop
4. **Mantenha proporção** - não distorça o logo
5. **Considere versões** - claro/escuro, horizontal/vertical

## 🛠️ Ferramentas Úteis

- **SVG Optimizer**: https://jakearchibald.github.io/svgomg/
- **Favicon Generator**: https://realfavicongenerator.net/
- **Image Compressor**: https://tinypng.com/
- **Open Graph Preview**: https://www.opengraph.xyz/

---

**Resumo rápido:**
- Logo principal: **SVG, 200-300px largura**
- Favicon: **ICO ou PNG, 32x32px (mínimo)**
- Open Graph: **JPG/PNG, 1200x630px**
