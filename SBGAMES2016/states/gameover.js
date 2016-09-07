var GameOver = function (game) { };

GameOver.prototype = {

    preload: function () {
        this.optionCount = 1;
    },

    addMenuOption: function (text, callback) {
        var optionStyle = { font: '30pt TheMinion', fill: 'black', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
        var txt = this.game.add.text(this.game.world.centerX / 2, (this.optionCount * 80) + 300, text, optionStyle);
        txt.anchor.setTo(0.9);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;

        var onOver = function (target) {
            target.fill = "#000";
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
        this.game.add.sprite(0, 0, 'gameover-bg');
        var titleStyle = { font: 'bold 60pt TheMinion', fill: '#black', align: 'center' };
        var text = this.game.add.text(this.game.world.centerX / 2, 200, "Game Over", titleStyle);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.anchor.set(0.7);
        this.addMenuOption('Play Again', function (e) {
            this.game.state.start("IntroFase1");
        });
        this.addMenuOption('Main Menu', function (e) {
            this.game.state.start("GameMenu");
        })
    }
};