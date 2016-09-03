var Credits = function (game) { };

Credits.prototype = {

    preload: function () {
        this.optionCount = 1;
        this.creditCount = 0;
    },

    addCredit: function (task, author) {
        var authorStyle = { font: '40pt TheMinion', fill: 'black', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
        var taskStyle = { font: '30pt TheMinion', fill: 'black', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
        var authorText = game.add.text(game.world.centerX, 900, author, authorStyle);
        var taskText = game.add.text(game.world.centerX, 950, task, taskStyle);

        authorText.anchor.setTo(0.5);
        authorText.stroke = "rgba(0,0,0,0)";
        authorText.strokeThickness = 4;

        taskText.anchor.setTo(0.5);
        taskText.stroke = "rgba(0,0,0,0)";
        taskText.strokeThickness = 4;

        game.add.tween(authorText).to({ y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5000);
        game.add.tween(taskText).to({ y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5000);

        this.creditCount++;
    },

    addMenuOption: function (text, callback) {
        var optionStyle = { font: '30pt TheMinion', fill: 'black', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
        var txt = game.add.text(10, (this.optionCount * 80) + 450, text, optionStyle);

        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;

        var onOver = function (target) {
            target.fill = "black";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };

        var onOut = function (target) {
            target.fill = "black";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };

        //txt.useHandCursor = true;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount++;
    },

    create: function () {
        this.stage.disableVisibilityChange = true;

        //if (gameOptions.playMusic) {
        //musicPlayer.stop();
        //  musicPlayer = game.add.audio('exit');
        //  musicPlayer.play();
        //}

        var bg = game.add.sprite(0, 0, 'gameover-bg');
        this.addCredit('Music', 'Kevin Macleod');
        this.addCredit('Developer', 'Matt McFarland');
        this.addCredit('Lorem Ipsum', 'Mipsem Dempsum');
        this.addCredit('Caveats', 'Keyboard Cat');
        this.addCredit('Phaser.io', 'Powered By');
        this.addCredit('for playing', 'Thank you');
		this.addCredit('Este jogo foi desenvolvido por Daniel Gomes,\n Diego Haji, Jo\u00e3o Marcos e Roberto\n Junior, todos alunos graduandos em Engenharia de Computa\u00e7\u00e3o do CEFET-MG\n campus Tim\u00f3teo. Tal trabalho \u00e9 pr\u00e9-requisito para aprova\u00e7\u00e3o na disciplina de\n Programa\u00e7\u00e3o com Jogos, que possui como professor o Andr\u00e9 Rodrigues da Cruz.\n Utilizou-se para a constru\u00e7\u00e3o do jogo, a linguagem JavaScript em conjunto com a API Canvas do HTML5.\n Utilizou-se folha de estilo CSS como parte do layout do jogo.','Sobre o Jogo');
        this.addMenuOption('<= Back', function (e) {
            game.state.start("GameMenu");
        });

        game.add.tween(bg).to({ alpha: 0 }, 20000, Phaser.Easing.Cubic.Out, true, 30000);
    }

};
