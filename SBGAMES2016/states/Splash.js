var Splash = function () { };

Splash.prototype = {
    loadScripts: function () {
        game.load.script('style', 'lib/style.js');
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('gamemenu', 'states/GameMenu.js');
        game.load.script('fase1', 'states/Fase1.js');
        game.load.script('fase2', 'states/Fase2.js');
        game.load.script('gameover', 'states/GameOver.js');
        game.load.script('credits', 'states/Credits.js');
        game.load.script('options', 'states/Options.js');
        game.load.script('introFase1', 'states/introFase1.js');
        game.load.script('introFase2', 'states/introFase2.js');
    },

    loadBgm: function () {
        game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
        game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    },

    // varios freebies found from google image search
    loadImages: function () {
        game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
        game.load.image('options-bg', 'assets/images/options-bg.jpg');
        game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
        game.load.image('introFase1-bg', 'assets/images/introFase1-bg.jpg');
        game.load.image('introFase2-bg', 'assets/images/introFase2-bg.jpg');
    },

    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['assets/style/theminion.css']
            }
        }
    },

    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 400, "loading");
        this.logo = game.make.sprite(game.world.centerX, 200, 'brand');
        this.status = game.make.text(game.world.centerX, 380, 'Carregando...', { fill: 'white' });
        utils.centerGameObjects([this.logo, this.status]);
    },

    preload: function () {
        game.add.sprite(0, 0, 'stars');
        game.add.existing(this.logo).scale.setTo(0.5);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);

        this.load.setPreloadSprite(this.loadingBar);
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },

    addGameStates: function () {
        game.state.add("GameMenu", GameMenu);
        game.state.add("Fase1", Fase1);
        game.state.add("Fase2", Fase2);
        game.state.add("GameOver", GameOver);
        game.state.add("Credits", Credits);
        game.state.add("Options", Options);
        game.state.add("IntroFase1", IntroFase1);
        game.state.add("IntroFase2", IntroFase2);
    },

    addGameMusic: function () {
        music = game.add.audio('dangerous');
        music.loop = true;
        music.play();
    },

    create: function () {
        this.status.setText('Pronto!');
        this.addGameStates();
        this.addGameMusic();

        setTimeout(function () {
            game.state.start("GameMenu");
        }, 1000);
    }
};
