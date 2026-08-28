# PROMPT — Site "A Idade Dourada de Marta" (presente de aniversário)

Você é um desenvolvedor front-end sênior com ótimo olhar para design editorial e tipografia. Crie um site de página única, **100% estático (HTML + CSS + JS puro, sem build, sem frameworks)**, para ser o presente de aniversário digital da **Marta Nogueira**, que completa um ano de vida hoje. O site será aberto por ela **no celular**, via QR code impresso num cartão que acompanha um presente físico (uma caixa de chocolates e uma blusa). Ele será hospedado gratuitamente na Vercel.

## Conceito

O tema é inspirado na série **"A Idade Dourada" (The Gilded Age, HBO Max)**: Nova York, 1882, alta sociedade, magnata das ferrovias George Russell, bailes, cartas lacradas e trens de primeira classe. A experiência é: **uma carta de convite que vira uma viagem de trem de primeira classe**, com estações que revelam mensagens, fotos e cupons — terminando na mensagem de aniversário.

O tom é romântico, elegante e levemente dramático (estilo época), mas sem exagero. Português do Brasil em todo o texto.

## Experiência passo a passo (fluxo obrigatório)

1. **Abertura — Envelope lacrado**
   - Tela cheia com fundo escuro (veludo/preto), um envelope de papel antigo centralizado com **selo de cera dourada** com a inicial "M".
   - Texto discreto acima: "Para: Miss Marta Nogueira" em caligrafia.
   - Ao clicar no selo: animação de quebra do lacre + envelope abrindo, revelando o convite.
   - Áudio opcional (botão de som no canto, sem autoplay forçado): um violino/valsa curta em loop.

2. **O Convite**
   - Papel creme texturizado, bordas ornamentadas douradas, tipografia serifada.
   - Texto (adaptável): 
     > "Nova York, no ano de 1882. — Miss Marta Nogueira tem a honra de ser cordialmente convidada para uma jornada de Primeira Classe a bordo da Ferrovia Adriel & Co. Embarque: hoje, ao pôr do sol. Destino: uma homenagem à aniversariante mais elegante da cidade."
   - Botão: "Aceitar o convite".

3. **O Bilhete de Trem**
   - Um **bilhete vintage** (estilo passagem de trem do século XIX): papel, bordas serrilhadas, carimbo, número do assento "1A", classe "Primeiríssima".
   - Campos: "Companhia: Ferrovia Adriel & Co. · Passageira: M. Nogueira · Origem: Nosso primeiro encontro · Destino: Felicidade · Embarque: Imediato".
   - Botão/carimbo: **"EMBARCAR"** — ao clicar, transição com vapor/fumaça de locomotiva.

4. **A Viagem — estações (scroll guiado, uma por vez)**
   Cada estação tem um letreiro de estação ferroviária ("Estação I — A Coluna Social", etc.) e uma animação suave de entrada.

   - **Estação I — A Coluna Social**: uma "matéria de jornal de 1882" (papel amarelado, colunas de texto, manchete gótica): *"A SENHORITA NOGUEIRA COMPLETE HOJE MAIS UM ANO — A cidade inteira comenta: nunca a alta sociedade viu tamanha elegância..."*. 2–3 parágrafos elogiando a Marta de forma charmosa e divertida, com placeholders `[MENSAGEM_PESSOAL_1]` para eu editar depois.
   
   - **Estação II — A Galeria**: fotos dos dois em **molduras ovais/douradas estilo vitoriano**, levemente rotacionadas como penduradas num salão. Usar as imagens da pasta `fotos/` (nomes: `foto1.jpg` … `foto6.jpg`). Cada foto com legenda em itálico (placeholders `[LEGENDA_FOTO_1]`…).
   
   - **Estação III — Os Motivos**: cartões estilo "cartas de baralho da era dourada" que viram ao clique (flip 3D), cada um revelando um motivo pelo qual gosto dela. 6 cartões, textos placeholder `[MOTIVO_1]`…`[MOTIVO_6]`.
   
   - **Estação IV — Os Cupons da Primeira Classe**: "talões" de cupom destacáveis (borda serrilhada, número sequencial): 
     1. "Um jantar à luz de velas, por conta da companhia" 
     2. "Uma sessão de cinema com o filme da SUA escolha (sim, qualquer um)" 
     3. "Um domingo inteiro de mimos" 
     4. "Uma caixa de chocolates — que já vem com o presente" 
     Cada cupom com botão "Validar" que carimba "VALIDADO ✦ Adriel & Co.".
   
   - **Estação Final — O Destino**: grande letreiro "DESTINO FINAL: FELICIDADE". A mensagem de aniversário de verdade, centrada, com assinatura manuscrita: "Com toda a minha admiração e carinho, Adriel". Abaixo, um cartão: *"Seu presente físico te aguarda: chocolates doces como a ocasião e uma blusa escolhida a quatro mãos. Mas o presente principal é este: eu, aqui, torcendo por você todos os dias."* Botão final: "Recomeçar a viagem" (volta ao envelope).

## Design (obrigatório)

- **Paleta**: preto/charcoal profundo (#141210), dourado envelhecido (#C9A227 / #8C6D1F), marfim/papel antigo (#F5EEDC), bordô discreto (#6E1423) para detalhes.
- **Tipografia** (Google Fonts, sem outras dependências): 
  - Títulos: "Cinzel" ou "Playfair Display"; 
  - Corpo: "Cormorant Garamond"; 
  - Caligrafia (assinaturas, "Para:"): "Great Vibes".
- **Textura**: sutil ruído/grão de papel via CSS (sem imagens externas pesadas), ornamentos com caracteres Unicode (❦ ✦ ❧) e bordas duplas douradas.
- **Layout mobile-first** (o site será aberto no celular). Testar em 375px de largura. Scroll suave, animações com `IntersectionObserver` (fade/slide ao entrar na tela).
- **Detalhes vivos**: vapor/fumaça animada (CSS) nas transições de embarque; leve balanço do bilhete; brilho dourado no selo ao passar o mouse/dedo.

## Regras técnicas

- **Um único projeto estático**: `index.html` + `style.css` + `script.js` + pasta `fotos/` (com 6 imagens placeholder nomeadas `foto1.jpg`…`foto6.jpg` — o script deve mostrar um fundo elegante caso a imagem não exista, sem quebrar).
- Nenhuma dependência npm, nenhum framework, nenhuma imagem externa além das fotos locais e Google Fonts.
- Todos os textos pessoais que eu devo customizar viram placeholders no formato `[NOME]`, `[MENSAGEM_PESSOAL_1]`, etc., e devem estar listados no final do `index.html` num comentário `<!-- EDITAR AQUI -->` para facilitar.
- Acessível: textos com contraste adequado, botões grandes para toque, `prefers-reduced-motion` respeitado.
- Performance: site deve carregar rápido em 4G; imagens com `loading="lazy"`.
- Entregar **código completo e funcional**, sem trechos "..." ou comentários de implementação pendente.

## Entregáveis

1. `index.html` completo
2. `style.css` completo
3. `script.js` completo
4. Instruções curtas de publicação na Vercel (deploy drag-and-drop é suficiente) e de como gerar o QR code apontando para a URL final.
