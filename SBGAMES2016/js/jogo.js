var game = new Phaser.Game(700, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var plataformas;
var jogador;
var inimigos = [];
var cursors;
var pontosText;
var vidasText;
var jumpButton;
var qtdInicialInimigos = 5
var pontos = 0;
var vidas = 0;
var jumpTimer = 0;

function preload() {
	game.load.image('back', 'assets/back.png');
    game.load.image('ground', 'assets/ground.png');

    game.load.spritesheet('emily', 'assets/emily.png', 110, 145);
    game.load.spritesheet('inimigo1', 'assets/inimigo1.png', 110, 145);
}

function create() {

    //  A simple background for our game
    game.add.sprite(0, 0, 'back');
    
    //  The platforms group contains the ground and the 2 ledges we can jump on
    plataformas = game.add.group();
    plataformas.enableBody = true;

    // Here we create the ground.
    var ground = plataformas.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(3, 1);
    ground.body.immovable = true;

    criaInimigos();
    criajogador();

    game.physics.arcade.enable(jogador);
    game.physics.arcade.enable(inimigos);

    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 10; i++)
    {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 200 + Math.random() * 80;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

	pontosText = game.add.text(16, 16, 'Pontos: 0', { fontSize: '32px', fill: '#fff' });
    vidasText = game.add.text(584, 16, 'Vidas: 0', { fontSize: '32px', fill: '#fff' });
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    game.physics.arcade.collide(jogador, plataformas);
	game.physics.arcade.collide(stars, plataformas);

    inimigos.forEach(function(inimigo) {
        game.physics.arcade.collide(inimigo, plataformas);
        game.physics.arcade.overlap(inimigo, jogador, ganhaVida, null, this);
	});

	game.physics.arcade.overlap(jogador, stars, collectStar, null, this);

	cursors = game.input.keyboard.createCursorKeys();

    jogador.body.velocity.x = 0;

    if (cursors.left.isDown){
        jogador.body.velocity.x = -150;
        jogador.animations.play('andar');
        if (jogador.scale.x > 0){
            jogador.scale.x *= -1;
        }        
    } else if (cursors.right.isDown){
        jogador.body.velocity.x = 150;
        jogador.animations.play('andar');
        if (jogador.scale.x < 0){
            jogador.scale.x *= -1;
        }
    } else{
        jogador.animations.stop();
        jogador.frame = 13;
    }


    inimigos.forEach(function(inimigo) {
        if (Math.random() * 20 > 18)
        inimigo.animations.play('atirar');
    });

    if (jumpButton.isDown && jogador.body.touching.down && game.time.now > jumpTimer){
        jogador.body.velocity.y = -750;
        jogador.animations.play('pulo');
    }
}

function collectStar (jogador, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    pontos += 10;
    pontosText.text = 'Pontos: ' + pontos;
}

function criaInimigos(){
    // O grupo inimigos será usado para gerenciar todos os inimigos
    inimigos = game.add.group();
    inimigos.enableBody = true;
 
    /**
     *  Faz cada inimigo adicionado ir em direção ao jogador
     */
    for (var i = 0; i < qtdInicialInimigos; i++){
        var inimigo = inimigos.create((i + 8) * 50, 0, 'inimigo1');
        
        game.physics.enable(inimigo);
     
        inimigo.body.bounce.y = 0.2;
        inimigo.body.gravity.y = 1600;
        inimigo.body.linearDamping = 1;
     
        inimigo.body.collideWorldBounds = true;
        inimigo.animations.add('atirar', [0, 1, 2, 3, 4, 5, 6], 10, false);
    }
}

/**
 * Função que cria o jogador
 */
function criajogador(){
    // The jogador and its settings
    jogador = game.add.sprite(32, game.world.height - 135, 'emily');
 
    // É necessário adicionar a física no jogador
    game.physics.enable(jogador);
 
    // Propriedades da física do jogador. Dá a ele, um salto "normal".
    jogador.body.bounce.y = 0.2;
    jogador.body.gravity.y = 1600;
    jogador.body.linearDamping = 1;
 
    // Nâo deixa jogador "fugir" do mundo
    jogador.body.collideWorldBounds = true;

    // Define duas animações (esquerda e direita) para caminhar
    // 'nome', posições no quadro, quantas atualizações por segundo
    jogador.animations.add('andar', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    jogador.animations.add('pulo', [13, 14, 15, 16 ,17], 10, false);
    jogador.anchor.setTo(.5,.5);
 
    game.camera.follow(jogador);
}

function inimigoColidiuTile(inimigo, cenario){
    // Se o inimigo encostou em algo na esquerda, manda-o para direita
    if (inimigo.body.blocked.left){
        inimigo.body.velocity.x += 100;
    }
 
    // Se o inimigo encostou em algo na direita, manda-o para esquerda
    if (inimigo.body.blocked.right){
        inimigo.body.velocity.x -= 100;
    }
}

function atualizaVidas (ganha) {
    //  Add and update the score
    if(ganha){
        vidas += 1;
    } else if (vidas > 0){
        vidas -= 1;
    }else {
        //CHAMAR ANIMAÇÃO DE PERDEU!!!
        alert("Você perdeu!!");
        vidas = 0;
    }
    vidasText.text = 'Vidas: ' + vidas;
}

function perdeVida(){
    atualizaVidas(false);
}

function ganhaVida(){
    atualizaVidas(true);
}

function aproximaInimigo(){
    // Pega o primeiro elemento do grupo inimigos
    var inimigo = inimigos[0];
 
    // Faz com que ele fique parado
    inimigo.body.velocity.x = 0;
 
    // Se o inimigo está mais para esquerda do jogador
    if (inimigo.position.x < jogador.body.position.x){
        // faz ele ir para direita
        inimigo.body.velocity.x += 50;
    }else{
        // Senão, faz ele ir para esquerda
        inimigo.body.velocity.x -= 50;
    }
}