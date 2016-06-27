/* global desenhoInimigo */

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var velocidadeTerminal = 0;

var pulando = 0;

var arrayTiros;
var arrayVidas;
var qtdPontos = 0;
var pause = 0;
var tmpPause = 0;
var lifeWalk = false;
estados = {
    jogar: 0,
    jogando: 1,
    perdeu: 2,
    pulando: 3,
    correndo: 4,
}

//inicializando canvas
var canvas = document.getElementById('canvas_spritesheet_1');
var ctx = canvas.getContext('2d');
var raf;

//efeito de aumento de imagem da logo do Cefet
var aumentaImg = 1;

//contruÃ§Ã£o das imagens de animaÃ§ao
var animacaoCef = 1;
var animacaoPers = 1;
var imgCefet, imgLogo, imgLogo1, imgPers, imgNevoa, imgBack, imgON, imgGameOver, imgFase2, imgOFF, imgFase, imgEnter, imgBS, imgBSchefao, imgA, imgS, imgD, imgESC, imgW, imgPersonagem, imgBackF1, imgBackF2, imgBackF3, imgPoste,
    imgBackF5, imgNeve, imgBackF6, imgNeve2;
var desenhoCef, desenhoLogo, desenhoLogo1, desenhoPers, desenhoBack,
        desenhoChao, desenhoChaoChefao, desenhoChuva, desenhoArvore, desenhoAnimeFase, desenhoAnimeFimFase1, desenhoAnimeFase2, desenhoBackChefao,
        desenhoTetoChefao1, desenhoNevoa, desenhoBack2, desenhoChao2, desenhoAgua2, desenhoGrade2, desenhoBackChefao2, desenhoChaoChefao2, desenhoAguaChefao2,
        desenhoGameOver, desenhoPoste, desenhoPoste2, desenhoBack3, desenhoNeve, desenhoBack4, desenhoNeve2;

//elementos do personagem da animacao
var desPerson = 1;
var posPersX = 77;
var posPerY = 51.5;

//aÃ§Ã£o atual do personagem principal
var acao = "walking";
var estadoAtual;

//variaveis de controle de execuÃ§Ã£o das fases
var sairAnimacao = 0;
var sairMenu = 1;
var sairFase = 1;
var sairLetreiro = 1;
var sairOpcoes = 1;
var sairFase = 1;
var sairCreditos = 1;
var sairContinuar = 1;
var sairAnimeFase = 1;
var sairChefao1 = 1;
var sairChefao2 = 1;
var sairChefao3 = 1;
var sairFase2 = 1;
var sairAnim2 = 1;
var sairAnim3 = 1;
var sairAnim4 = 1;
var sairAnim5 = 1;
var sairFase3 = 1;
var sairFase4 = 1;
var sairChefao4 = 1;
//controle de tempo em elementos que precisam de delay
var tempo = 0;

//tamanho do menu
var larguraMenu = 159;
var alturaMenu = 195;

var larguraBase;
var alturaBase;

//imagenns a serem utilizadas no menu
var img;

//opÃ§oes do menu
var indice = 0;
var ultimoIndice = 0;
var delay = 0;

// dash-length for off-range
var dashLen = 220;
// we'll update this, initialize
dashOffset = dashLen;
// some arbitrary speed
var speed = 40;

// mensagem a ser exibida no inicio
var txt = "SIGA SEUS INSTINTOS, E RECUPERE SUA IDENTIDADE.";

//posicao inicial do letreiro e iterador
var xLet = 0;
var iLet = 0;

//posicao botoes
var bAudio = 1;
var audio;
var musicas;

//posicao do cursor na tela
var posX;
var posY;

//posicao do cursor relativo ao ttamanho canvas
var gridCanvasX;
var gridCanvasY;

//direcao do fundo do jogo
direcaoX = -2.0;
direcaoY = 2.0;

