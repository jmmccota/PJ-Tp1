var IntroFase2 = function (game) { };

IntroFase2.prototype = {

    preload: function () {
        this.optionCount = 1;
        this.creditCount = 0;
    },

    addCredit: function (task, author) {
        var authorStyle = { font: '40pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
        var taskStyle = { font: '20pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
        var authorText = game.add.text(450, 600, author, authorStyle);
        var taskText = game.add.text(450, 750, task, taskStyle);

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
        var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
        var txt = game.add.text(650, (this.optionCount * 80) + 420, text, optionStyle);

        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;

        var onOver = function (target) {
            target.fill = "white";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };

        var onOut = function (target) {
            target.fill = "white";
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
        console.log("introfase2");
        this.stage.disableVisibilityChange = true;

        var bg = game.add.sprite(0, 0, 'introFase2-bg');
        this.addCredit('Parab\u00c9ns! Continue sua jornada. \n' +
            'Prepare-se, seu \u00faltimo desafio ir\u00c1 se iniciar. \n' +
            'Mantenha o foco!', 'Jogador');

        this.addMenuOption('Pular =>', function (e) {
            game.state.start("Fase2");
        });

        setTimeout(function () {
            game.state.start("Fase2");
        }, 4500);
    }

};
