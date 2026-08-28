/* ═══════════════════════════════════════════════════════════════
   A Idade Dourada — Miss Marta Nogueira
   Ferrovia Adriel & Co.
   ═══════════════════════════════════════════════════════════════ */

/* Deixe false para esconder o pedido de namoro no final da viagem. */
const MOSTRAR_PEDIDO = true;

(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.prototype.slice.call(document.querySelectorAll(sel));

  const reduzido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const atos = {
    envelope: $('#act-envelope'),
    invite: $('#act-invite'),
    ticket: $('#act-ticket'),
    voyage: $('#act-voyage'),
  };

  const steam = $('#steam');
  const magic = $('#magic');

  const depois = (fn, ms) => setTimeout(fn, ms);

  /* ── trocar de ato ───────────────────────────────────────────── */

  function irPara(nome) {
    Object.keys(atos).forEach((k) => { atos[k].hidden = k !== nome; });
    window.scrollTo(0, 0);
    // reinicia a animação de entrada do ato que acabou de aparecer
    const alvo = atos[nome];
    alvo.style.animation = 'none';
    void alvo.offsetWidth;
    alvo.style.animation = '';
    observarReveals();
  }

  /* ── vapor da locomotiva ─────────────────────────────────────── */

  function vapor(entao, ms) {
    steam.hidden = false;
    // reinicia as animações dos quatro puffs
    $$('.steam__puff').forEach((p) => {
      p.style.animation = 'none';
      void p.offsetWidth;
      p.style.animation = '';
    });
    depois(entao, ms);
    depois(() => { steam.hidden = true; }, ms + 1400);
  }

  /* ── ATO 1 · o filme do envelope ─────────────────────────────── */

  document.body.classList.add('abertura-ativa');

  const filme = $('#filme');
  const abrir = $('#abrir');
  const dica = $('#dica');
  let jaAbriu = false;

  filme.playbackRate = 2;          // 10s de video viram 5s

  // celular so deixa tocar sozinho se estiver mudo
  const tentarTocar = () => {
    const p = filme.play();
    if (p && p.catch) p.catch(() => { dica.textContent = 'Toque para abrir'; });
  };
  if (filme.readyState >= 2) tentarTocar();
  filme.addEventListener('loadeddata', tentarTocar, { once: true });

  // enquanto roda, o convite ja fica pronto por tras
  filme.addEventListener('ended', function () {
    dica.textContent = 'Toque para abrir o convite';
    dica.classList.add('is-chamando');
    filme.pause();
  });

  function abrirConvite() {
    if (jaAbriu) return;
    jaAbriu = true;
    filme.pause();
    $('#act-envelope').classList.add('is-gone');
    // a trava so sai depois do zoom, senao a barra de rolagem pisca
    depois(() => {
      document.body.classList.remove('abertura-ativa');
      irPara('invite');
    }, 700);
  }

  abrir.addEventListener('click', abrirConvite);

  // se o video nao carregar, ela nao pode ficar presa aqui
  filme.addEventListener('error', function () {
    dica.textContent = 'Toque para abrir o convite';
    $('#act-envelope').classList.add('sem-video');
  });

  /* ── ATO 2 · aceitar o convite (a explosão dourada) ──────────── */

  // gerador determinístico: o brilho é sempre o mesmo, sem Math.random
  function semente(s) {
    return function () {
      s = (s * 1103515245 + 12345) % 2147483648;
      return s / 2147483648;
    };
  }

  function montarBrilho() {
    const rnd = semente(20250828);
    const partes = [];

    const bloom = document.createElement('div');
    bloom.className = 'magic__bloom';
    partes.push(bloom);

    const flash = document.createElement('div');
    flash.className = 'magic__flash';
    partes.push(flash);

    const ring = document.createElement('div');
    ring.className = 'magic__ring';
    partes.push(ring);

    // faíscas que saem do centro
    for (let i = 0; i < 16; i++) {
      const ang = rnd() * Math.PI * 2;
      const dist = 14 + rnd() * 34;
      const size = 1.5 + rnd() * 2.5;
      const mote = document.createElement('span');
      mote.className = 'magic__mote';
      mote.style.width = size + 'px';
      mote.style.height = size + 'px';
      mote.style.background = i % 4 === 0
        ? 'linear-gradient(#FFF8E2,#E8D9A6)'
        : 'linear-gradient(#FFF3D0,#C9A227)';
      mote.style.boxShadow = '0 0 ' + (3 + size) + 'px rgba(201,162,39,.55)';
      mote.style.setProperty('--tx', (Math.cos(ang) * dist).toFixed(1) + 'vw');
      mote.style.setProperty('--ty', (Math.sin(ang) * dist - 16).toFixed(1) + 'vh');
      mote.style.setProperty('--sc', (0.25 + rnd() * 0.6).toFixed(2));
      mote.style.setProperty('--rot', Math.round(rnd() * 260 - 130) + 'deg');
      mote.style.animation = 'moteFly ' + (1.6 + rnd() * 0.9).toFixed(2) + 's '
        + (0.2 + rnd() * 0.5).toFixed(2) + 's cubic-bezier(.2,.6,.35,1) both';
      partes.push(mote);
    }

    // poeira dourada que desce depois
    for (let i = 0; i < 8; i++) {
      const size = 1.5 + rnd() * 2.5;
      const dust = document.createElement('span');
      dust.className = 'magic__dust';
      dust.style.left = (12 + rnd() * 76).toFixed(1) + '%';
      dust.style.width = size + 'px';
      dust.style.height = size + 'px';
      dust.style.animation = 'settleDown ' + (1.7 + rnd() * 0.9).toFixed(2) + 's '
        + (1.1 + rnd() * 0.5).toFixed(2) + 's ease-in both';
      partes.push(dust);
    }

    magic.replaceChildren.apply(magic, partes);
  }

  let brilhando = false;

  $('#accept').addEventListener('click', function () {
    if (brilhando) return;
    brilhando = true;

    const lento = reduzido();
    if (!lento) $('#invite').classList.add('is-lifting');

    montarBrilho();
    magic.hidden = false;

    depois(() => { irPara('ticket'); }, lento ? 220 : 1180);
    depois(() => {
      magic.hidden = true;
      magic.replaceChildren();
      brilhando = false;
    }, lento ? 400 : 2650);
  });

  /* ── ATO 3 · embarcar ────────────────────────────────────────── */

  $('#board').addEventListener('click', function () {
    vapor(() => irPara('voyage'), 700);
  });

  /* ── ATO 4 · fotos que faltam ────────────────────────────────── */

  // se a foto não existir, some com o <img> e deixa o "M" dourado à mostra
  $$('.frame__img').forEach((img) => {
    img.addEventListener('error', function () {
      img.classList.add('is-missing');
    });
    // imagem quebrada que já falhou antes do JS carregar
    if (img.complete && img.naturalWidth === 0) img.classList.add('is-missing');
  });

  /* ── Estação III · virar as cartas ───────────────────────────── */

  $('#cards').addEventListener('click', function (e) {
    const btn = e.target.closest('.card');
    if (!btn) return;
    const aberta = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', aberta ? 'false' : 'true');
  });

  /* ── Estação IV · validar cupons ─────────────────────────────── */

  $('#coupons').addEventListener('click', function (e) {
    const btn = e.target.closest('.coupon__btn');
    if (!btn || btn.disabled) return;
    const cupom = btn.closest('.coupon');
    const carimbo = cupom && cupom.querySelector('.coupon__stamp');
    if (carimbo) carimbo.classList.add('is-stamped');
    btn.disabled = true;
    btn.hidden = true;   // o carimbo toma o lugar dele
  });

  /* ── O pedido ────────────────────────────────────────────────── */

  const proposal = $('#proposal');
  const proposalSeal = $('#proposalSeal');
  const proposalReveal = $('#proposalReveal');
  const proposalSealed = $('#proposalSealed');
  const yes = $('#yes');

  if (!MOSTRAR_PEDIDO) proposal.hidden = true;

  let digitando = null;

  // revela o texto letra por letra, na ordem de data-type
  function revelarTexto() {
    const els = $$('[data-type]').sort((a, b) => +a.dataset.type - +b.dataset.type);
    if (!els.length) return;

    if (reduzido()) {
      els.forEach((el) => { el.style.visibility = 'visible'; });
      yes.hidden = false;
      return;
    }

    let atraso = 250;
    els.forEach((el) => {
      const texto = el.textContent;
      const passo = +el.dataset.speed || 40;
      el.textContent = '';
      el.style.visibility = 'visible';
      for (const ch of texto) {
        const s = document.createElement('span');
        s.textContent = ch;
        el.appendChild(s);
        const quando = atraso;
        depois(() => { s.style.opacity = '1'; }, quando);
        atraso += ch === ' ' ? passo * 0.55 : passo;
      }
      atraso += 420;
    });

    clearTimeout(digitando);
    digitando = setTimeout(() => { yes.hidden = false; }, atraso + 200);
  }

  proposalSeal.addEventListener('click', function () {
    proposalSeal.hidden = true;
    proposalReveal.hidden = false;
    revelarTexto();
  });

  // carimba o instante exato em que ela aceitou
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  function momentoAgora() {
    const d = new Date();
    const hora = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return d.getDate() + ' de ' + MESES[d.getMonth()] + ' de ' + d.getFullYear()
      + ', às ' + hora + 'h' + min;
  }

  yes.addEventListener('click', function () {
    const selo = $('#selo-momento');
    if (selo) selo.textContent = momentoAgora();
    proposalSealed.hidden = false;
    yes.hidden = true;
  });

  /* ── entrada suave ao rolar ──────────────────────────────────── */

  let io = null;

  function observarReveals() {
    if (io) io.disconnect();
    if (reduzido() || !('IntersectionObserver' in window)) return;

    setTimeout(function () {
      // Só mexe em quem já está na tela: dentro de um ato escondido o
      // transform computado vem "none" e a inclinação das molduras
      // seria guardada errada, endireitando a galeria para sempre.
      const novos = $$('.js-reveal').filter((el) => !el.dataset.revealed && el.offsetParent !== null);
      if (!novos.length) return;

      novos.forEach((el) => {
        // Guarda o transform original. As molduras da galeria vêm tortas
        // por uma classe (rotate(var(--tilt))), não por style inline — sem
        // ler o computado, elas endireitavam durante a animação de entrada.
        if (el.dataset.baseTf === undefined) {
          const atual = getComputedStyle(el).transform;
          el.dataset.baseTf = atual === 'none' ? '' : atual;
        }
        el.style.opacity = '0';
        el.style.transform = (el.dataset.baseTf + ' translateY(28px)').trim();
        el.style.transition = 'opacity .9s ease, transform 1s cubic-bezier(.22,1,.36,1)';
      });

      io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.dataset.revealed = '1';
          el.style.opacity = '1';
          el.style.transform = el.dataset.baseTf || '';
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

      novos.forEach((el) => io.observe(el));
    }, 60);
  }

  observarReveals();

  /* ── som opcional (audio/valsa.mp3) ──────────────────────────── */

  const botaoSom = $('#sound');

  // a primeira impressao e a cena, nao a interface: o botao entra depois
  depois(() => botaoSom.classList.add('is-visivel'), 2600);

  let valsa = null;

  botaoSom.addEventListener('click', function () {
    if (!valsa) {
      valsa = new Audio('audio/valsa.mp3');
      valsa.loop = true;
      valsa.volume = 0.35;
      valsa.addEventListener('error', function () {
        botaoSom.classList.add('is-missing');
        botaoSom.setAttribute('aria-pressed', 'false');
        botaoSom.title = 'Coloque um MP3 em audio/valsa.mp3 para ouvir a valsa.';
        $('.sound__label').textContent = 'Sem áudio';
      });
    }

    const tocando = botaoSom.getAttribute('aria-pressed') === 'true';
    if (tocando) {
      valsa.pause();
      botaoSom.setAttribute('aria-pressed', 'false');
      botaoSom.setAttribute('aria-label', 'Ligar o som da valsa');
    } else {
      const p = valsa.play();
      if (p && p.catch) p.catch(function () { /* navegador barrou: o erro acima cuida */ });
      botaoSom.setAttribute('aria-pressed', 'true');
      botaoSom.setAttribute('aria-label', 'Desligar o som da valsa');
    }
  });

  /* ── atalho: link "ir à viagem" pula direto ──────────────────── */

  $('.skip').addEventListener('click', function (e) {
    e.preventDefault();
    irPara('voyage');
  });
})();