//variavel para controle de fps
var ultimoTempo = new Date().getTime();
var contador = 0;
var fps = 0;
var tmpAntigo;
var init = new Date().getTime();
var ultimo;
var initFase = 0;
var pts = 0;
var ultimaNevoa = 0;
var tmpContinuar = 0;
var entraChefao = 0;
// construÃ§Ã£o dos desenhos do trabalho
function Desenho(imagem, centroImgX, centroImgY, width, height, novoCentroX, novoCentroY, novoWidth, novoHeight) {
    this.imagem = imagem;
    this.centroImgX = centroImgX;
    this.centroImgY = centroImgY;
    this.width = width;
    this.height = height;
    this.novoCentroX = novoCentroX;
    this.novoCentroY = novoCentroY;
    this.novoWidth = novoWidth;
    this.novoHeight = novoHeight;
    this.deslocaX = 0;
    this.deslocaY = 0;
    this.proximaImg = 0;
    this.desenha = function () {
        ctx.drawImage(this.imagem, this.centroImgX - (this.width / 2), this.centroImgY - (this.height / 2), this.width, this.height, this.novoCentroX - (this.novoWidth / 2), this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
    };
    this.desenhaPers = function () {
        ctx.drawImage(this.imagem, this.centroImgX[this.proximaImg], this.centroImgY[this.proximaImg], this.width[this.proximaImg], this.height[this.proximaImg], this.novoCentroX - (this.novoWidth / 2), this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
    };
    this.desenhaEffectX = function () {
        ctx.drawImage(this.imagem, this.centroImgX - (this.width / 2), this.centroImgY - (this.height / 2), this.width, this.height, this.novoCentroX - (this.novoWidth / 2) + this.deslocaX - canvas.width, this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        ctx.drawImage(this.imagem, this.centroImgX - (this.width / 2), this.centroImgY - (this.height / 2), this.width, this.height, this.novoCentroX - (this.novoWidth / 2) + this.deslocaX, this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        ctx.drawImage(this.imagem, this.centroImgX - (this.width / 2), this.centroImgY - (this.height / 2), this.width, this.height, this.novoCentroX - (this.novoWidth / 2) + this.deslocaX + canvas.width, this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
    };
    this.desenhaEffectY = function () {
        ctx.drawImage(this.imagem, this.centroImgX - (this.width / 2), this.centroImgY - (this.height / 2), this.width, this.height, this.novoCentroX - (this.novoWidth / 2), this.novoCentroY + this.deslocaY - canvas.height - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        ctx.drawImage(this.imagem, this.centroImgX - (this.width / 2), this.centroImgY - (this.height / 2), this.width, this.height, this.novoCentroX - (this.novoWidth / 2), this.novoCentroY + this.deslocaY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        ctx.drawImage(this.imagem, this.centroImgX - (this.width / 2), this.centroImgY - (this.height / 2), this.width, this.height, this.novoCentroX - (this.novoWidth / 2), this.novoCentroY + this.deslocaY + canvas.height - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
    };
    this.limpa = function () {
        ctx.clearRect(this.novoCentroX - (this.novoWidth / 2), this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
    };
    this.atualiza = function (x, y) {
        this.deslocaX += x;
        this.deslocaY += y;
        if (this.deslocaX <= this.novoWidth * -1 || this.deslocaX >= this.novoWidth) {
            this.deslocaX = 0;
        }
        if (this.deslocaY <= this.novoHeight * -1 || this.deslocaY >= this.novoHeight) {
            this.deslocaY = 0;
        }
    };

    this.atualizaObjeto = function (x, y) {
        this.novoCentroX += x;
        this.novoCentroY += y;
        if (this.novoCentroX < (-this.novoWidth / 2)) {
            this.novoCentroX = canvas.width + (this.novoWidth / 2);
        }
        else if (this.novoCentroX > canvas.width + (this.novoWidth / 2)) {
            this.novoCentroX = (-this.novoWidth / 2);
        }
    };
    this.proximoQuadro = function (intervalo) {
        var agora = new Date().getTime();
        // Se ainda nao tem ultimo tempo medido
        if (!ultimo)
            ultimo = agora;
        // Verificacao da mudanca de imagem
        if (agora - ultimo < intervalo)
            return;
        if (this.proximaImg < (this.centroImgX.length - 1))
            this.proximaImg++;
        else {
            this.proximaImg = 0;
        }

        // Guardar hora da ultima mudanca
        ultimo = agora;
    };
}

function DesenhaVida(imagem, xiCanvas, yiCanvas) {
    this.imagem = imagem;
    this.posSprites = recortes["emily"].movimento["itemDeVida"];
    this.x = xiCanvas;
    this.y = yiCanvas;

    this.desenha = function () {
        ctx.drawImage(this.imagem, this.posSprites.x[0], this.posSprites.y[0], this.posSprites.w[0], this.posSprites.h[0], this.x, this.y, this.posSprites.w[0], this.posSprites.h[0]);
    };

    this.atualiza = function () {
        ctx.drawImage(this.imagem, this.posSprites.x[0], this.posSprites.y[0], this.posSprites.w[0], this.posSprites.h[0], this.x, this.y, this.posSprites.w[0], this.posSprites.h[0]);
    };

    this.limpa = function () {
        ctx.clearRect(this.novoCentroX - (this.novoWidth / 2), this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        this.x = xiCanvas;
        this.y = yiCanvas;
    };

    this.posicaoAtual = function () {
        return {
            x: this.x,
            y: this.y,
            h: this.posSprites.w[0],
            w: this.posSprites.h[0]
        }
    }
}

function DesenhaEmily(imagem, xiCanvas, yiCanvas) {
    this.imagem = imagem;
    this.posSprites = recortes["emily"].movimento[acao];
    this.proximaImg = 0;
    this.movimento = acao;
    this.auxPulo = 0;
    this.anda = 0;
    this.tempo = 0;
    this.x = xiCanvas + this.anda;
    this.y = yiCanvas + this.auxPulo;

    this.colisao = {
        l: false,
        r: false,
        u: false,
        d: false
    };

    this.limpa = function () {
        ctx.clearRect(this.novoCentroX - (this.novoWidth / 2), this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        this.proximaImg = 0;
        this.movimento = acao;
        this.auxPulo = 0;
        this.anda = 0;
        this.tempo = 0;
        this.x = xiCanvas + this.anda;
        this.y = yiCanvas + this.auxPulo;
    };

    this.desenha = function () {
        ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], this.x, this.y + this.auxPulo, this.posSprites.w[this.proximaImg] - 10, this.posSprites.h[this.proximaImg] - 40);
    };

    this.atualiza = function () {
        this.x = xiCanvas + this.anda;
        this.y = yiCanvas + this.auxPulo;
        if (acao == "attack" && this.tempo % 5 == 0) {

            if (this.movimento != acao) {
                this.movimento = acao
                this.proximaImg = 0;

                this.posSprites = recortes["emily"].movimento[this.movimento];
            }

            if (this.movimento == "jumping") {
                if (this.proximaImg < (this.posSprites.x.length - 2) /*/ 2*/) {
                    pulando = 1;
                    this.auxPulo = this.auxPulo - 30;
                } else {
                    this.auxPulo = this.auxPulo + 30;
                    if (pulando && this.auxPulo == 0) {
                        acao = "walking";
                        pulando = 0;
                    }
                }
            }


            ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], this.x, this.y, this.posSprites.w[this.proximaImg] - 10, this.posSprites.h[this.proximaImg] - 4);
            this.proximaImg++;

            if (this.proximaImg >= this.posSprites.x.length) {
                this.proximaImg = 0;
                acao = "walking";
            }
        }
        if (this.tempo % 11 == 0) {
            if (this.movimento != acao) {
                this.movimento = acao
                this.proximaImg = 0;
                this.posSprites = recortes["emily"].movimento[this.movimento];
            }

            if (this.movimento == "jumping") {
                if (this.proximaImg < (this.posSprites.x.length - 2) /*/ 2*/) {
                    pulando = 1;
                    this.auxPulo = this.auxPulo - 30;
                } else {
                    this.auxPulo = this.auxPulo + 30;
                    if (pulando && this.auxPulo == 0) {
                        acao = "walking";
                        pulando = 0;
                    }
                }
            }


            ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], this.x, this.y, this.posSprites.w[this.proximaImg] - 10, this.posSprites.h[this.proximaImg] - 4);
            this.proximaImg++;

            if (this.proximaImg >= this.posSprites.x.length)
                this.proximaImg = 0;
        }

        this.tempo = this.tempo + 1;
    };

    this.posicaoAtual = function () {
        return {
            x: this.x,
            y: this.y,
            h: this.posSprites.w[this.proximaImg] - 20,
            w: this.posSprites.h[this.proximaImg] - 55
        }
    }
}

function DesenhaTiro(imagem, xiCanvas, yiCanvas) {
    this.imagem = imagem;
    this.posSprites = recortes["inimigo"][0].movimento["shurikem"];
    this.proximaImg = 0;
    this.anda = 0;
    this.tempo = 0;
    this.sentido = -1;
    this.x = xiCanvas + this.anda;
    this.y = yiCanvas;

    this.colisao = {
        l: false,
        r: false,
        u: false,
        d: false
    };

    this.limpa = function () {
        ctx.clearRect(this.novoCentroX - (this.novoWidth / 2), this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        this.proximaImg = 0;
        this.anda = 0;
        this.tempo = 0;
        this.sentido = -1;
        this.x = xiCanvas + this.anda;
        this.y = yiCanvas;
    };

    this.desenha = function () {
        ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], this.x, this.y, this.posSprites.w[this.proximaImg] - 20, this.posSprites.h[this.proximaImg] - 55);
    };

    this.atualiza = function () {
        this.x = xiCanvas + this.anda;
        this.y = yiCanvas;

        Colisao(this, desenhoEmily);
        if (acao != "attack") {
            if (this.colisao.l || this.colisao.r || this.colisao.u || this.colisao.d) {
                if (arrayVidas.length - 1 == 0) {
                    estadoAtual = estados.perdeu;
                } else {
                    arrayVidas.pop();
                    arrayTiros.splice(arrayTiros.indexOf(this), 1);
                }
            }
            pts += 10;
        } else {
            pts += 100;
        }

        if (this.tempo % 11 == 0) {
            ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], xiCanvas + this.anda, yiCanvas, this.posSprites.w[this.proximaImg] - 20, this.posSprites.h[this.proximaImg] - 55);

            this.anda = this.anda - 10;
        }

        this.tempo = this.tempo + 1;
    };

    this.posicaoAtual = function () {
        return {
            x: this.x,
            y: this.y,
            h: this.posSprites.w[this.proximaImg] - 20,
            w: this.posSprites.h[this.proximaImg] - 55
        }
    }
}

function DesenhaInimigo(imagem, xiCanvas, yiCanvas) {
    this.imagem = imagem;
    //this.posSprites = recortes["inimigo"].movimento["running"];
    this.posSprites = recortes["inimigo"][0].movimento["attacking"];
    this.proximaImg = 0;
    //this.movimento = "running";
    this.movimento = "attacking";
    this.anda = 0;
    this.tempo = 0;
    this.sentido = -1;
    this.x = xiCanvas + this.anda;
    this.y = yiCanvas;

    this.colisao = {
        l: false,
        r: false,
        u: false,
        d: false
    };

    this.limpa = function () {
        ctx.clearRect(this.novoCentroX - (this.novoWidth / 2), this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        this.proximaImg = 0;
        //this.movimento = "running";
        this.movimento = "attacking";
        this.anda = 0;
        this.tempo = 0;
        this.sentido = -1;
        this.x = xiCanvas + this.anda;
        this.y = yiCanvas;
    };

    this.desenha = function () {
        ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], this.x, this.y, this.posSprites.w[this.proximaImg] - 20, this.posSprites.h[this.proximaImg] - 55);
    };

    this.atualiza = function () {
        this.x = xiCanvas + this.anda;
        this.y = yiCanvas;

        Colisao(this, desenhoEmily);
        if (this.colisao.l || this.colisao.r || this.colisao.u || this.colisao.d) {
            estadoAtual = estados.perdeu;
            //alert("Voce perdeu!!!");
        }

        if (this.tempo % 11 == 0) {
            if (this.proximaImg >= this.posSprites.x.length - 1)
                this.proximaImg = 0;

            //if (this.movimento != "running") {
            //    this.movimento = "running"
            //    this.proximaImg = 0;
            //    this.posSprites = recortes["emily"].movimento[this.movimento];

            //    ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], xiCanvas, yiCanvas, this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg])

            //    this.proximaImg++;
            //} else {

            ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], xiCanvas + this.anda, yiCanvas, this.posSprites.w[this.proximaImg] - 20, this.posSprites.h[this.proximaImg] - 55);
            this.proximaImg++;

            //if (this.sentido > 0)
            //this.anda = this.anda + 5;
            //else
            //this.anda = this.anda - 10;
            //}

            if (this.movimento == "attacking" && this.proximaImg == parseInt(this.posSprites.x.length / 5)) {
                // desenhoInimigo.atira();
            }

        }

        this.tempo = this.tempo + 1;
    };

    this.posicaoAtual = function () {
        return {
            x: this.x,
            y: this.y,
            h: this.posSprites.w[this.proximaImg] - 20,
            w: this.posSprites.h[this.proximaImg] - 55
        }
    }

    this.atira = function () {
        if (arrayTiros != null) {
            arrayTiros[arrayTiros.length] = new DesenhaTiro(imgShurikem, this.x - 15, this.y + 60);
        } else {
            arrayTiros = new Array(new DesenhaTiro(imgShurikem, this.x - 15, this.y + 60));
        }
    }
}

function GanhaVida() {
    //this.posSprites = recortes["inimigo"].movimento["running"];
	this.life ; 
	
	
	this.atualiza = function () {
		this.life.desenha();
		this.life.atualiza();
		this.life.x = this.life.x-1;
		if(this.life.x == 40){
			arrayVidas.push(new DesenhaVida(imgVida, 0 + (arrayVidas.length * 30), 30));
		}
	};
	
	this.limpa = function () {
        this.life = new DesenhaVida(imgVida, 500, 30);
    };

    this.desenha = function () {
        this.life.desenha();
    };
	
	this.posicaoAtual = function () {
        return {
            x: this.life.x,
            y: this.life.y,
        }
    };
	
	
}


