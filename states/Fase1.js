var Fase1 = function (game) { };

Fase1.prototype = {
    preload: function () {
        game.load.tilemap('map', 'assets/mapaFase1.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('fundo', 'assets/tileFase1.png');
        game.load.image('tileset', 'assets/tileset.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('objeto', 'assets/objeto.png');
        game.load.image('cerebro', 'assets/cerebro.png');

        game.load.spritesheet('emily', 'assets/emily.png', 110, 150, 35);
        game.load.spritesheet('inimigo', 'assets/inimigo.png', 110, 150, 7);
    },

    init: function () {
        estadoJogador = {
            parado: 1,
            andando: 2,
            pulando: 3,
            pularAndando: 4,
            atacando: 5,
            atacarAndando: 6,
            atacarPulando: 7,
            ganhou: 8
        };

        stars = null;
        plataformas = null;
        jogador = null;
        inimigos = "";
        cursors = null;
        pontosText = "";
        vidasText = "";
        jumpButton = null;
        atackButton = null;
        qtdInicialInimigos = 4;
        pontos = 0;
        vidas = 10;
        jumpTimer = 0;
        habilitaMorte = 0;
        atackTimer = 0;
        map = null;
        layer = null;

        game.physics.startSystem(Phaser.Physics.P2JS);

        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        atackButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
    },

    addMenuOption: function (text, callback) {
        var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
        var txt = game.add.text(game.world.centerX, (optionCount * 80) + 200, text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;

        var onOver = function (target) {
            target.fill = "#FEFFD5";
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

        optionCount++;
    },

    create: function () {
        this.map = this.game.add.tilemap('map');

        this.map.addTilesetImage('tileFase1', 'fundo');
        this.map.addTilesetImage('tileset', 'tileset');

        this.layerFundo = this.map.createLayer('fundoFase');
        this.layerFundo.resizeWorld();

        this.game.physics.p2.convertTilemap(this.map, this.layerFundo);
        this.game.physics.p2.restitution = 0.5;
        this.game.physics.p2.gravity.y = 300;

        ////  The platforms group contains the ground and the 2 ledges we can jump on
        this.plataformas = this.game.add.group();
        this.plataformas.enableBody = true;

        //// Here we create the ground.
        var ground = this.plataformas.create(0, this.game.world.height - 30, 'ground');
        ground.scale.setTo(15, 0.8);
        ground.body.immovable = true;

        this.criaItens();
        this.criaInimigos();
        this.criaJogador();

        this.game.physics.arcade.enable(this.emily);
        this.game.physics.arcade.enable(this.inimigos);

        this.stars = game.add.group();
        this.stars.enableBody = true;

        for (var i = 0; i < 2; i++) {
            var star = this.stars.create(Math.random() * 500 + 500, 0, 'star');
            star.body.gravity.y = 200 + Math.random() * 80;
            star.body.bounce.y = 0.1;
        }

        this.cerebros = game.add.group();
        this.cerebros.enableBody = true;

        var cerebro = this.cerebros.create(2090, (this.game.world.height - 180), 'cerebro');
        star.body.gravity.y = 200 + Math.random() * 80;
        star.body.bounce.y = 0.1;

        pontosText = game.add.text(50, 48, 'Pontos: ' + pontos, { fontSize: '32px', fill: '#fff' });
        pontosText.fixedToCamera = true;
        vidasText = game.add.text(700, 48, 'Vidas: ' + vidas, { fontSize: '32px', fill: '#fff' });
        vidasText.fixedToCamera = true;

        console.log("Tudo certo");
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    //create a sprite from an object
    createFromTiledObject: function (element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    },

    ganhou: function (emily, cerebro) {
        this.emily.emAcao = 25;
        this.emily.estadoAtual = estadoJogador.ganhou;
    },

    criaItens: function () {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;

        var result = this.findObjectsByType('objeto', this.map, 'coisas');

        result.forEach(function (element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },

    morrer: function () {
        // Remove jogador do jogo
        jogador.kill();

        // Mostra texto informando morte do jogador
        var textoJogo = game.add.text(game.camera.width / 2 - 150, game.camera.height / 2, "Você morreu", {
            font: "48px Arial",
            fill: "#ff0044",
            align: "center"
        });
    },

    update: function () {
        this.game.physics.arcade.collide(this.inimigos, this.plataformas);
        this.game.physics.arcade.collide(this.emily, this.plataformas);
        this.game.physics.arcade.collide(this.stars, this.plataformas);

        this.game.physics.arcade.overlap(this.emily, this.stars, this.collectStar, null, this);
        this.game.physics.arcade.overlap(this.emily, this.inimigos, this.mataOuMorre, null, this);
        this.game.physics.arcade.overlap(this.emily, this.cerebros, this.colideItens, null, this);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.emily.body.velocity.x = 0;

        switch (this.emily.estadoAtual) {
            case estadoJogador.andando:
                if (this.emily.emAcao >= 0) {
                    if (this.cursors.left.isDown) {
                        this.emily.body.velocity.x = -150;
                        this.emily.animations.play('andar');

                        if (this.emily.scale.x > 0) {
                            this.emily.scale.x *= -1;
                        }
                    } else if (this.cursors.right.isDown) {
                        this.emily.body.velocity.x = 150;
                        this.emily.animations.play('andar');
                        if (this.emily.scale.x < 0) {
                            this.emily.scale.x *= -1;
                        }
                    }
                    this.emily.emAcao--;
                } else {
                    this.emily.estadoAtual = estadoJogador.parado;
                    this.emily.emAcao = 0;
                }
                break;
            case estadoJogador.pulando:
                if (this.emily.emAcao >= 0) {
                    if (this.cursors.left.isDown) {
                        this.emily.body.velocity.x = -100;

                        if (this.emily.scale.x > 0) {
                            this.emily.scale.x *= -1;
                        }
                    } else if (this.cursors.right.isDown) {
                        this.emily.body.velocity.x = 100;

                        if (this.emily.scale.x < 0) {
                            this.emily.scale.x *= -1;
                        }
                    }

                    this.emily.body.velocity.y = this.emily.emAcao < 25 ? -400 : +400;
                    this.emily.emAcao--;
                } else {
                    this.emily.estadoAtual = estadoJogador.parado;
                    this.emily.emAcao = 0;
                }
                break;
            case estadoJogador.atacando:
                if (this.emily.emAcao >= 0) {
                    if (this.cursors.left.isDown) {
                        this.emily.body.velocity.x = -100;

                        if (this.emily.scale.x > 0) {
                            this.emily.scale.x *= -1;
                        }
                    } else if (this.cursors.right.isDown) {
                        this.emily.body.velocity.x = 100;

                        if (this.emily.scale.x < 0) {
                            this.emily.scale.x *= -1;
                        }
                    }

                    if (jumpButton.isDown) {
                        this.emily.body.velocity.y = this.emily.emAcao < 25 ? -400 : +400;
                    }

                    this.emily.emAcao--;
                } else {
                    this.emily.estadoAtual = estadoJogador.parado;
                    this.emily.emAcao = 0;
                }
                this.emily.animations.play('atacar');
                break;
            case estadoJogador.ganhou:
                if (this.emily.emAcao >= 0) {
                    this.emily.emAcao--;
                } else {
                    this.emily.frame = 34;
                    //this.game.paused = true;
                    this.emily.emAcao = 0;
                    this.emily.animations.stop();
                    setTimeout(function () {
                        this.game.state.start('IntroFase2');
                    }, 50);
                }

                this.emily.animations.play('vitoria');
                break;
            default:
                this.emily.animations.stop();
                this.emily.frame = 3;
                this.emily.emAcao = 0;
                break;
        }

        if ((this.cursors.left.isDown || this.cursors.right.isDown) && this.emily.estadoAtual == estadoJogador.parado) {
            this.emily.emAcao = 1;
            this.emily.estadoAtual = estadoJogador.andando;
        } else if (jumpButton.isDown && this.emily.estadoAtual != estadoJogador.atacando && this.emily.body.touching.down) {
            this.emily.emAcao = 50;
            this.emily.estadoAtual = estadoJogador.pulando;
        } else if (atackButton.isDown && this.emily.estadoAtual != estadoJogador.pulando) {
            this.emily.emAcao = 28;
            this.emily.estadoAtual = estadoJogador.atacando;
        }

        this.inimigos.forEach(function (migo) {
            if (Math.random() * 20 > 18)
                migo.animations.play('atirar');
        });
    },

    collectStar: function (jogador, star) {
        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        pontos += 10;
        pontosText.text = 'Pontos: ' + pontos;
    },

    criaInimigos: function () {
        this.inimigos = this.game.add.group();
        this.inimigos.enableBody = true;

        for (var i = 0; i < qtdInicialInimigos; i++) {
            this.inimigos[i] = this.inimigos.create(300 + (i * 500), (this.game.world.height - 180), 'inimigo');

            this.game.physics.enable(this.inimigos[i]);

            this.inimigos[i].body.bounce.y = 0.2;
            this.inimigos[i].body.gravity.y = 5000;
            this.inimigos[i].body.linearDamping = 1;
            this.inimigos[i].body.collideWorldBounds = true;

            this.inimigos[i].animations.add('atirar', [0, 1, 2, 3, 4, 5, 6], 10, false);
        }
    },

    criaJogador: function () {

        this.emily = this.game.add.group();
        this.emily.enableBody = true;

        result = this.findObjectsByType('emily', this.map, 'coisas');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.emily);
        }, this);

        this.emily = this.game.add.sprite(this.emily.x, this.emily.y, 'emily');
        this.emily.estadoAtual = 1; //Inicia o jogador no estado parado
        this.emily.emAcao = 0;

        this.game.physics.enable(this.emily);

        //// Propriedades da física do jogador. Dá a ele, um salto "normal".
        this.emily.body.bounce.y = 0.2;
        this.emily.body.gravity.y = 5000;
        this.emily.body.linearDamping = 1;
        this.emily.body.collideWorldBounds = true;

        //// Define duas animações (esquerda e direita) para caminhar
        //// 'nome', posições no quadro, quantas atualizações por segundo
        this.emily.animations.add('andar', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
        this.emily.animations.add('pulo', [13, 14, 15, 16, 17, 17, 16, 15, 14, 13], 5, false);
        this.emily.animations.add('atacar', [18, 19, 20, 21, 22, 23, 24, 25, 26], 18, true);
        this.emily.animations.add('morte', [18, 19, 20, 21, 22, 23, 24, 25, 26], 18, true);
        this.emily.animations.add('vitoria', [27, 28, 29, 30, 31, 32, 33, 34], 18, false);

        this.emily.anchor.setTo(.5, .5);
        this.emily.body.fixedRotation = true;

        this.game.camera.follow(this.emily);
    },

    inimigoColidiuTile: function (inimigo, cenario) {
        // Se o inimigo encostou em algo na esquerda, manda-o para direita
        if (inimigo.body.blocked.left) {
            inimigo.body.velocity.x += 100;
        }

        // Se o inimigo encostou em algo na direita, manda-o para esquerda
        if (inimigo.body.blocked.right) {
            inimigo.body.velocity.x -= 100;
        }
    },

    mataOuMorre: function (jog, migo) {
        if (jog.estadoAtual == estadoJogador.atacando) {
            migo.destroy();
        } else {
            this.atualizaVidas(false);
        }
    },

    atualizaVidas: function (ganha) {
        //  Add and update the score
        if (habilitaMorte <= 0) {
            if (ganha) {
                vidas += 1;
            } else if (vidas > 0) {
                vidas -= 1;
                habilitaMorte = 10;
            } else {
                vidas = 0;
                this.game.state.start("GameOver");
            }
            vidasText.text = 'Vidas: ' + vidas;
        }
        habilitaMorte--;
    },

    perdeVida: function () {
        atualizaVidas(false);
    },

    ganhaVida: function () {
        atualizaVidas(true);
    },

    colideItens: function (emily, cerebros) {
        cerebros.kill();
        this.ganhou();
    },

    aproximaInimigo: function () {
        // Pega o primeiro elemento do grupo inimigos
        var inimigo = inimigos[0];

        // Faz com que ele fique parado
        inimigo.body.velocity.x = 0;

        // Se o inimigo está mais para esquerda do jogador
        if (inimigo.position.x < jogador.body.position.x) {
            // faz ele ir para direita
            inimigo.body.velocity.x += 50;
        } else {
            // Senão, faz ele ir para esquerda
            inimigo.body.velocity.x -= 50;
        }
    }
}