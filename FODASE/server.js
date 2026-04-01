const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// pasta onde os HTMLs serão salvos
const pasta = path.join(__dirname, "public");

// garantir que a pasta existe
if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta);
}

// rota para criar HTML
app.post("/criar-html", (req, res) => {
    try {
        const { title, post1, post2, tag1, tag2, tag3, tag4, img1, musica, data } = req.body;

        // 🔍 pegar arquivos existentes
        const arquivos = fs.readdirSync(pasta);

        const numeros = arquivos
            .filter(f => f.startsWith("pagina") && f.endsWith(".html"))
            .map(f => parseInt(f.match(/\d+/)?.[0] || 0));

        const maior = numeros.length > 0 ? Math.max(...numeros) : 0;

        const fileName = `pagina${maior + 1}.html`;

        // 🧠 seu HTML (mantido)
        const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- =====================================================
       GOTHIC DARKNESS — Tema gótico anos 2000
       ===================================================== -->
  <title>Psycho Group</title>

  <!-- Ícone da aba (emoji como favicon simples) -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🩸</text></svg>" />

  <!-- Folha de estilos principal -->
  <link rel="stylesheet" href="style.css" />
</head>

<body>

  <!-- =====================================================
       MÚSICA DE FUNDO
       Troque "music.mp3" pelo caminho do seu arquivo .mp3
       ===================================================== -->
  <audio id="bg-music" loop preload="auto">
    <source src="music.mp3" type="audio/mpeg" />
    <!-- Fallback caso o formato não seja suportado -->
    Seu navegador não suporta áudio HTML5.
  </audio>

  <!-- =====================================================
       WRAPPER CENTRAL
       ===================================================== -->
  <div class="wrapper">

    <!-- ==================================================
         HEADER — Nome do site e navegação
         ================================================== -->
    <header class="site-header">

      <!-- Título com efeito glitch (data-text deve ser igual ao conteúdo) -->
      <h1
        class="site-title"
        data-text="Gothic Darkness"
      >Psyco Group</h1>

      <!-- Subtítulo / slogan -->
      <p class="site-subtitle">
        ☩ &nbsp; onde a luz vira conhecimento &nbsp; ☩
      </p>

      <!-- Divisor ornamentado -->
      <div class="header-divider">✦ ✦ ✦</div>

      <!-- Navegação principal -->
      <nav class="site-nav" aria-label="Navegação principal">
        <a href="./lista.html">Voltar</a>
      </nav>

    </header>
    <!-- /HEADER -->


    <!-- ==================================================
         LAYOUT PRINCIPAL — Coluna principal + Sidebar
         ================================================== -->
    <div class="main-layout" id="inicio">

      <!-- ===============================================
           COLUNA PRINCIPAL — Posts / Conteúdo
           =============================================== -->
      <main class="main-column">

        <!-- ---- POST 1 ---- -->
        <article class="panel post" id="post-1">

          <header class="post-header">
            <h2 class="post-title">${title}</h2>
            <time class="post-date" datetime="2025-10-31">${data}</time>
          </header>

          <div class="post-separator"></div>

          <!-- Imagem do post — troque o src pelo caminho da sua imagem -->
          <img
            class="post-image"
            src="./imgs/${img1}"
            alt=""
            loading="lazy"
          />

          <div class="post-body">
            <p>
            ${post1}    
            </p>
            <p>
            ${post2}
            </p>
          </div>

          <!-- Tags do post -->
          <div>
            <span class="tag">${tag1}</span>
            <span class="tag">${tag2}</span>
            <span class="tag">${tag3}</span>
            <span class="tag">${tag4}</span>
          </div>


        </article>
        <!-- /POST 1 -->


  

      </main>
      <!-- /COLUNA PRINCIPAL -->


      <!-- ===============================================
           SIDEBAR — Widgets laterais
           =============================================== -->
      <aside class="sidebar">

        <!-- ---- WIDGET: PLAYER DE ÁUDIO ---- -->
        <section class="panel audio-panel" id="musica">
          <h3 class="panel-title">♪ Trilha Sonora</h3>

          <!-- Ícone animado -->
          <span class="audio-icon" aria-hidden="true">✦</span>
          <span class="audio-label">tocando agora</span>

          <!--
            Player de áudio nativo.
            O arquivo music.mp3 deve estar na mesma pasta do HTML.
            Troque "music.mp3" pelo nome/caminho do seu arquivo.
          -->
          <audio
            id="sidebar-player"
            controls
            loop
          >
            <source src="./musics/${musica}" type="audio/mpeg" />
            Áudio não suportado.
          </audio>

          <!-- Tracklist decorativa — edite as músicas -->
          <ul class="tracklist" style="margin-top: 14px;">
            <li>Within Temptation — Pale</li>
            <li>Evanescence — My Immortal</li>
            <li>HIM — Wicked Game</li>
            <li>Nightwish — Sleeping Sun</li>
            <li>Lacuna Coil — Heaven's a Lie</li>
          </ul>
        </section>
        <!-- /PLAYER -->


        <!-- ---- WIDGET: PERFIL / SOBRE ---- -->
      


        <!-- ---- WIDGET: CONTATO ---- -->
        <section class="panel" id="contato">
          <h3 class="panel-title">☎ Contato</h3>

          <ul class="contact-list">

            <!-- E-mail — edite o href e o texto -->
            <li>
              <span class="contact-icon" aria-hidden="true">✉</span>
              <a href="rodrigo24102019@outlook.com">
                rodrigo24102019@outlook.com
              </a>
            </li>

            <!-- Instagram — edite o link e o @usuário -->
            <li>
              <span class="contact-icon" aria-hidden="true">📸</span>
              <a
                href="https://www.instagram.com/rodrigo.2k20/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @rodrigo.2k20
              </a>
            </li>
            <!-- Adicione mais contatos duplicando os <li> acima -->

          </ul>
        </section> <!-- /CITAÇÃO -->

      </aside>
      <!-- /SIDEBAR -->

    </div>
    <!-- /MAIN LAYOUT -->


    <!-- ==================================================
         FOOTER
         ================================================== -->
    <footer class="site-footer">

      <div class="footer-divider">☩ ✦ ☩</div>

      <p class="footer-text">
        <!-- Edite as informações do rodapé -->
        PsyR &copy; 2025 &nbsp;·&nbsp;
        Feito com solidão e muita cafeína &nbsp;·&nbsp;
        <a href="#inicio">↑ Voltar ao topo</a>
      </p>

      <p class="footer-text" style="margin-top: 6px; color: #333;">
        Melhor visualizado às 3 da manhã, sozinho e com fones de ouvido.
      </p>

      <span class="footer-symbol" aria-hidden="true">☽ ✦ ☾</span>

    </footer>
    <!-- /FOOTER -->

  </div>
  <!-- /WRAPPER -->


  <!-- =====================================================
       SCRIPT — Autoplay de áudio com fallback
       Navegadores modernos bloqueiam autoplay sem interação.
       Este script tenta iniciar e avisa o usuário se falhar.
       ===================================================== -->
  <script>
    (function () {
      // Referência ao player da sidebar
      var player = document.getElementById('sidebar-player');

      // Tentativa de autoplay ao carregar a página
      if (player) {
        var playPromise = player.play();

        if (playPromise !== undefined) {
          playPromise.catch(function () {
            // Autoplay bloqueado — aguarda primeira interação do usuário
            document.addEventListener('click', function startOnClick() {
              player.play();
              document.removeEventListener('click', startOnClick);
            }, { once: true });
          });
        }
      }
    })();
  </script>

</body>
</html>
`;

        // 💾 salvar arquivo
        fs.writeFileSync(path.join(pasta, fileName), htmlContent);

        res.json({
            mensagem: "HTML criado com sucesso!",
            arquivo: fileName,
            url: `http://localhost:${PORT}/${fileName}`
        });

    } catch (err) {
        console.error("ERRO:", err);

        res.status(500).json({
            erro: "Erro interno no servidor",
            detalhe: err.message
        });
    }
});

// servir arquivos estáticos
app.use(express.static(pasta));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});