function DesenhaInimigo2(imagem, xiCanvas, yiCanvas) {
    this.imagem = imagem;
    //this.posSprites = recortes["inimigo"].movimento["running"];
    this.posSprites = recortes["inimigo"][1].movimento["walking"];
    this.proximaImg = 0;
    //this.movimento = "running";
    this.movimento = "walking";
    this.anda = 0;
    this.tempo = 0;
    this.sentido = -1;
    this.x = xiCanvas + this.anda;
    this.y = yiCanvas;

    this.colisao = {
        l: false,
        r: false,
        u: false,
        d: false
    };

    this.limpa = function () {
        ctx.clearRect(this.novoCentroX - (this.novoWidth / 2), this.novoCentroY - (this.novoHeight / 2), this.novoWidth, this.novoHeight);
        this.proximaImg = 0;
        //this.movimento = "running";
        this.movimento = "walking";
        this.anda = 0;
        this.tempo = 0;
        this.sentido = -1;
        this.x = xiCanvas + this.anda;
        this.y = yiCanvas;
    };

    this.desenha = function () {
        ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], this.x, this.y, this.posSprites.w[this.proximaImg] - 20, this.posSprites.h[this.proximaImg] - 55);
    };

    this.atualiza = function () {
        this.x = xiCanvas + this.anda;
        this.y = yiCanvas;

        Colisao(this, desenhoEmily);
        if (this.colisao.l || this.colisao.r || this.colisao.u || this.colisao.d) {
            estadoAtual = estados.perdeu;
            //alert("Voce perdeu!!!");
        }

        if (this.tempo % 11 == 0) {
            if (this.proximaImg >= this.posSprites.x.length - 1)
                this.proximaImg = 0;

            //if (this.movimento != "running") {
            //    this.movimento = "running"
            //    this.proximaImg = 0;
            //    this.posSprites = recortes["emily"].movimento[this.movimento];

            //    ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], xiCanvas, yiCanvas, this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg])

            //    this.proximaImg++;
            //} else {

            ctx.drawImage(this.imagem, this.posSprites.x[this.proximaImg], this.posSprites.y[this.proximaImg], this.posSprites.w[this.proximaImg], this.posSprites.h[this.proximaImg], xiCanvas + this.anda, yiCanvas, this.posSprites.w[this.proximaImg] - 20, this.posSprites.h[this.proximaImg] - 55);
            this.proximaImg++;

            if (this.sentido > 0) {
                this.anda = this.anda + 5;

            } else {
                this.anda = this.anda - 10;
            }
            if (this.anda <= -500) {

                this.sentido = 1;
                this.posSprites = recortes["inimigo"][1].movimento["attacking"];
                this.proximaImg = 0;
                //this.movimento = "running";
                this.movimento = "attacking";

                desenhoInimigo2.atira();
                audio.play('atira');
            }

            if (this.anda > 300) {
                this.sentido = -1;
                this.posSprites = recortes["inimigo"][1].movimento["walking"];
                this.movimento = "walking";
            }



        }

        this.tempo = this.tempo + 1;
    };

    this.posicaoAtual = function () {
        return {
            x: this.x,
            y: this.y,
            h: this.posSprites.w[this.proximaImg] - 20,
            w: this.posSprites.h[this.proximaImg] - 55
        }
    }

    this.atira = function () {
        if (arrayTiros != null) {
            arrayTiros[arrayTiros.length] = new DesenhaTiro(imgShurikem, this.x - 15, this.y + 60);
        } else {
            arrayTiros = new Array(new DesenhaTiro(imgShurikem, this.x - 15, this.y + 60));
        }
    }
}

//desenha o letreiro da animacao
function drawLetreiro(alpha) {
    if (iLet < txt.length) {
        ctx.font = "20px Comic Sans, cursive, TSCu_Comic, sans-serif";
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = ctx.fillStyle = "#000";
        ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]);
        dashOffset -= speed;
        ctx.strokeText(txt[iLet], xLet, canvas.height / 2);

        if (dashOffset <= 0) {
            ctx.fillText(txt[iLet], xLet, canvas.height / 2);
            dashOffset = dashLen;
            xLet += ctx.measureText(txt[iLet++]).width + ctx.lineWidth * Math.random();
            ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());
            ctx.rotate(Math.random() * 0.005);
        }
    }
    if (iLet >= txt.length) {
        tempo++;
        if (tempo == 100) {
            ctx.globalAlpha = 1;
            sairLetreiro = 1;
            tempo = 0;
            iLet = 0;
            dashLen = 220;
            dashOffset = dashLen;
        }
    }
}

//escrever na tela
function escrita(txt, x, y, tamanho, color) {
    ctx.fillStyle = color;
    ctx.font = tamanho + "px Arial, cursive, TSCu_Comic, sans-serif";
    ctx.fillText(txt, x, y);
}

//desenha base de opcoes e creditos
function drawBase(width, height, ptX, ptY) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    larguraBase = width;
    alturaBase = height;
    var x = parseInt(ptX - (larguraBase / 2));
    var y = parseInt(ptY - (alturaBase / 2));
    ctx.fillRect(x, y, larguraBase, alturaBase);
}

function drawBackFaseChefao4() {
    if (estadoAtual == estados.jogar) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack4.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoNeve.desenhaEffectY();
        desenhoNeve.atualiza(0, 2 * direcaoY);
        if (arrayTiros) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].desenha();
                arrayTiros[i].atualiza();
            }
        }

        if (arrayVidas != null) {
            for (i = 0; i < arrayVidas.length; i++) {
                arrayVidas[i].desenha();
                arrayVidas[i].atualiza();
            }
        }

        var tmpAt = new Date().getTime();
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 50000)) {
            sairChefao4 = 1;
            sairAnim5 = 0;
            initFase = new Date().getTime();
            tmpPause = 0;
            tmpContinuar = 0;
            musicas.stop();
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
        }
    }
    else if (estadoAtual == estados.perdeu) {
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }

        while (arrayTiros.length > 0) {
            arrayTiros.pop();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack4.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoNeve.desenhaEffectY();
        desenhoNeve.atualiza(0, 2 * direcaoY);
        desenhoAnimeFimFase1.desenhaPers();
        desenhoAnimeFimFase1.proximoQuadro(150);
        tempo++;
        if (tempo >= 110) {
            tempo = 0;
            sairFase = 1;
            sairMenu = 0;
            desenhoBack4.limpa();
            desenhoChao2.limpa();
            desenhoGrade2.limpa();
            desenhoNeve.limpa();
            desenhoAnimeFimFase1.limpa();
            pts = 0;
            estadoAtual = estados.jogar;
            musicas.stop();
        }
        desenhoGameOver.desenha();
    }
}

function drawBackFase4() {
    if (estadoAtual == estados.jogar) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var tmpAt = new Date().getTime();
        desenhoBack4.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoNeve.desenhaEffectY();
        desenhoNeve.atualiza(0, 2 * direcaoY);
        if (arrayTiros) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].desenha();
                arrayTiros[i].atualiza();
            }
        }

        if (arrayVidas != null) {
            for (i = 0; i < arrayVidas.length; i++) {
                arrayVidas[i].desenha();
                arrayVidas[i].atualiza();
            }
        }
        
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 50000)){
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
            drawBase(450, 90, canvas.width / 2, 110);
            escrita("Prepare-se, seu \u00faltimo desafio ir\u00e1 iniciar-se.", 145, 100, 20, "black");
            escrita("Mantenha o foco!", 270, 135, 20, "black");
        
        } 
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 54000)) {
            sairFase4 = 1;
            sairChefao4 = 0;
            initFase = new Date().getTime();
            tmpPause = 0;
            tmpContinuar = 0;
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
        }
    }
    else if (estadoAtual == estados.perdeu) {
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }

        while (arrayTiros.length > 0) {
            arrayTiros.pop();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack4.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoNeve.desenhaEffectY();
        desenhoNeve.atualiza(0, 2 * direcaoY);
        desenhoAnimeFimFase1.desenhaPers();
        desenhoAnimeFimFase1.proximoQuadro(150);
        tempo++;
        if (tempo >= 110) {
            tempo = 0;
            sairFase = 1;
            sairMenu = 0;
            desenhoBack4.limpa();
            desenhoAnimeFimFase1.limpa();
            desenhoNeve2.limpa();
            desenhoChao2.limpa();
            desenhoGrade2.limpa();
            pts = 0;
            estadoAtual = estados.jogar;
            musicas.stop();
        }
        desenhoGameOver.desenha();
    }
}

function drawAnimacao4() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhoBack3.desenhaEffectX();
    desenhoChao2.desenhaEffectX();
    desenhoGrade2.desenhaEffectX();
    desenhoNeve.desenhaEffectY();
    desenhoNeve.atualiza(0, 2 * direcaoY);
    drawBase(350, 45, canvas.width / 2, 110);
    escrita("Parab\u00e9ns! Continue sua jornada.", 200, 115, 20, "black");
    desenhoAnimeFase2.desenhaPers();
    if(tempo < 70)
        desenhoAnimeFase2.proximoQuadro(150);
    tempo++;
    if (tempo >= 300) {
        tempo = 0;
        sairAnim4 = 1;
        sairFase4 = 0;
        musicas.stop();
        musicas.play('fase4');
    }
}

function drawBackFaseChefao3() {
    if (estadoAtual == estados.jogar) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack3.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoNeve.desenhaEffectY();
        desenhoNeve.atualiza(0, 2 * direcaoY);
        if (arrayTiros) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].desenha();
                arrayTiros[i].atualiza();
            }
        }

        if (arrayVidas != null) {
            for (i = 0; i < arrayVidas.length; i++) {
                arrayVidas[i].desenha();
                arrayVidas[i].atualiza();
            }
        }

        var tmpAt = new Date().getTime();
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 50000)) {
            sairChefao3 = 1;
            sairAnim4 = 0;
            initFase = new Date().getTime();
            tmpPause = 0;
            tmpContinuar = 0;
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
        }
    }
    else if (estadoAtual == estados.perdeu) {
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }

        while (arrayTiros.length > 0) {
            arrayTiros.pop();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack3.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoNeve.desenhaEffectY();
        desenhoNeve.atualiza(0, 2 * direcaoY);
        desenhoAnimeFimFase1.desenhaPers();
        desenhoAnimeFimFase1.proximoQuadro(150);
        tempo++;
        if (tempo >= 110) {
            tempo = 0;
            sairFase = 1;
            sairMenu = 0;
            desenhoBack3.limpa();
            desenhoNeve.limpa();
            desenhoChao2.limpa();
            desenhoGrade2.limpa();
            desenhoAnimeFimFase1.limpa();
            pts = 0;
            estadoAtual = estados.jogar;
            musicas.stop();
        }
        desenhoGameOver.desenha();
    }
}

