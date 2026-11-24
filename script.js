//pegar os elementos e salvar na memória...
const cesta = document.getElementById("cesta");
const objeto = document.getElementById("objeto");
const texto_pontos = document.getElementById("pontos");
const texto_vidas = document.getElementById("vidas");
const mensagem = document.getElementById("mensagem");

//variáveis...
let pontos = 0;
let vidas = 3;

let posicao_cesta = 175;
let posicaox_objeto = 100;
let posicaoy_objeto = -20;

let velocidade = 4;
let tipo_objeto = "bom";
let jogando = true;

let bons = ["🗡️", "🏆", "⭐"];


//movimantação...
document.addEventListener("keydown", function (evento) {
   if (jogando === false) {
      return;
   }
   if (evento.key == "ArrowLeft") {
      posicao_cesta -= 20;
   }
   if (evento.key == "ArrowRight") {
      posicao_cesta += 20;
   }

   //ipedir vazamento...
   if (posicao_cesta < 0) {
      posicao_cesta = 0
   };
   if (posicao_cesta > 350) {
      posicao_cesta = 350
   };

   cesta.style.left = posicao_cesta + "px";

});

//fazer o objeto cair...

function atualizar_jogo() {
   if (jogando === false) {
      return;
   }

   posicaoy_objeto = posicaoy_objeto + velocidade;
   objeto.style.top = posicaoy_objeto + "px";

   //ver se a cesta pegou...
   if (posicaoy_objeto >= 340) {
      //ver o tamanho da cesta e criar colisão...
      if (posicaox_objeto + 30 > posicao_cesta && posicaox_objeto < posicao_cesta + 50) {
         if (tipo_objeto === "bom") {
            pontos += 10;
            texto_pontos.innerText = pontos;
            velocidade *= 1.02;
         } else {
            vidas -= 1;
            texto_vidas.innerText = vidas;
         }
         //aqui a gente cria um objeto e cria um novo
         criar_objeto();
      }else if (posicaoy_objeto >= 400) {
         criar_objeto();
      }
   } 

   if (vidas <= 0) {
      jogando = false,
         mensagem.innerText = "GAME OVER! Pontos: " + pontos;
      objeto.style.display = "none";
   }

};

function criar_objeto() {
   objeto.style.opacity = 0;
   posicaoy_objeto = -20;
   //posição X aleatória...
   posicaox_objeto = Math.floor(Math.random() * 360)
   objeto.style.left = posicaox_objeto + "px";

   let sorteio = Math.floor(Math.random() * 4);
   if (sorteio === 0) {
      tipo_objeto = "ruim";
      objeto.innerText = "Larissa";
   } else {
      tipo_objeto = "bom";
      //pega uma coisa boa aleatoria
      let boa_aleatoria = Math.floor(Math.random() * bons.length);
      objeto.innerText = bons[boa_aleatoria];
   }

   objeto.style.opacity = 1;
}

criar_objeto();
window.setInterval(atualizar_jogo, 30);