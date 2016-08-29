window.onload = function() {
    // Cria o cenÃ¡rio com 1220 x 600 px
    game = new Phaser.Game(1000, 640, Phaser.AUTO, '', {
        preload: carregaAssets,
        create: criaCenario, 
        update: atualizaJogo
    });
};

/**
 *  Carrega imagens, sons etc, para usar no jogo
 */
function carregaAssets() {
    game.load.spritesheet('inimigo', 'assets/inimigo1.png', 110, 145);
    game.load.spritesheet('dude', 'assets/emily.png', 110, 145);

    // Carrega imagem do novo mapa,
    // origem: http://www.ironstarmedia.co.uk/2010/10/free-game-assets-13-prototype-mine-tileset/
    game.load.image('tilesCenario', 'assets/tilesetFase1.png');

    // Carrega mapa em formato JSON
    game.load.tilemap('mapa', 'assets/mapaFase1.json', null, Phaser.Tilemap.TILED_JSON);

    // Carrega moedas
    game.load.spritesheet('coin', 'assets/coin.png', 32, 32);
    // Carrega som para moedas
    game.load.audio('collect-coin', ['assets/collect-coin.ogg']);

}

/**
 *  Cria cenÃ¡rio do jogo
 */
function criaCenario() {
    // Define que vai usar a fÃ­sica ARCADE - fÃ¡cil no jogo
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Adiciona mapa
    map = game.add.tilemap('mapa');

    // Insere tileset
    map.addTilesetImage('tileset', 'tilesCenario');

    // Define quais blocos do tileset serÃ£o de colisÃ£o
    //map.setCollision(1);
    map.setCollisionBetween(1,5);
    map.setCollisionBetween(8,12);

    layer = map.createLayer('cenario');
    //layer.resizeWorld();

    // O grupo inimigos serÃ¡ usado para gerenciar todos os inimigos
    inimigos = game.add.group();
    // Definimos aqui que qualquer inimigo terÃ¡ um corpo,
    // ou seja, nosso personagem pode bater nele
    inimigos.enableBody = true;

    // Cria o jogador
    criaJogador();

    // Chamaf unÃ§Ã£o que cria inimigo
    criaInimigo();

    // Define os cursores do teclado para poder controlar o jogador
    cursors = game.input.keyboard.createCursorKeys();

    criaMoedas();
}

/**
 *  Atualiza jogo. Esta funÃ§Ã£o roda em torno de 60 vezes em 1 segundo, ou seja,
 *  60 FPS (FPS = Frames Por Segundo)
 */
function atualizaJogo() {
    aproximaInimigo();

    game.physics.arcade.collide(jogador, layer);
    game.physics.arcade.collide(inimigos, layer);

    movimentaJogador();
    verificaSeEncostouInimigo();
    verificaSeEncostouMoedas();
}


function verificaSeEncostouInimigo(){
    // Verifica colisÃ£o entre jogador e inimigos
    game.physics.arcade.overlap(jogador, inimigos, encostouInimigo);
}


function movimentaJogador(){
    // PÃ¡ra o movimento do jogador
    jogador.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        jogador.body.velocity.x = -250;

        jogador.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        jogador.body.velocity.x = 250;

        jogador.animations.play('right');
    }
    else
    {
        //  Stand still
        jogador.animations.stop();

        jogador.frame = 4;
    }

    //  Permite jogador pular somente se estÃ¡ tocando algum chÃ£o
    if (cursors.up.isDown)
    {
        if (jogador.body.onFloor())
        {
            jogador.body.velocity.y = -650;
        }
    }


    // Truque para jogador voar ao pressionar tecla T
    if(game.input.keyboard.isDown(Phaser.Keyboard.T) && cursors.up.isDown)
    {
        jogador.body.velocity.y = -150;
    }
}


/**
 * FunÃ§Ã£o que cria o jogador
 */