function drawBackFase3() {
    if (estadoAtual == estados.jogar) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var tmpAt = new Date().getTime();
        desenhoBack3.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoNeve.desenhaEffectY();
        desenhoNeve.atualiza(0, 2 * direcaoY);
        if (arrayTiros) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].desenha();
                arrayTiros[i].atualiza();
            }
        }

        if (arrayVidas != null) {
            for (i = 0; i < arrayVidas.length; i++) {
                arrayVidas[i].desenha();
                arrayVidas[i].atualiza();
            }
        }
        
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 50000)){
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
            drawBase(450, 90, canvas.width / 2, 110);
            escrita("Prepare-se, seu terceiro desafio ir\u00e1 iniciar-se.", 145, 100, 20, "black");
            escrita("Mantenha o foco!", 270, 135, 20, "black");
        
        } 
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 54000)) {
            sairFase3 = 1;
            sairChefao3 = 0;
            initFase = new Date().getTime();
            tmpPause = 0;
            tmpContinuar = 0;
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
        }
    }
    else if (estadoAtual == estados.perdeu) {
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }

        while (arrayTiros.length > 0) {
            arrayTiros.pop();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack3.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoNeve.desenhaEffectY();
        desenhoNeve.atualiza(0, 2 * direcaoY);
        desenhoAnimeFimFase1.desenhaPers();
        desenhoAnimeFimFase1.proximoQuadro(150);
        tempo++;
        if (tempo >= 110) {
            tempo = 0;
            sairFase = 1;
            sairMenu = 0;
            desenhoBack3.limpa();
            desenhoNeve.limpa();
            desenhoChao2.limpa();
            desenhoGrade2.limpa();
            desenhoAnimeFimFase1.limpa();
            pts = 0;
            estadoAtual = estados.jogar;
            musicas.stop();
        }
        desenhoGameOver.desenha();
    }
}


function drawAnimacao3() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhoBackChefao2.desenhaEffectX();
    desenhoChaoChefao2.desenhaEffectX();
    desenhoGrade2.desenhaEffectX();
    desenhoPoste2.desenha();
    desenhoNevoa.desenhaEffectX();
    drawBase(350, 45, canvas.width / 2, 110);
    escrita("Parab\u00e9ns! Continue sua jornada.", 200, 115, 20, "black");
    desenhoAnimeFase2.desenhaPers();
    if(tempo < 70)
        desenhoAnimeFase2.proximoQuadro(150);
    tempo++;
    if (tempo >= 300) {
        musicas.stop();
        musicas.play('fase3');
        tempo = 0;
        sairAnim3 = 1;
        sairFase3 = 0;
    }
}

function drawBackFaseChefao2() {
    if (estadoAtual == estados.jogar) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBackChefao2.desenhaEffectX();
        desenhoChaoChefao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoPoste2.desenha();
        desenhoNevoa.desenhaEffectX();
        if (arrayTiros) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].desenha();
                arrayTiros[i].atualiza();
            }
        }

        if (arrayVidas != null) {
            for (i = 0; i < arrayVidas.length; i++) {
                arrayVidas[i].desenha();
                arrayVidas[i].atualiza();
            }
        }

        var tmpAt = new Date().getTime();
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 50000)) {
            sairChefao2 = 1;
            sairAnim3 = 0;
            initFase = new Date().getTime();
            tmpPause = 0;
            tmpContinuar = 0;
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
        }
    }
    else if (estadoAtual == estados.perdeu) {
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }

        while (arrayTiros.length > 0) {
            arrayTiros.pop();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBackChefao2.desenhaEffectX();
        desenhoChaoChefao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoPoste2.desenha();
        desenhoNevoa.desenhaEffectX();
        desenhoAnimeFimFase1.desenhaPers();
        desenhoAnimeFimFase1.proximoQuadro(150);
        tempo++;
        if (tempo >= 110) {
            tempo = 0;
            sairFase = 1;
            sairMenu = 0;
            desenhoBackChefao2.limpa();
            desenhoChaoChefao2.limpa();
            desenhoGrade2.limpa();
            desenhoNevoa.limpa();
            desenhoPoste2.limpa();
            desenhoAnimeFimFase1.limpa();
            pts = 0;
            estadoAtual = estados.jogar;
            musicas.stop();
        }
        desenhoGameOver.desenha();
    }
}

function drawBackFase2() {
    if (estadoAtual == estados.jogar) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var tmpAt = new Date().getTime();
        desenhoBack2.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoPoste.desenha();
        if (arrayTiros) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].desenha();
                arrayTiros[i].atualiza();
            }
        }

        if (arrayVidas != null) {
            for (i = 0; i < arrayVidas.length; i++) {
                arrayVidas[i].desenha();
                arrayVidas[i].atualiza();
            }
        }
    
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 50000)){
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
            drawBase(450, 90, canvas.width / 2, 110);
            escrita("Prepare-se, seu segundo desafio ir\u00e1 iniciar-se.", 145, 100, 20, "black");
            escrita("Mantenha o foco!", 270, 135, 20, "black");
        
        } 
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 54000)) {
            sairFase2 = 1;
            sairChefao2 = 0;
            initFase = new Date().getTime();
            tmpPause = 0;
            tmpContinuar = 0;
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
        }
    }
    else if (estadoAtual == estados.perdeu) {
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }

        while (arrayTiros.length > 0) {
            arrayTiros.pop();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack2.desenhaEffectX();
        desenhoChao2.desenhaEffectX();
        desenhoGrade2.desenhaEffectX();
        desenhoPoste.desenha();
        desenhoAnimeFimFase1.desenhaPers();
        desenhoAnimeFimFase1.proximoQuadro(150);
        tempo++;
        if (tempo >= 110) {
            tempo = 0;
            sairFase = 1;
            sairMenu = 0;
            desenhoBack2.limpa();
            desenhoChao2.limpa();
            desenhoGrade2.limpa();
            desenhoPoste.limpa();
            desenhoAnimeFimFase1.limpa();
            pts = 0;
            estadoAtual = estados.jogar;
            musicas.stop();
        }
        desenhoGameOver.desenha();
    }
}

function drawAnimacao2() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhoBackChefao.desenhaEffectX();
    desenhoChaoChefao.desenhaEffectX();
    desenhoTetoChefao1.desenhaEffectX();
    desenhoNevoa.desenhaEffectX();
    drawBase(350, 45, canvas.width / 2, 110);
    escrita("Parab\u00e9ns! Continue sua jornada.", 200, 115, 20, "black");
    desenhoAnimeFase2.desenhaPers();
    if(tempo < 70){
        desenhoAnimeFase2.proximoQuadro(150);
    }
    tempo++;
    if (tempo >= 300) {
        tempo = 0;
        sairAnim2 = 1;
        sairFase2 = 0;
        musicas.stop();
        musicas.play('fase2');
    }
}

function drawBackFaseChefao() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (estadoAtual == estados.jogar) {
        desenhoBackChefao.desenhaEffectX();
        desenhoChaoChefao.desenhaEffectX();
        desenhoTetoChefao1.desenhaEffectX();
        desenhoNevoa.desenhaEffectX();
        if (arrayTiros) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].desenha();
                arrayTiros[i].atualiza();
            }
        }

        if (arrayVidas != null) {
            for (i = 0; i < arrayVidas.length; i++) {
                arrayVidas[i].desenha();
                arrayVidas[i].atualiza();
            }
        }
        var tmpAt = new Date().getTime();
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 50000)) {
            sairAnim2 = 0;
            sairChefao1 = 1;
            tempo = 0;
            initFase = new Date().getTime();
            tmpPause = 0;
            tmpContinuar = 0;
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
        }
    }
    else if (estadoAtual == estados.perdeu) {
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }

        while (arrayTiros.length > 0) {
            arrayTiros.pop();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBackChefao.desenhaEffectX();
        desenhoChaoChefao.desenhaEffectX();
        desenhoTetoChefao1.desenhaEffectX();
        desenhoNevoa.desenhaEffectX();
        desenhoAnimeFimFase1.desenhaPers();
        desenhoAnimeFimFase1.proximoQuadro(150);
        tempo++;
        if (tempo >= 110) {
            tempo = 0;
            sairFase = 1;
            sairMenu = 0;
            desenhoBackChefao.limpa();
            desenhoChaoChefao.limpa();
            desenhoTetoChefao1.limpa();
            desenhoNevoa.limpa();
            desenhoAnimeFimFase1.limpa();
            pts = 0;
            estadoAtual = estados.jogar;
            musicas.stop();
        }
        desenhoGameOver.desenha();
    }
}

//efeito de fundo da fase
function drawBackFase() {
    if (estadoAtual == estados.jogar) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var tmpAt = new Date().getTime();
        desenhoBack.desenhaEffectX();
        desenhoChao.desenhaEffectX();

        desenhoInimigo.desenha();
        desenhoInimigo2.desenha();

        desenhoEmily.desenha();

        if (acao == "jumping" || acao == "attack")
            desenhoEmily.atualiza();


        desenhoChuva.atualiza(0, 2 * direcaoY);
        if(((tmpAt - initFase - tmpPause) <= 49000)){
            desenhoInimigo.atualiza();
            desenhoInimigo2.atualiza();
        }

        if (arrayTiros) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].desenha();
                arrayTiros[i].atualiza();
            }
        }

        if (arrayVidas != null) {
            for (i = 0; i < arrayVidas.length; i++) {
                arrayVidas[i].desenha();
                arrayVidas[i].atualiza();
            }
        }

        desenhoArvore.desenha();
        desenhoChuva.desenhaEffectY();
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 50000)){
            
            if (arrayTiros) {
                while (arrayTiros.length > 0) {
                    arrayTiros.pop();
                }
            }
            drawBase(450, 90, canvas.width / 2, 110);
            escrita("Prepare-se, seu primeiro desafio ir\u00e1 iniciar-se.", 145, 100, 20, "black");
            escrita("Mantenha o foco!", 270, 135, 20, "black");
        
        } 
        if (((tmpAt - initFase - tmpPause + tmpContinuar) > 54000)) {
            initFase = new Date().getTime();
            sairChefao1 = 0;
            tmpPause = 0;
            tmpContinuar = 0;
        }
    } else if (estadoAtual == estados.perdeu) {
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }

        while (arrayTiros.length > 0) {
            arrayTiros.pop();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack.desenhaEffectX();
        desenhoChao.desenhaEffectX();
        desenhoAnimeFimFase1.desenhaPers();
        desenhoAnimeFimFase1.proximoQuadro(150);
        tempo++;
        if (tempo >= 110) {
            tempo = 0;
            sairFase = 1;
            sairMenu = 0;
            desenhoBack.limpa();
            desenhoChao.limpa();
            desenhoChuva.limpa();
            desenhoArvore.limpa();
            desenhoInimigo.limpa();
            desenhoInimigo2.limpa();
            desenhoEmily.limpa();
            desenhoAnimeFimFase1.limpa();
            pts = 0;
            estadoAtual = estados.jogar;
            musicas.stop();
        }
        desenhoChuva.atualiza(0, 2 * direcaoY);
        desenhoArvore.desenha();
        desenhoChuva.desenhaEffectY();
        desenhoGameOver.desenha();
    }
}

