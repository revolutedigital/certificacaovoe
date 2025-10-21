# Landing Page - Licenciamento Voe Educacional

Landing page profissional enterprise-grade para o licenciamento da Escola Voe, desenvolvida com HTML5, CSS3 e JavaScript vanilla.

## Características

### Design e UX
- **Design Moderno**: Layout limpo e profissional com gradientes sutis
- **Paleta de Cores**: Verde (#10B981) como cor principal, evocando sustentabilidade e educação
- **Totalmente Responsivo**: Otimizado para desktop, tablet e mobile
- **Animações Suaves**: Efeitos de scroll reveal e transições elegantes
- **Tipografia Premium**: Uso das fontes Poppins e Inter do Google Fonts

### Funcionalidades
- **Navegação Smooth Scroll**: Rolagem suave entre seções
- **Header Fixo**: Cabeçalho que permanece visível durante a navegação
- **FAQ Accordion**: Seção de perguntas frequentes interativa
- **Formulário de Contato**: Com validação e máscara para telefone
- **Botão Scroll to Top**: Retorno rápido ao topo da página
- **Animações on Scroll**: Elementos aparecem suavemente ao rolar
- **Contador Animado**: Estatísticas com animação de contagem

### Seções
1. **Hero**: Introdução impactante com CTA e estatísticas
2. **Sobre o Método**: 4 pilares principais (Sustentabilidade, Autonomia, Inovação, Consciência Ambiental)
3. **Opções de Licenciamento**: 2 cards comparativos
4. **Entregas**: 6 categorias detalhadas do que está incluído
5. **Diferenciais**: 4 motivos para escolher a Voe
6. **Depoimentos**: 3 testemunhos de clientes
7. **FAQ**: Perguntas frequentes
8. **CTA Final**: Formulário de contato
9. **Footer**: Links e informações de contato

## Como Usar

### Visualizar Localmente

1. Abra o arquivo `index.html` em um navegador moderno
2. Ou use um servidor local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

3. Acesse no navegador: `http://localhost:8000`

### Deploy

A landing page é 100% estática e pode ser hospedada em:
- **Netlify**: Arraste a pasta direto no site
- **Vercel**: Deploy automático via GitHub
- **GitHub Pages**: Gratuito para repositórios públicos
- **AWS S3**: Para maior controle
- **Qualquer hosting tradicional**: Basta fazer upload via FTP

## Personalização

### Cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary: #10B981;        /* Verde principal */
    --secondary: #3B82F6;      /* Azul secundário */
    --accent: #F59E0B;         /* Laranja de destaque */
}
```

### Conteúdo

Todo o conteúdo pode ser editado diretamente no `index.html`. As seções estão bem comentadas e organizadas.

### Formulário

O formulário está configurado para simular o envio. Para integrá-lo:

**Opção 1 - Formspree (Mais Fácil)**
```html
<form action="https://formspree.io/f/SEU_ID" method="POST">
```

**Opção 2 - Google Forms**
Use um iframe do Google Forms

**Opção 3 - API Própria**
Edite a função em `script.js`:
```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

### Imagens

Para adicionar imagens:
1. Crie uma pasta `images/` na raiz
2. Adicione as imagens
3. Referencie no HTML:
```html
<img src="images/sua-imagem.jpg" alt="Descrição">
```

## Integrações Recomendadas

### Analytics
Adicione o Google Analytics no `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Meta Pixel (Facebook)
Para rastreamento de conversões:
```html
<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'SEU_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### WhatsApp
Adicione um botão flutuante de WhatsApp editando o `index.html`:
```html
<a href="https://wa.me/5515999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20licenciamento"
   class="whatsapp-float"
   target="_blank">
   <i class="fab fa-whatsapp"></i>
</a>
```

## SEO

### Meta Tags Essenciais

Já incluídas no `<head>`:
- Description
- Viewport
- Title

### Adicionar mais Meta Tags (Recomendado)

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://seusite.com/">
<meta property="og:title" content="Licenciamento Escola Voe | Método Voe Educacional">
<meta property="og:description" content="Transforme sua escola com sustentabilidade e inovação pedagógica">
<meta property="og:image" content="https://seusite.com/images/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://seusite.com/">
<meta property="twitter:title" content="Licenciamento Escola Voe">
<meta property="twitter:description" content="Transforme sua escola com sustentabilidade e inovação pedagógica">
<meta property="twitter:image" content="https://seusite.com/images/twitter-image.jpg">
```

## Performance

### Otimizações Aplicadas
- Fontes carregadas via Google Fonts com preconnect
- CSS minificado em produção (recomendado)
- JavaScript vanilla (sem dependências externas)
- Lazy loading de imagens
- Animações otimizadas com CSS

### Recomendações Adicionais
1. Minificar CSS e JS antes do deploy
2. Usar CDN para assets estáticos
3. Comprimir imagens (use TinyPNG ou Squoosh)
4. Habilitar GZIP no servidor
5. Usar formato WebP para imagens

## Checklist Antes do Lançamento

- [ ] Atualizar informações de contato (telefone, email, endereço)
- [ ] Configurar formulário de contato
- [ ] Adicionar Google Analytics
- [ ] Configurar Meta Pixel (se aplicável)
- [ ] Testar todos os links
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Testar em diferentes dispositivos (mobile, tablet, desktop)
- [ ] Otimizar imagens
- [ ] Configurar domínio personalizado
- [ ] Adicionar favicon
- [ ] Configurar certificado SSL (HTTPS)
- [ ] Testar velocidade (PageSpeed Insights)
- [ ] Validar HTML (validator.w3.org)
- [ ] Configurar redirects (www para não-www ou vice-versa)

## Suporte a Navegadores

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## Estrutura de Arquivos

```
lpvoe/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README.md           # Este arquivo
```

## Tecnologias Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript ES6+
- Google Fonts (Poppins, Inter)

## Próximos Passos Sugeridos

1. **Adicionar Imagens Reais**: Substitua os placeholders por fotos da escola
2. **Criar Blog**: Seção de conteúdo para SEO
3. **Adicionar Vídeos**: Tour virtual da escola em Sorocaba
4. **Sistema de Agendamento**: Para as imersões presenciais
5. **Portal do Aluno**: Link para área restrita
6. **Depoimentos em Vídeo**: Maior impacto social proof
7. **Chat ao Vivo**: Suporte em tempo real
8. **Multi-idioma**: Se houver expansão internacional

## Contato e Suporte

Para dúvidas ou suporte com a landing page, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com 💚 para Voe Educacional**