function criaJogador(){
    // Cria o player e o adiciona no jogo (x,y)
    jogador = game.add.sprite(50, game.world.height - 250, 'dude');

    // Ã‰ necessÃ¡rio adicionar a fÃ­sica no jogador
    game.physics.enable(jogador);

    // Propriedades da fÃ­sica do jogador. DÃ¡ a ele, um salto "normal".
    jogador.body.bounce.y = 0.2;
    jogador.body.gravity.y = 1600;
    jogador.body.linearDamping = 1;

    // NÃ¢o deixa jogador "fugir" do mundo
    jogador.body.collideWorldBounds = true;

    // Define duas animaÃ§Ãµes (esquerda e direita) para caminhar
    // 'nome', posiÃ§Ãµes no quadro, quantas atualizaÃ§Ãµes por segundo
    jogador.animations.add('left', [0, 1, 2, 3], 10, true);
    jogador.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(jogador);
}

/**
 *  FunÃ§Ã£o que faz inimigo se aproximar do jogador
 */
function aproximaInimigo(){
    // Pega o primeiro elemento do grupo inimigos
    var inimigo = inimigos.children[0];

    // Faz com que ele fique parado
    inimigo.body.velocity.x = 0;

    // Se o inimigo estÃ¡ mais para esquerda do jogador
    if (inimigo.position.x < jogador.body.position.x){
        // faz ele ir para direita
        inimigo.body.velocity.x += 100;
    }else{
        // SenÃ£o, faz ele ir para esquerda
        inimigo.body.velocity.x -= 100;
    }
}


/**
 * FunÃ§Ã£o que cria o jogador
 */
function criaInimigo(){
    //  Cria inimigo dentro do grupo inimigos
    var inimigo = inimigos.create(700, 20, 'inimigo');

    //  Define gravidade do inimigo
    inimigo.body.gravity.y = 400;

    // Faz inimigos nÃ£o fugirem do mundo
    inimigo.body.collideWorldBounds = true;
}


/**
 *  FunÃ§Ã£o que mata o jogador e informa que ele morreu
 */
function encostouInimigo (jogador, inimigo) {
    // Remove jogador do jogo
    jogador.kill();

    // Mostra texto informando morte do jogador
    var posicaoJogador = jogador.body.position.x;

    var textoJogo = game.add.text(posicaoJogador - 150, game.camera.height / 2, "VocÃª morreu", {
        font: "48px Arial",
        fill: "#ff0044",
        align: "center"
    });
}


/**
 * Carrega moedas no jogo e define seu comportamento
 */
function criaMoedas(){
    // Adiciona mÃºsica da moeda no jogo, com o nome do asset (collect-coin)
    musicaMoedas = game.add.audio('collect-coin', 1, true);

    // Cria grupo de moedas
    coins = game.add.group();
    // Habilita corpo nos elementos deste grupo
    coins.enableBody = true;

    /**
     * Carrega moedas do grupo camadaMoedas (criado no tiled map editor) que estejam usando 
     * o GID 22 (tileset nÃºmero 22). 
     * Substitui todas as moedas pela imagem 'coin' carregada em carregaAssets 
     * e insere todoas elas no grupo coins recÃ©m criado
     */
    map.createFromObjects('camadaMoedas', 22, 'coin', 0, true, false, coins);

    // Adiciona a funÃ§Ã£o add no objeto animations e cria animaÃ§Ã£o giraMoeda em todos as moedas
    coins.callAll('animations.add', 'animations', 'giraMoeda', [0, 1, 2, 3, 4, 5], 10, true);
    // Chama animaÃ§Ã£o recÃ©m criada (giraMoeda) em todas as moedas
    coins.callAll('animations.play', 'animations', 'giraMoeda');
}


/**
 * Verifica colisÃ£o entre jogador e moedas e chama funÃ§Ã£o encostouEmMoeda 
 * quando isso ocorrer
 */
function verificaSeEncostouMoedas(){
    game.physics.arcade.overlap(jogador, coins, encostouEmMoeda, null, this);
}

/**
 * Quando jogador encosta em moeda, chama esta funÃ§Ã£o
 * que irÃ¡ dar play no som da moeda e remover a moeda do jogo
 */
function encostouEmMoeda(player, moeda) {
    // Executa som da moeda por 1 segundo
    musicaMoedas.play('', 0, 1, false);
    // Exclui a moeda do jogo
    moeda.kill();
}