//cria a animacao antes de iniciar a fase
function drawAnimeFase() {
    if (sairAnimeFase == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoBack.desenha();
        desenhoChao.desenha();

        //if(acao != "jumping")
        //    desenhoEmily.desenha();

        if (arrayTiros != null) {
            for (i = 0; i < arrayTiros.length; i++) {
                arrayTiros[i].atualiza();
            }
        }

        desenhoChuva.desenhaEffectY();
        //desenhoArvore.desenha();
        desenhoChuva.atualiza(0, 2);
        larguraBase = 500;
        alturaBase = 80;
        drawBase(larguraBase, alturaBase, canvas.width / 2, 115);
        escrita("Voc\u00ea perdeu a mem\u00f3ria. V\u00e1 atr\u00e1s de sua identidade.", 115, 120, 20, "black");
        desenhoAnimeFase.desenhaPers();
        desenhoAnimeFase.proximoQuadro(150);
        tempo++;
        if (tempo >= 220) {
            tempo = 0;
            sairAnimeFase = 1;
            sairFase = 0;
            initFase = new Date().getTime();
            musicas.play('fase1');
        }
    }
}

//faz primeira fase do jogo
function drawFase() {
    if (sairFase == 0) {
        if(sairChefao4 == 0)
            drawBackFaseChefao4();
        else if(sairFase4 == 0)
            drawBackFase4();
        else if(sairAnim4 == 0)
            drawAnimacao4();
        else if(sairChefao3 == 0)
            drawBackFaseChefao3();
        else if(sairFase3 == 0)
            drawBackFase3();
        else if (sairAnim3 == 0)
            drawAnimacao3();
        else if (sairChefao2 == 0)
            drawBackFaseChefao2();
        else if (sairFase2 == 0)
            drawBackFase2();
        else if (sairAnim2 == 0)
            drawAnimacao2();
        else if (sairChefao1 == 0)
            drawBackFaseChefao();
        else
            drawBackFase();
        var agora = new Date().getTime();
        contador++;
        var aux = Math.floor(agora - ultimoTempo);
        if (aux >= 1000) {
            fps = contador;
            contador = 0;
            ultimoTempo = agora;
        }
        drawBase(75, 20, 636, 23);
        escrita("FPS: " + fps, 600, 30, 20, "red");
        drawBase(90, 20, 636, 45);
        escrita(pts + "pts", 600, 53, 20, "blue");

        drawBase(80, 20, 70, 23);
        escrita("Vidas: " + arrayVidas.length, 30, 30, 20, "red");
        // ------------------->        continuar a fase a partir daki
    }
}

//faz a parte de continuar menu
function drawContinuarMenu() {
    if (sairContinuar == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var novosDados = JSON.parse(localStorage.getItem('dados'));
        pts = novosDados.pts;
        direcaoX = novosDados.direcaoX;
        direcaoY = novosDados.direcaoY;
        tmpContinuar = tmpContinuar + novosDados.tempo;
        if(novosDados.fase == 8){
            sairChefao4 = 0;
            musicas.play('fase4');
        }
        else if(novosDados.fase == 7){
            sairFase4 = 0;
            musicas.play('fase4');
        }
        else if(novosDados.fase == 6){
            sairChefao3 = 0;
            musicas.play('fase3');
        }
        else if(novosDados.fase == 5){
            sairFase3 = 0;
            musicas.play('fase3');
        }
        else if (novosDados.fase == 4) {
            sairChefao2 = 0;
            musicas.play('fase2');
        }
        else if (novosDados.fase == 3) {
            sairFase2 = 0;
            musicas.play('fase2');
        }
        else if (novosDados.fase == 2) {
            sairChefao1 = 0;
            musicas.play('fase1');
        } else{
            musicas.play('fase1');
        }
        while (arrayVidas.length > 0) {
            arrayVidas.pop();
        }
        arrayVidas = new Array(new DesenhaVida(imgVida, 0, 30));

        for (var i = 1; i < novosDados.vidas; i++) {
            arrayVidas[i] = new DesenhaVida(imgVida, 0 + (i * 30), 30);
        }
        sairContinuar = 1;
        sairFase = 0;
        animacaoCef = 0;
        animacaoPers = 0;
        sairAnimacao = 1;
        indice = 0;
        initFase = new Date().getTime();
    }
}

//faz a parte de opcao do menu
function drawOpcaoMenu() {
    if (sairOpcoes == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgBack, 0, 1020, 613, 270, 0, 0, canvas.width, canvas.height);
        larguraBase = 560;
        alturaBase = 320;
        drawBase(larguraBase, alturaBase, canvas.width / 2, canvas.height / 2);
        escrita("\u00c1UDIO DO JOGO:", 75, 95, 15, "black");
        if (bAudio == 1) {
            ctx.drawImage(imgON, 0, 0, 214, 91, 240, 60, 100, 60);
        }
        else {
            ctx.drawImage(imgOFF, 0, 0, 214, 91, 240, 60, 100, 60);
        }
        escrita("TECLA DE ATAQUE:", 75, 155, 15, "black");
        ctx.drawImage(imgEnter, 0, 0, 151, 120, 240, 130, 80, 80);
        escrita("TECLAS PARA ANDAR:", 75, 205, 15, "black");
        ctx.drawImage(imgA, 0, 0, 71, 59, 240, 180, 38, 38);
        ctx.drawImage(imgD, 0, 0, 71, 59, 290, 180, 38, 38);
        escrita("TECLA PARA PULAR:", 75, 255, 15, "black");
        ctx.drawImage(imgW, 0, 0, 71, 59, 240, 228, 38, 38);
        escrita("SALVAR JOGO:", 360, 95, 15, "black");
        ctx.drawImage(imgESC, 0, 0, 71, 59, 470, 70, 38, 38);
        ctx.drawImage(imgVOLTAR, 0, 0, 138, 64, (canvas.width / 2) - 50, 280, 100, 60);
    }
}

//faz a parte de creditos do menu
function drawCreditosMenu() {
    if (sairCreditos == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgBack, 0, 1020, 613, 270, 0, 0, canvas.width, canvas.height);
        larguraBase = 560;
        alturaBase = 320;
        drawBase(larguraBase, alturaBase, canvas.width / 2, canvas.height / 2);
        ctx.drawImage(imgVOLTAR, 0, 0, 138, 64, (canvas.width / 2) - 50, 280, 100, 60);
        escrita("Este jogo foi desenvolvido por Daniel Gomes, Diego Haji, Jo\u00e3o Marcos e Roberto", 85, 150, 15, "black");
        escrita("Junior, todos alunos graduandos em Engenharia de Computa\u00e7\u00e3o do CEFET-MG", 87, 170, 15, "black");
        escrita("campus Tim\u00f3teo. Tal trabalho \u00e9 pr\u00e9-requisito para aprova\u00e7\u00e3o na disciplina de", 96, 190, 15, "black");
        escrita("Programa\u00e7\u00e3o com Jogos, que possui como professor o Andr\u00e9 Rodrigues da Cruz.", 82, 210, 15, "black");
        escrita("Utilizou-se para a constru\u00e7\u00e3o do jogo, a linguagem JavaScript em conjunto com a", 83, 240, 15, "black");
        escrita("API Canvas do HTML5. Utilizou-se folha de estilo CSS como parte do layout do jogo.", 75, 260, 15, "black");
        ctx.drawImage(imgLogo, 0, 0, 1920, 1080, canvas.width / 2 - 90, 15, 180, 139, "black");
    }
}

//desenha plano de fundo do menu
function atualizarPlanoDeFundo() {
    ctx.drawImage(imgBack, 0, 1020, 613, 270, 0, 0, canvas.width, canvas.height);
    desenhoLogo.novoCentroY = 80;
    desenhoLogo.desenha();
}

//desenha painel atrÃ¡s do menu
function desenharBaseMenu() {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    var x = parseInt((canvas.width / 2) - (larguraMenu / 2));
    var y = parseInt((canvas.height / 2) - (alturaMenu / 2) + 60);
    ctx.fillRect(x, y, larguraMenu, alturaMenu);
}

//desenha todos os itens doo menu
function desenharItensMenu() {
    var x = parseInt((canvas.width / 2) - (larguraMenu / 2));
    var y = parseInt((canvas.height / 2) - (alturaMenu / 2) + 60);
    var img;
    img = new Image();
    img.src = "images/iniciar_1.png";
    ctx.drawImage(img, x, y);

    img = new Image();
    img.src = "images/continuar_1.png";
    ctx.drawImage(img, x, y + 50);

    img = new Image();
    img.src = "images/opcoes_1.png";
    ctx.drawImage(img, x, y + 100);

    img = new Image();
    img.src = "images/creditos_1.png";
    ctx.drawImage(img, x, y + 150);
}

//manda desenhar o menu
function desenharMenu() {
    atualizarPlanoDeFundo();
    desenharBaseMenu();
    desenharItensMenu();
}

//desenha o item selecionado pelo usuÃ¡rio no menu
function selecionarItem(indice) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharMenu();
    var x = parseInt((canvas.width / 2) - (larguraMenu / 2));
    var y = parseInt((canvas.height / 2) - (alturaMenu / 2) + 60);
    var img;
    img = new Image();
    switch (indice) {
        case 0:
            img.src = "images/iniciar_2.png";
            ctx.drawImage(img, x, y);
            break;
        case 1:
            img.src = "images/continuar_2.png";
            ctx.drawImage(img, x, y + 50);
            break;
        case 2:
            img.src = "images/opcoes_2.png";
            ctx.drawImage(img, x, y + 100);
            break;
        case 3:
            img.src = "images/creditos_2.png";
            ctx.drawImage(img, x, y + 150);
            break;
    }
}

