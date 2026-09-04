# Cálculo 1 — caderno de acompanhamento

Página estática (um `index.html` só, sem build, sem dependências) com o cronograma
do curso de Cálculo 1 (UnB, 2º semestre de 2026) e um plano pra acompanhar sem
perder o ritmo. O status de cada semana e a contagem de dias são calculados
sozinhos pela data do computador de quem está vendo, então a página continua
certa o semestre inteiro sem precisar editar nada.

## Rodar localmente

Não precisa de nada além de um navegador. Duas opções:

- Abrir `index.html` direto (duplo clique).
- Ou, se quiser evitar restrições de navegador com arquivos locais, subir um
  servidor simples na pasta:

  ```
  python -m http.server 8000
  ```

  e abrir `http://localhost:8000`.

## Publicar no GitHub Pages

1. Criar um repositório novo no GitHub (pode ser público).
2. Dentro desta pasta:

   ```
   git init
   git add index.html README.md
   git commit -m "primeira versão do caderno de Cálculo 1"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
   git push -u origin main
   ```

3. No GitHub: **Settings → Pages** → em "Build and deployment", escolher
   **Deploy from a branch**, branch `main`, pasta `/ (root)` → **Save**.
4. Em alguns minutos a página fica no ar em
   `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Domínio próprio (opcional)

1. Comprar/ter o domínio (ex.: `meusite.com` ou um subdomínio como
   `calculo.meusite.com`) em qualquer registrador.
2. No provedor de DNS do domínio, criar os registros:
   - **Subdomínio** (ex. `calculo.meusite.com`): um registro `CNAME` apontando
     para `SEU-USUARIO.github.io`.
   - **Domínio raiz** (ex. `meusite.com`): quatro registros `A` apontando para
     os IPs do GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
3. No GitHub: **Settings → Pages → Custom domain**, digitar o domínio e
   salvar. Isso cria um arquivo `CNAME` no repositório (deixa o GitHub criar
   sozinho por ali, não precisa mexer nele na mão).
4. Esperar a propagação do DNS (minutos a algumas horas) e marcar **Enforce
   HTTPS** assim que a opção ficar disponível.

## Editar depois

Tudo fica em `index.html`:

- **Cronograma**: array `WEEKS` no `<script>`, no fim do arquivo — cada item
  tem `start`/`end` (datas) e `title`.
- **Checklist de nivelamento**: lista `<ul class="checklist">` no HTML.
- **Cards de ritmo semanal**: `<div class="cards-grid">`.
- **Datas de prova**: preenchidas pela própria página (ficam salvas no
  navegador de quem acessa, em `localStorage`) — não precisa editar código
  pra isso.
