# A Idade Dourada — presente da Marta

Site estático: `index.html` + `style.css` + `script.js`. Sem build.

## As fotos

A galeria da Estação II usa `fotos/foto1.jpg` e `fotos/foto2.jpg`, já
recortadas em 3:4 e comprimidas (~90 KB cada). Para trocar por outras, é só
substituir os arquivos mantendo os nomes — retrato funciona melhor, porque o
site recorta em oval sozinho. Se um arquivo faltar, a moldura mostra um “M”
dourado e não quebra.

### Acrescentar mais fotos depois

1. Salve as novas como `foto3.jpg`, `foto4.jpg` e assim por diante.
2. No `index.html`, dentro de `<div class="gallery">`, copie um bloco
   `<figure class="frame …>` inteiro e troque o `src` e a legenda.
   O `--tilt` no `style` é a inclinação da moldura; varie entre `-2.6deg` e
   `2.6deg` para parecerem penduradas à mão.
3. Com 3 fotos ou mais, no `style.css` procure `.gallery` e volte para
   `grid-template-columns: 1fr 1fr`, tirando o `max-width` do `.frame`.
   Aí elas ficam lado a lado, como no design original.

Antes de publicar, vale encolher as fotos novas (uns 700px de largura) para o
site abrir rápido no 4G.

## Editar os textos

No final do `index.html` há o comentário `<!-- EDITAR AQUI -->` com a lista.

Troque no próprio HTML:

- `[MENSAGEM_PESSOAL_1]` — jornal da Estação I
- `[LEGENDA_FOTO_1]` e `[LEGENDA_FOTO_2]` — legendas das fotos

Os seis motivos do verso das cartas já estão escritos (procure por
`class="card__face"` no HTML). Cada carta comporta uns 75 caracteres sem
apertar o texto.

## O pedido de namoro

No fim da viagem há um lacre com um “A”. Quem toca nele vê a pergunta
aparecer letra por letra, e depois um botão “Eu aceito”.

Para tirar essa parte do site, abra o `script.js` e troque a primeira linha:

```js
const MOSTRAR_PEDIDO = false;
```

O texto da pergunta está no `index.html`, na seção `proposal`.

## Mudar o dourado e o movimento

No topo do `style.css`:

- `--gold` — o dourado do site inteiro.
  Outros tons que combinam: `#B08D57`, `#D8C08A`, `#A8823C`.
- `--sway` — `running` (padrão) faz o bilhete balançar; `paused` deixa parado.

Quem tiver “reduzir movimento” ligado no celular já recebe a versão calma
automaticamente, sem precisar mexer em nada.

## Som

`audio/valsa.mp3` — trecho de 1 minuto do tema de abertura da série,
em loop e a 35% do volume. **Nada toca sozinho**: nenhum celular permite,
então ela precisa tocar o botão “Som” no canto superior direito.
Para trocar, basta substituir o arquivo mantendo o nome.

## O vídeo de abertura

`video/envelope.mp4` ocupa a tela inteira, sem moldura: a caligrafia e o
convite ao toque ficam por cima da cena. Toca sozinho, mudo, em velocidade 2×
(os 10s viram 5s). Quando termina, o aviso embaixo muda para “toque para abrir
o convite”. Qualquer toque na tela abre — ela não precisa mirar em nada.

`video/poster.jpg` é o primeiro quadro, exibido enquanto o vídeo carrega,
para não haver retângulo preto na primeira impressão.

Se o arquivo faltar ou não carregar, o site não trava: o aviso aparece
mesmo assim e o toque leva ao convite.

Para trocar por outro vídeo, substitua o arquivo mantendo o nome. A velocidade
está no `script.js`, na linha `filme.playbackRate = 2`.

## Publicar na Vercel (grátis)

1. Entre em [vercel.com](https://vercel.com) e faça login (GitHub, e-mail, etc.).
2. No dashboard: **Add New… → Project**.
3. Se a pasta estiver no GitHub: importe o repositório.
   Se não: **Deploy** arrastando a pasta `martinha` inteira (drag-and-drop).
4. Framework preset: **Other**. Não precisa de build command.
5. Deploy. Copie a URL, algo como `https://martinha.vercel.app`.

## O cartão com o QR code

`cartao-qr.png` — 2128 × 3072 px, pronto para imprimir.

- a **600 DPI** sai com 90 × 130 mm (tamanho de convite)
- a **300 DPI** sai com 180 × 260 mm (quase uma folha A4)

A linha tracejada em volta é o guia de corte. O QR aponta para
`https://nomadautomacao-dot.github.io/martinha/`.

Correção de erro alta (30%), então tolera dobra, tinta fraca e foto torta.
Se mudar a URL do site, o cartão precisa ser refeito.

## Ver no computador

Na pasta do projeto:

```powershell
npm install
npm run dev
```

Abre em **http://localhost:5173**. O site em si continua só HTML/CSS/JS — o npm aqui é só o servidor local.

Se a porta 5173 estiver ocupada por outro projeto seu, rode numa porta livre:

```powershell
npx serve . -l 5891
```