//responsÃ¡vel por criar o menu
function drawMenu() {
    if (delay == 1) {
        tempo++;
        if (tempo == 200) {
            delay = 0;
            tempo = 0;
            desenhoInimigo.limpa();
            desenhoInimigo2.limpa();
            desenhoEmily.limpa();
            desenhoPers.limpa();
        }
    } else {
        if (sairMenu == 0 && animacaoCef == 0 && animacaoPers == 0 && sairAnimacao == 1) {
            selecionarItem(indice);
        }
        else if (sairMenu == 1 && animacaoCef == 0 && animacaoPers == 0 && sairAnimacao == 1) {

            if (indice == 0) {
                if (pause == 0) {
                    drawAnimeFase();
                    drawFase();
                } else {
                    drawBase(80, 30, canvas.width / 2, canvas.height / 2);
                    escrita("PAUSE", canvas.width / 2 - 32, canvas.height / 2 + 8, 20, "red");
                }
            }
            else if (indice == 1) {
                drawContinuarMenu();
            }
            else if (indice == 2) {
                drawOpcaoMenu();
            }
            else if (indice == 3) {
                drawCreditosMenu();
            }
        }
    }
}

// desenha a logo da Empresa na animaÃ§Ã£o
function drawLogoAnimacao() {
    if (sairAnimacao == 0 && animacaoPers == 0 && animacaoCef == 0 && sairMenu == 1 && sairLetreiro == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoLogo.desenha();
        tempo++;
        if (tempo == 150) {
            sairAnimacao = 1;
            sairMenu = 0;
            tempo = 0;
        }
    }
}

//desenha o movimento do personagem na animaÃ§Ã£o inicial
function drawPersonagemAnimacao() {
    if (animacaoPers == 1 && animacaoCef == 0 && sairAnimacao == 0 && sairMenu == 1 && sairLetreiro == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoPers.desenha();
        if (tempo == 6) {
            if (desPerson <= 14) {
                desenhoPers.centroImgX += 300;
                desPerson++;
            }
            else {
                animacaoPers = 0;
                desPerson = 0;
                desenhoPers.centroImgX -= 4500;
            }
            tempo = 0;
        }
        tempo++;
        if (animacaoPers == 0)
            tempo = 0;
    }
}

//cria a animaÃ§Ã£o da logo do cefet na animaÃ§Ã£o inicial
function drawCefet() {
    if (animacaoCef == 1 && sairAnimacao == 0 && sairMenu == 1 && sairLetreiro == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhoCef.desenha();
        if (aumentaImg == 1 && tempo == 0) {
            desenhoCef.novoWidth = desenhoCef.novoWidth * 1.03;
            desenhoCef.novoHeight = desenhoCef.novoHeight * 1.03;
            desenhoCef.desenha();
        }
        else if (aumentaImg == 0) {
            desenhoCef.novoWidth = desenhoCef.novoWidth * 0.97;
            desenhoCef.novoHeight = desenhoCef.novoHeight * 0.97;
            if (desenhoCef.novoWidth > 1)
                desenhoCef.desenha();
            else {
                animacaoCef = 0;
                sairLetreiro = 0;
            }
        }
        if (desenhoCef.novoHeight >= 300) {
            tempo++;
            if (tempo == 70) {
                tempo = 0;
                aumentaImg = 0;
            }
        }
    }
}

//contem todas as etapas da animacao inicial do jogo
function drawAnimacaoInicial() {
    drawCefet();
    if (animacaoCef == 0 && sairAnimacao == 0 && sairMenu == 1 && sairLetreiro == 0) {
        arrayVidas = new Array(new DesenhaVida(imgVida, 0, 30));

        for (var i = 1; i < 5; i++) {
            arrayVidas[i] = new DesenhaVida(imgVida, 0 + (i * 30), 30);
        }

        ctx.clearRect(xLet, 0, canvas.width, canvas.height);
        drawLetreiro(2 / 3);
    }
    drawPersonagemAnimacao();
    drawLogoAnimacao();
}

//possui o loop e mantem todas as etapas do jogo
function drawJogo() {
    drawAnimacaoInicial();
    drawMenu();
    window.requestAnimationFrame(drawJogo);
}

