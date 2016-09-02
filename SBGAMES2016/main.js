// Global Variables
var
    game = new Phaser.Game(800, 600, Phaser.AUTO, 'Ninjaço'),
    Main = function () { },

    gameOptions = {
        playSound: true,
        playMusic: true
    },

    musicPlayer,

    estadoJogador = {
        parado: 1,
        andando: 2,
        pulando: 3,
        pularAndando: 4,
        atacando: 5,
        atacarAndando: 6,
        atacarPulando: 7
    },

    stars = null,
    plataformas = null,
    jogador = null,
    inimigos = "",
    cursors = null,
    pontosText = "",
    vidasText = "",
    jumpButton = null,
    atackButton = null,
    qtdInicialInimigos = 2,
    pontos = 0,
    vidas = 10,
    jumpTimer = 0,
    atackTimer = 0,
    map = null,
    layer = null;

Main.prototype = {
    preload: function () {
        game.load.tilemap('map', 'assets/mapaFase1.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('stars', 'assets/images/stars.jpg');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('brand', 'assets/images/logo.png');
        game.load.image('fundo', 'assets/tileFase1.png');
        game.load.image('ground', 'assets/ground.png');

        game.load.script('polyfill', 'lib/polyfill.js');
        game.load.script('utils', 'lib/utils.js');
        game.load.script('splash', 'states/Splash.js');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.P2JS);

        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        atackButton = game.input.keyboard.addKey(Phaser.Keyboard.C);

        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
};

game.state.add('Main', Main);
game.state.start('Main');