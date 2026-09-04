// Glossário de conceitos-chave do site — cresce conforme o Leandro for pedindo.
// Cada entrada: título, explicação curta, e opcionalmente um mini-diagrama SVG.
const GLOSSARY = {
  'reta-tangente': {
    title: 'Reta tangente',
    body: 'A reta que toca uma curva em um único ponto, seguindo a mesma direção da curva ali — como se fosse a "continuação reta" da curva naquele ponto.',
    svg: '<svg viewBox="0 0 140 90" width="140" height="90"><path d="M10,80 Q70,8 130,58" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/><line x1="18" y1="74" x2="122" y2="20" stroke="#C96B77" stroke-width="2.5"/><circle cx="70" cy="46" r="3.5" fill="#B9822C"/></svg>'
  },
  'reta-secante': {
    title: 'Reta secante',
    body: 'A reta que corta uma curva em dois pontos diferentes. Quando os dois pontos vão se aproximando, a secante vai "virando" a tangente.',
    svg: '<svg viewBox="0 0 140 90" width="140" height="90"><path d="M10,80 Q70,8 130,58" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/><line x1="15" y1="66" x2="125" y2="34" stroke="#C96B77" stroke-width="2.5"/><circle cx="34" cy="61" r="3.5" fill="#B9822C"/><circle cx="106" cy="37" r="3.5" fill="#B9822C"/></svg>'
  },
  'inclinacao': {
    title: 'Inclinação (coeficiente angular)',
    body: 'O quanto uma reta "sobe" pra cada unidade que ela anda pra direita. Ligando dois pontos (x₁,y₁) e (x₂,y₂), a inclinação é (y₂−y₁)/(x₂−x₁). Inclinação maior = reta mais íngreme.',
    link: 'materiais/pre-calculo/retas/funcao-afim.pdf'
  },
  'limite': {
    title: 'Limite',
    body: 'O valor que uma expressão se aproxima cada vez mais, à medida que uma variável se aproxima de um número — mesmo que a expressão nunca seja calculada exatamente ali. É a ideia central do Cálculo 1.'
  },
  'polinomio': {
    title: 'Polinômio',
    body: 'Uma soma de potências de x multiplicadas por números, tipo 3x² + 5x − 1. Grau 1 é uma reta, grau 2 é uma parábola, grau 3 já é uma curva em "S".'
  },
  'dominio': {
    title: 'Domínio de uma função',
    body: 'O conjunto de todos os valores que podem entrar numa função sem quebrar nada — sem dividir por zero, sem raiz quadrada de número negativo, etc.'
  },
  'funcao': {
    title: 'Função',
    body: 'Uma regra que associa, pra cada valor de entrada x, exatamente um valor de saída f(x). Tipo uma máquina: entra x, sai um número só.',
    link: 'materiais/pre-calculo/funcoes/funcoes-conceitos-1.pdf'
  },
  'modulo': {
    title: 'Módulo (valor absoluto)',
    body: 'A distância de um número até o zero, sempre positiva. |5| = 5 e |−5| = 5 também. Formalmente: |x| = x se x ≥ 0, e |x| = −x se x < 0.'
  },
  'raiz-polinomio': {
    title: 'Raiz de um polinômio',
    body: 'Um valor de x que zera o polinômio, isto é, p(x) = 0. Se a é raiz de p(x), então (x − a) é um fator de p(x) — dá pra "tirar" esse fator dividindo o polinômio por (x − a).',
    link: 'materiais/pre-calculo/polinomios/polinomios-1.pdf'
  },
  'produto-notavel': {
    title: 'Produto notável',
    body: 'Atalhos de multiplicação que vale a pena ter decorados. O mais usado aqui: diferença de quadrados, x² − a² = (x − a)(x + a). Também: (x±a)² = x² ± 2ax + a², e (x±a)³ = x³ ± 3x²a + 3xa² ± a³.',
    link: 'materiais/pre-calculo/polinomios/produtos-notaveis.pdf'
  },
  'divisao-polinomios': {
    title: 'Divisão de polinômios',
    body: 'Igual à divisão de números "armada", só que com termos de x. Serve pra fatorar: se você já sabe que a é raiz de p(x), dividir p(x) por (x−a) sobra sem resto e dá o outro fator.',
    link: 'materiais/pre-calculo/polinomios/fatoracao.pdf'
  },
  'funcao-impar': {
    title: 'Função ímpar (e função par)',
    body: 'Ímpar: f(−x) = −f(x) — o gráfico tem simetria em relação à origem (ex: seno, x³). Par: f(−x) = f(x) — o gráfico é espelhado no eixo y (ex: cosseno, x²).',
    link: 'materiais/pre-calculo/funcoes/funcoes-conceitos-2.pdf'
  },
  'limite-lateral': {
    title: 'Limite lateral',
    body: 'O limite calculado só de um lado do ponto: pela direita (x→a⁺, valores maiores que a) ou pela esquerda (x→a⁻, valores menores que a). O limite "normal" só existe se os dois laterais existirem e forem iguais.'
  },
  'continuidade': {
    title: 'Continuidade em um ponto',
    body: 'f é contínua em x=a quando o limite de f em a existe e é igual a f(a): lim(x→a) f(x) = f(a). Em outras palavras, o gráfico não dá pulo nem tem furo ali.'
  },
  'descontinuidade-removivel': {
    title: 'Descontinuidade removível vs. de salto',
    body: 'Removível: o limite existe, só falta (ou está errado) o valor da função no ponto — dá pra "tapar o furo" redefinindo f(a). De salto: os limites laterais existem mas são diferentes — não tem valor que conserte, os dois lados simplesmente não se encontram.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const terms = document.querySelectorAll('.gterm');
  if(!terms.length) return;

  const ROOT_PREFIX = location.pathname.includes('/semanas/') ? '../' : '';
  let openBubble = null;
  let closeTimer = null;
  function closeBubble(){
    if(openBubble){ openBubble.remove(); openBubble = null; }
  }
  function scheduleClose(){
    clearTimeout(closeTimer);
    closeTimer = setTimeout(closeBubble, 180);
  }
  function cancelClose(){
    clearTimeout(closeTimer);
  }

  terms.forEach(el => {
    const key = el.dataset.g;
    const entry = GLOSSARY[key];
    if(!entry) return;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'O que é: ' + entry.title);

    function open(){
      closeBubble();
      const bubble = document.createElement('span');
      bubble.className = 'gbubble';
      bubble.innerHTML =
        (entry.svg ? `<span class="gbubble-svg">${entry.svg}</span>` : '') +
        `<span class="gbubble-title">${entry.title}</span>` +
        `<span class="gbubble-body">${entry.body}</span>` +
        (entry.link ? `<a class="gbubble-more" href="${ROOT_PREFIX}${entry.link}" target="_blank" rel="noopener">Saiba mais no pré-cálculo →</a>` : '');
      el.appendChild(bubble);
      openBubble = bubble;

      const rect = bubble.getBoundingClientRect();
      if(rect.left < 8) bubble.style.setProperty('--shift', (8 - rect.left) + 'px');
      if(rect.right > window.innerWidth - 8) bubble.style.setProperty('--shift', (window.innerWidth - 8 - rect.right) + 'px');

      bubble.addEventListener('mouseenter', cancelClose);
      bubble.addEventListener('mouseleave', scheduleClose);
    }

    el.addEventListener('mouseenter', () => { cancelClose(); open(); });
    el.addEventListener('mouseleave', scheduleClose);
    el.addEventListener('focus', open);
    el.addEventListener('blur', scheduleClose);
    el.addEventListener('click', (e) => {
      if(e.target.closest('.gbubble-more')) return; // deixa o link "saiba mais" navegar normalmente
      e.preventDefault();
      openBubble ? closeBubble() : open();
    });
  });

  document.addEventListener('scroll', closeBubble, {passive:true});
});