// inicializaÃ§Ã£o de imagens e chama as fases do jogo
function draw() {
    imgCefet = new Image();
    imgCefet.src = 'images/cefet.jpg';
    desenhoCef = new Desenho(imgCefet, 246, 150, 492, 299, 350, 200, 10, 10);

    imgPers = new Image();
    imgPers.src = 'images/movimento.png';
    desenhoPers = new Desenho(imgPers, 150, 100, 285, 190, canvas.width / 2, canvas.height / 2, 285, 190);

    imgLogo = new Image();
    imgLogo.src = 'images/logo.png';
    desenhoLogo = new Desenho(imgLogo, 960, 540, 1920, 1080, canvas.width / 2, canvas.height / 2, 200, 154);

    imgBack = new Image();
    imgBack.src = "images/back.png";

    imgNevoa = new Image();
    imgNevoa.src = "images/t6bkug.png";

    imgFase2 = new Image();
    imgFase2.src = "images/InimigosFase2.png";

    imgEmily = new Image();
    imgEmily.src = "images/" + recortes["emily"].arquivo;

    imgVida = new Image();
    imgVida.src = "images/" + recortes["inimigo"][0].arquivo;

    imgInimigo = new Image();
    imgInimigo.src = "images/" + recortes["inimigo"][0].arquivo;

    imgInimigo2 = new Image();
    imgInimigo2.src = "images/" + recortes["inimigo"][1].arquivo;

    imgShurikem = new Image();
    imgShurikem.src = "images/" + recortes["inimigo"][0].arquivo;

    imgFase = new Image();
    imgFase.src = "images/fase.png";

    imgGameOver = new Image();
    imgGameOver.src = "images/GameOver.png";
    
    imgBackF1 = new Image();
    imgBackF1.src = "images/fundoFase1.png";
    
    imgBackF2 = new Image();
    imgBackF2.src = "images/fundoFase2.png";

    imgBackF3 = new Image();
    imgBackF3.src = "images/fundoFase3.png";
    
    imgPoste = new Image();
    imgPoste.src = "images/poste.png";
    
    imgBackF5 = new Image();
    imgBackF5.src = "images/fundoFase4.png";
    
    imgNeve = new Image();
    imgNeve.src = "images/neve.png";
    
    imgBackF6 = new Image();
    imgBackF6.src = "images/fundoFase5.png";
    
    imgNeve2 = new Image();
    imgNeve2.src = "images/neve2.png";
    
    desenhoChuva = new Desenho(imgFase, 250, 2150, 500, 280, canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
    desenhoChao = new Desenho(imgFase, 450, 800, 500, 100, canvas.width / 2, canvas.height - 35, canvas.width + 1, 70);
    desenhoChaoChefao = new Desenho(imgFase, 800, 2135, 500, 70, canvas.width / 2, canvas.height - 35, canvas.width, 70);
    desenhoBack = new Desenho(imgBackF1, 1024, 256, 2048, 512, canvas.width / 2, canvas.height / 2, canvas.width + 1, canvas.height);
    desenhoNevoa = new Desenho(imgNevoa, 400, 300, 800, 600, canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
    desenhoBackChefao = new Desenho(imgFase, 450, 1040, 499, 281, canvas.width / 2, canvas.height / 2, canvas.width + 2, canvas.height);
    desenhoTetoChefao1 = new Desenho(imgFase, 800, 2020, 500, 40, canvas.width / 2, 20, canvas.width + 2, 40);
    desenhoBack2 = new Desenho(imgBackF3, 1024, 256, 2048, 512, canvas.width / 2, canvas.height / 2, canvas.width + 1, canvas.height);
    desenhoAgua2 = new Desenho(imgFase2, 260, 1100, 500, 280, canvas.width / 2, 310, canvas.width + 1, 178);
    desenhoChao2 = new Desenho(imgFase2, 260, 840, 500, 180, canvas.width / 2, 365, canvas.width + 2, 70);
    desenhoGrade2 = new Desenho(imgFase2, 800, 855, 500, 210, canvas.width / 2, 325, canvas.width + 1, 40);
    desenhoBackChefao2 = new Desenho(imgBackF2, 1023, 256, 2047, 512, canvas.width / 2, canvas.height / 2, canvas.width+1, canvas.height);
    desenhoAguaChefao2 = new Desenho(imgFase2, 260, 1100, 500, 280, canvas.width / 2, 293, canvas.width + 1, 210);
    desenhoChaoChefao2 = new Desenho(imgFase2, 260, 1390, 500, 180, canvas.width / 2, 365, canvas.width + 1, 70);
    desenhoGameOver = new Desenho(imgGameOver, 482, 275, 795, 120, canvas.width / 2, canvas.height / 2, 500, 150);
    desenhoPoste = new Desenho(imgPoste, 175, 215, 20, 90, 250, 295, 30, 120);
    desenhoPoste2 = new Desenho(imgPoste, 223, 214, 22, 92, 250, 295, 30, 120);
    desenhoBack3 = new Desenho(imgBackF5, 1024, 256, 2048, 512, canvas.width / 2, canvas.height / 2, canvas.width+1, canvas.height);
    desenhoNeve = new Desenho(imgNeve, 350, 200, 700, 400, canvas.width/2, canvas.height/2, canvas.width, canvas.height);
    desenhoBack4 =  new Desenho(imgBackF6, 1024, 256, 2048, 512, canvas.width / 2, canvas.height / 2, canvas.width+1, canvas.height);
    desenhoNeve2 = new Desenho(imgNeve2, 350, 200, 700, 400, canvas.width/2, canvas.height/2, canvas.width, canvas.height);
    
    desenhoEmily = new DesenhaEmily(imgEmily, 40, 280);
    
    desenhoInimigo = new DesenhaInimigo(imgInimigo, 580, 280);

    desenhoInimigo2 = new DesenhaInimigo2(imgInimigo2, 780, 280);

    desenhoArvore = new Desenho(imgFase, 60, 1000, 120, 500, 250, 200, 100, 400);


    imgON = new Image();
    imgON.src = "images/on.png";

    imgOFF = new Image();
    imgOFF.src = "images/off.png";

    imgVOLTAR = new Image();
    imgVOLTAR.src = "images/voltar.png";

    imgEnter = new Image();
    imgEnter.src = "images/atacar.png";

    imgBS = new Image();
    imgBS.src = "images/bs.png";

    imgA = new Image();
    imgA.src = "images/A.png";

    imgS = new Image();
    imgS.src = "images/S.png";

    imgD = new Image();
    imgD.src = "images/D.png";

    imgW = new Image();
    imgW.src = "images/W.png";

    imgESC = new Image();
    imgESC.src = "images/ESC.png";
  

    var centroImgX = recortes["emily"].movimento.animacao.x;
    var centroImgY = recortes["emily"].movimento.animacao.y;
    var width = recortes["emily"].movimento.animacao.h;
    var height = recortes["emily"].movimento.animacao.w;

    var centroImgX2 = recortes["emily"].movimento.animacao2.x;
    var centroImgY2 = recortes["emily"].movimento.animacao2.y;
    var width2 = recortes["emily"].movimento.animacao2.h;
    var height2 = recortes["emily"].movimento.animacao2.w;

    var centroImgX3 = recortes["emily"].movimento.animacaoFimFase.x;
    var centroImgY3 = recortes["emily"].movimento.animacaoFimFase.y;
    var width3 = recortes["emily"].movimento.animacaoFimFase.h;
    var height3 = recortes["emily"].movimento.animacaoFimFase.w;

    estadoAtual = estados.jogar;

    imgPersonagem = new Image();
    imgPersonagem.src = "images/EmilySprites.png";
    desenhoAnimeFase = new Desenho(imgPersonagem, centroImgX, centroImgY, width, height, 80, 320, 215, 145);
    desenhoAnimeFase2 = new Desenho(imgPersonagem, centroImgX2, centroImgY2, width2, height2, 110, 320, 120, 130);
    desenhoAnimeFimFase1 = new Desenho(imgPersonagem, centroImgX3, centroImgY3, width3, height3, 110, 320, 120, 110);

    arrayVidas = new Array(new DesenhaVida(imgVida, 0, 30));

    for (var i = 1; i < 5; i++) {
        arrayVidas[i] = new DesenhaVida(imgVida, 0 + (i * 30), 30);
    }
    audio = new Howl({//http://howlerjs.com/
        urls: ['sound/efeitos.mp3'],
        sprite: {
            botao: [0, 500],
            espada: [500, 600],
            atira: [1100, 2200],
            pulo: [3300, 1000]
        
        }
    });
    musicas = new Howl({//http://howlerjs.com/
        urls: ['sound/musicas.mp3'],
        loop: true,
        volume: 0.5,
        sprite: {
            fase1: [0, 178000],
            fase2: [178000, 95000], 
            fase3: [274000, 229000],
            fase4: [501000, 175000],
            chefao: [667000, 21000]
        }
    });
    drawJogo();
}

//gera os sons do menu
function somMenu(indice, event) {
    if (sairMenu == 0 && ultimoIndice != indice && bAudio == 1) {
        event.preventDefault();
        audio.play('botao');
        //document.body.appendChild(audio);
        ultimoIndice = indice;
    }
}

//envento sobre clique
window.onclick = function (event) {
    if (sairMenu == 0) {
        sairMenu = 1;
        if (indice == 0) {
            arrayVidas = new Array(new DesenhaVida(imgVida, 0, 30));

            for (var i = 1; i < 5; i++) {
                arrayVidas[i] = new DesenhaVida(imgVida, 0 + (i * 30), 30);
            }

            estadoAtual = estados.jogar;

            sairAnimeFase = 0;
        }
        else if (indice == 1) {
            sairContinuar = 0;
        }
        else if (indice == 2) {
            sairOpcoes = 0;
        } else if (indice == 3) {
            sairCreditos = 0;
        }
    }
    else if (sairOpcoes == 0) {
        if (gridCanvasX >= 240 && gridCanvasX <= 290 && gridCanvasY >= 60 && gridCanvasY <= 120) {
            bAudio = 1;
        }
        else if (gridCanvasX >= 291 && gridCanvasX <= 340 && gridCanvasY >= 60 && gridCanvasY <= 120) {
            bAudio = 0;
        } else if (gridCanvasX >= (canvas.width / 2 - 50) && gridCanvasX <= (canvas.width / 2 + 50) && gridCanvasY >= 280 && gridCanvasY <= 340) {
            sairMenu = 0;
            sairOpcoes = 1;
        }
    }
    else if (sairCreditos == 0) {
        if (gridCanvasX >= (canvas.width / 2 - 50) && gridCanvasX <= (canvas.width / 2 + 50) && gridCanvasY >= 280 && gridCanvasY <= 340) {
            sairMenu = 0;
            sairCreditos = 1;
        }
    }
}

// evento sobre o mouse
window.onmousemove = function (event) {
    posX = event.clientX;
    posY = event.clientY;
    //console.log("PosiÃ§Ã£o: " + posX + ", " + posY);
    var x = parseInt(((window.innerWidth - canvas.width) / 2) + (canvas.width / 2) - (larguraMenu / 2));
    var y = parseInt(((window.innerHeight - canvas.height) / 2) + (canvas.height / 2) - (alturaMenu / 2) + 60);
    gridCanvasX = posX - ((window.innerWidth - canvas.width) / 2);
    gridCanvasY = posY - ((window.innerHeight - canvas.height) / 2);
    if (sairMenu == 0) {
        if (posX > x && posX < x + larguraMenu) {
            if (posY > y && posY < y + alturaMenu) {
                if (posY >= 281 && posY <= 324) {                       //primeiro elemento do menu
                    indice = 0;
                    somMenu(indice, event);
                }
                else if (posY >= 329 && posY <= 374) {                //segundo elemento do menu
                    indice = 1;
                    somMenu(indice, event);
                }
                else if (posY >= 379 && posY <= 424) {                  //terceiro elemento do menu
                    indice = 2;
                    somMenu(indice, event);
                }
                else if (posY >= 429 && posY <= 474) {                  //quarto elemento do menu
                    indice = 3;
                    somMenu(indice, event);
                }
            }
        }
        selecionarItem(indice);
    }
};


//evento sobre o teclado
window.onkeydown = function (e) {
    tecla(e);
}
var tempP = 0;
window.onkeyup = function (e) {
    //tecla(e);
    //console.log(e.keyCode);
}
function tecla(e) {
    var key = e.keyCode;
    if (key === 13) {                                // pressionar tecla enter
        if (sairMenu == 1 && sairAnimacao == 0) {    //(encerrar animacao)
            sairAnimacao = 1;
            sairMenu = 0;
            animacaoCef = 0;
            animacaoPers = 0;
            sairLetreiro = 1;
            ctx.globalAlpha = 1;
        }
        else if (sairMenu == 0) {                    //seleciona opÃ§Ã£o do menu
            sairMenu = 1;
            if (indice == 0) {

                arrayVidas = new Array(new DesenhaVida(imgVida, 0, 30));

                for (var i = 1; i < 5; i++) {
                    arrayVidas[i] = new DesenhaVida(imgVida, 0 + (i * 30), 30);
                }

                estadoAtual = estados.jogar;

                sairAnimeFase = 0;
            }
            else if (indice == 1) {
                sairContinuar = 0;
            }
            else if (indice == 2) {
                sairOpcoes = 0;
            } else if (indice == 3) {
                sairCreditos = 0;
            }
        }
        tempo = 0;
    } else if (key === 38) {                         //pressionar tecla para cima(opcoes de menu)
        if (indice <= 3 && indice > 0) {
            somMenu(indice, e);
            indice--;
        }
        selecionarItem(indice);
    }
    if (key === 68) {                         //pressionar tecla D
        desenhoBack4.atualiza(0.4 * direcaoX, 0);
        desenhoBack3.atualiza(0.4 * direcaoX, 0);
        desenhoBack.atualiza(0.4 * direcaoX, 0);
        desenhoChao.atualiza(1.4 * direcaoX, 0);
        desenhoBackChefao.atualiza(0.4 * direcaoX, 0);
        desenhoChaoChefao.atualiza(1.4 * direcaoX, 0);
        desenhoTetoChefao1.atualiza(1.6 * direcaoX, 0);
        desenhoNevoa.atualiza(2.0 * direcaoX, 0);
        desenhoBack2.atualiza(0.4 * direcaoX, 0);
        desenhoAgua2.atualiza(0.37 * direcaoX, 0);
        desenhoChao2.atualiza(1.4 * direcaoX, 0);
        desenhoGrade2.atualiza(1.6 * direcaoX, 0);
        desenhoBackChefao2.atualiza(0.4 * direcaoX, 0);
        desenhoAguaChefao2.atualiza(0.37 * direcaoX, 0);
        desenhoChaoChefao2.atualiza(1.4 * direcaoX, 0);
        
        acao = "walking";
        if (sairFase == 0 && sairAnimeFase == 1 && sairAnim2 == 1 && pause == 0) {
            desenhoEmily.atualiza();
        }
        //desenhoInimigo.atualiza();
        desenhoArvore.atualizaObjeto(1.5 * direcaoX, 0);
        desenhoPoste.atualizaObjeto(1.65 * direcaoX, 0);
        desenhoPoste2.atualizaObjeto(1.65 * direcaoX, 0);
    }
    if (key === 65) {                         //pressionar tecla A
        desenhoBack4.atualiza(-0.4 * direcaoX, 0);
        desenhoBack3.atualiza(-0.4 * direcaoX, 0);
        desenhoBack.atualiza(-0.4 * direcaoX, 0);
        desenhoChao.atualiza(-1.4 * direcaoX, 0);
        desenhoBackChefao.atualiza(-0.4 * direcaoX, 0);
        desenhoChaoChefao.atualiza(-1.4 * direcaoX, 0);
        desenhoTetoChefao1.atualiza(-1.6 * direcaoX, 0);
        desenhoNevoa.atualiza(-2.0 * direcaoX, 0);
        desenhoBack2.atualiza(-0.4 * direcaoX, 0);
        desenhoAgua2.atualiza(-0.37 * direcaoX, 0);
        desenhoChao2.atualiza(-1.4 * direcaoX, 0);
        desenhoGrade2.atualiza(-1.6 * direcaoX, 0);
        desenhoBackChefao2.atualiza(-0.4 * direcaoX, 0);
        desenhoAguaChefao2.atualiza(-0.37 * direcaoX, 0);
        desenhoChaoChefao2.atualiza(-1.4 * direcaoX, 0);
        acao = "walking";
        if (sairFase == 0 && sairAnimeFase == 1 && sairAnim2 == 1 && pause == 0) {
            desenhoEmily.atualiza();
        }
        //desenhoInimigo.atualiza();
        desenhoArvore.atualizaObjeto(-1.5 * direcaoX, 0);
        desenhoPoste.atualizaObjeto(-1.65 * direcaoX, 0);
        desenhoPoste2.atualizaObjeto(-1.65 * direcaoX, 0);

    }
    if ((key === 80 || key == 112) && sairFase == 0) {
        if (pause == 1) {
            pause = 0;
            var temporario = new Date().getTime();
            tempP = temporario - tempP;
            tmpPause = tmpPause + tempP;
            tempP = 0;
        } else {
            pause = 1;
            tempP = new Date().getTime();
        }
    }
    if (key === 87) {                         //pressionar tecla W
        acao = "jumping";
        if(sairFase == 0)
            audio.play('pulo');
        // desenhoEmily.atualiza();
    }
    if (key === 78) {                         //pressionar tecla S
        acao = "attack";
        if(sairFase == 0)
            audio.play('espada');
        //desenhoEmily.atualiza();
    }
    if (key === 83) {                         //pressionar tecla S
        console.log("abaixa?");
    }
    if (key === 40) {                         //pressionar tecla para baixo(opcoes de menu)
        if (indice < 3 && indice >= 0) {
            somMenu(indice, e);
            indice++;
        }
        selecionarItem(indice);
    }
    if (key === 8) {                             //pressionar tecla voltar
        if (sairOpcoes == 0) {
            sairMenu = 0;
            sairOpcoes = 1;
        } else if (sairCreditos == 0) {
            sairMenu = 0;
            sairCreditos = 1;
        }
    }

    if (key === 55) {                              //pressionar tecla 7 (atirar)
        if (sairFase == 0) {
            desenhoInimigo.atira();
            audio.play('atira');
        }
    }

    if (key === 48) {                              //pressionar tecla 0
        if (sairFase == 0) {
            if (direcaoX < 0) {
                direcaoX = -1.0;
                direcaoY = 1.0;
            }
            else {
                direcaoX = 1.0;
                direcaoY = 1.0;
            }
        }
    } else if (key === 57) {                              //pressionar tecla 9
        if (sairFase == 0) {
            if (direcaoX < 0) {
                direcaoX = -3.0;
                direcaoY = 3.0;
            }
            else {
                direcaoX = 3.0;
                direcaoY = 3.0;
            }
        }
    }
    else if (key === 56) {                                //pressionar tecla 8
        if (sairFase == 0) {
            if (direcaoX < 0) {
                direcaoX = -2.0;
                direcaoY = 2.0;
            }
            else {
                direcaoX = 2.0;
                direcaoY = 2.0;
            }
        }
    }
    else if (key === 27) {
        if (sairFase == 0 && pause == 0) {
            sairFase = 1;
            sairMenu = 0;
            var dados = {};
            dados.vidas = arrayVidas.length;
            dados.pts = pts;
            dados.direcaoX = direcaoX;
            dados.direcaoY = direcaoY;
            var tmpA = new Date().getTime();
            if(sairAnim2 == 0 || sairAnim3 == 0 || sairAnim4 == 0)
                dados.tempo = 0;
            else
                dados.tempo = tmpA - initFase + tmpPause + tmpContinuar;
            if(sairChefao4 == 0){
                dados.fase = 8;
            }
            else if(sairFase4 == 0 || sairAnim4 == 0){
                dados.fase = 7;
            }
            else if(sairChefao3 == 0){
                dados.fase = 6;
            }
            else if(sairFase3 == 0 || sairAnim3 == 0){
                dados.fase = 5;
            }
            else if (sairChefao2 == 0) {
                dados.fase = 4;
            }
            else if (sairFase2 == 0 || sairAnim2 == 0) {
                dados.fase = 3;
            }
            else if (sairChefao1 == 0) {
                dados.fase = 2;
            } else {
                dados.fase = 1;
            }
            localStorage.setItem('dados', JSON.stringify(dados));
            pts = 0;
            direcaoX = -2.0;
            direcaoY = 2.0;
            delay = 1;
            tempo = 0;
            sairChefao1 = 1;
            sairFase2 = 1;
            sairChefao2 = 1;
            sairFase3 = 1;
            sairFase4 = 1;
            sairChefao3 = 1;
            sairChefao4 = 1;
            tmpContinuar = 0;
            musicas.stop();
            if (localStorage.getItem('dados')) {
                drawBase(180, 30, canvas.width / 2, canvas.height / 2);
                escrita("Salvo com sucesso!", canvas.width / 2 - 89, canvas.height / 2 + 8, 20, "red");
            }
            else {
                drawBase(140, 30, canvas.width / 2, canvas.height / 2);
                escrita("Erro ao salvar!", canvas.width / 2 - 65, canvas.height / 2 + 8, 20, "red");
            }
            while (arrayTiros.length > 0) {
                arrayTiros.pop();
            }
            while (arrayVidas.length > 0) {
                arrayVidas.pop();
            }
        }
    }
}
;

//Detectando ColisÃ£o
function Colisao(sprite1, sprite2) {
    var colisao = {
        a: {
            l: false,
            r: false,
            u: false,
            d: false
        },
        b: {
            l: false,
            r: false,
            u: false,
            d: false
        }
    };

    var pos1 = sprite1.posicaoAtual();
    var pos2 = sprite2.posicaoAtual();

    //Margem de erro para igualdade
    //Menor -> mais preciso vel. baixas, mais erros em vel. altas
    var margemErro = (velocidadeTerminal - 0.5) / 2;

    //Se em alcance vertical
    if (pos1.y >= pos2.y && pos1.y <= pos2.y + pos2.h || pos2.y <= pos1.y && pos2.y < pos1.y + pos1.h) {
        if (pos1.x < pos2.x && pos2.x < pos1.x + pos1.w || pos2.x < pos1.x && pos1.x < pos2.x + pos2.w) {
            //dir com esq
            //if(pos1.x + pos1.w <= pos2.x + margemErro &&
            //pos1.x + pos1.w >= pos2.x - margemErro){
            colisao.a.r = colisao.b.l = true;
            //Arredondamento de posicao (margem de erro)
            //if(sprite1.movel)
            //sprite1.pos.x = pos2.x - pos1.w;
            //else
            //sprite2.pos.x = pos1.x + pos1.w;
            //}
            //esq com dir
            //else if(pos2.x + pos2.w <= pos1.x + margemErro &&
            //pos2.x + pos2.w >= pos1.x - margemErro){
            colisao.a.l = colisao.b.r = true;
            //if(sprite1.movel)
            //sprite1.pos.x = pos2.x + pos2.w;
            //else
            //sprite2.pos.x = pos1.x - pos2.w;
        }
    }
    //Se em alcance horizontal
    if (pos1.x < pos2.x && pos2.x < pos1.x + pos1.w || pos2.x < pos1.x && pos1.x < pos2.x + pos2.w) {
        if (pos1.y >= pos2.y && pos2.y <= pos1.y + pos1.h && pos2.y >= pos1.y && pos1.y <= pos2.y + pos2.h) {
            //cim com bxo
            //if(pos1.y + pos1.h <= pos2.y + margemErro &&
            //pos1.y + pos1.h >= pos2.y - margemErro){
            colisao.a.u = colisao.b.d = true;
            //if(sprite1.movel)
            //sprite1.pos.y = pos2.y - pos1.h;
            //else
            //sprite2.pos.y = pos1.y + pos1.h;
            //}
            //bxo com cim
            //else if(pos2.y + pos2.h <= pos1.y + margemErro &&
            //pos2.y + pos2.h >= pos1.y - margemErro){
            colisao.a.d = colisao.b.u = true;
            //if(sprite1.movel)
            //sprite1.pos.y = pos2.y + pos2.h;
            //else
            //sprite2.pos.y = pos1.y - pos2.h;
        }
    }

    sprite1.colisao.r |= colisao.a.r;
    sprite1.colisao.l |= colisao.a.l;
    sprite1.colisao.u |= colisao.a.u;
    sprite1.colisao.d |= colisao.a.u;
    sprite2.colisao.r |= colisao.b.r;
    sprite2.colisao.l |= colisao.b.l;
    sprite2.colisao.u |= colisao.b.u;
    sprite2.colisao.d |= colisao.b.d;
    //sprite2.hp -= sprite1.dano(colisao.a);
    //sprite1.hp -= sprite2.dano(colisao.b);

    return colisao;
}
;

//----------- Carregamento da pagina
window.addEventListener("load", function () {
    draw();
}
);
