var Game = function (game) { };

Game.prototype = {
    preload: function () {
        game.load.tilemap('map', 'assets/mapaFase1.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image('fundo', 'assets/tileFase1.png');
        game.load.image('ground', 'assets/ground.png');

        game.load.spritesheet('emily', 'assets/emily.png', 110, 150, 27);
        game.load.spritesheet('inimigo1', 'assets/inimigo1.png', 110, 150, 7);
    },

    init: function () {
        estadoJogador = {
            parado: 1,
            andando: 2,
            pulando: 3,
            pularAndando: 4,
            atacando: 5,
            atacarAndando: 6,
            atacarPulando: 7
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
        qtdInicialInimigos = 2;
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
        game.stage.backgroundColor = '#2d2d2d';

        map = game.add.tilemap('map');
        map.addTilesetImage('fundo');
        map.setCollisionBetween(1, 12);

        layer = map.createLayer('fundoFase');
        layer.resizeWorld();

        game.physics.p2.convertTilemap(map, layer);
        game.physics.p2.restitution = 0.5;
        game.physics.p2.gravity.y = 300;

        //  The platforms group contains the ground and the 2 ledges we can jump on
        plataformas = game.add.group();
        plataformas.enableBody = true;

        // Here we create the ground.
        var ground = plataformas.create(0, game.world.height - 30, 'ground');
        ground.scale.setTo(15, 0.8);
        ground.body.immovable = true;

        this.criaInimigos();
        //console.log("criaJogador");
        this.criaJogador();
        //console.log("Done");

        game.physics.arcade.enable(jogador);
        game.physics.arcade.enable(inimigos);

        stars = game.add.group();
        stars.enableBody = true;

        for (var i = 0; i < 2; i++) {
            var star = stars.create(Math.random() * 500 + 500, 0, 'star');
            star.body.gravity.y = 200 + Math.random() * 80;
            star.body.bounce.y = 0.1;
        }

        pontosText = game.add.text(16, 48, 'Pontos: ' + pontos, { fontSize: '32px', fill: '#fff' });
        vidasText = game.add.text(584, 48, 'Vidas: ' + vidas, { fontSize: '32px', fill: '#fff' });
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
        game.physics.arcade.collide(jogador, plataformas);
        game.physics.arcade.collide(stars, plataformas);
        game.physics.arcade.collide(inimigos, plataformas);

        game.physics.arcade.overlap(jogador, stars, this.collectStar, null, this);
        game.physics.arcade.overlap(jogador, inimigos, this.mataOuMorre, null, this);

        cursors = game.input.keyboard.createCursorKeys();

        jogador.body.velocity.x = 0;

        switch (jogador.estadoAtual) {
            case estadoJogador.andando:
                if (jogador.emAcao >= 0) {
                    if (cursors.left.isDown) {
                        jogador.body.velocity.x = -150;
                        jogador.animations.play('andar');

                        if (jogador.scale.x > 0) {
                            jogador.scale.x *= -1;
                        }
                    } else if (cursors.right.isDown) {
                        jogador.body.velocity.x = 150;
                        jogador.animations.play('andar');
                        if (jogador.scale.x < 0) {
                            jogador.scale.x *= -1;
                        }
                    }
                    jogador.emAcao--;
                } else {
                    jogador.estadoAtual = estadoJogador.parado;
                    jogador.emAcao = 0;
                }
                break;
            case estadoJogador.pulando:
                if (jogador.emAcao >= 0) {
                    if (cursors.left.isDown) {
                        jogador.body.velocity.x = -100;

                        if (jogador.scale.x > 0) {
                            jogador.scale.x *= -1;
                        }
                    } else if (cursors.right.isDown) {
                        jogador.body.velocity.x = 100;

                        if (jogador.scale.x < 0) {
                            jogador.scale.x *= -1;
                        }
                    }

                    jogador.body.velocity.y = jogador.emAcao < 25 ? -200 : +200;
                    jogador.emAcao--;
                } else {
                    jogador.estadoAtual = estadoJogador.parado;
                    jogador.emAcao = 0;
                }
                jogador.animations.play('pulo');
                break;
            case estadoJogador.atacando:
                if (jogador.emAcao >= 0) {
                    if (cursors.left.isDown) {
                        jogador.body.velocity.x = -100;

                        if (jogador.scale.x > 0) {
                            jogador.scale.x *= -1;
                        }
                    } else if (cursors.right.isDown) {
                        jogador.body.velocity.x = 100;

                        if (jogador.scale.x < 0) {
                            jogador.scale.x *= -1;
                        }
                    }

                    jogador.emAcao--;
                } else {
                    jogador.estadoAtual = estadoJogador.parado;
                    jogador.emAcao = 0;
                }
                jogador.animations.play('atacar');
                break;
            default:
                jogador.animations.stop();
                jogador.frame = 3;
                jogador.emAcao = 0;
                break;
        }

        if ((cursors.left.isDown || cursors.right.isDown) && jogador.estadoAtual == estadoJogador.parado) {
            jogador.emAcao = 1;
            jogador.estadoAtual = estadoJogador.andando;
        } else if (jumpButton.isDown && jogador.estadoAtual != estadoJogador.atacando && jogador.body.touching.down) {
            jogador.emAcao = 50;
            jogador.estadoAtual = estadoJogador.pulando;
        } else if (atackButton.isDown && jogador.estadoAtual != estadoJogador.pulando) {
            jogador.emAcao = 28;
            jogador.estadoAtual = estadoJogador.atacando;
        }

        inimigos.forEach(function (inimigo) {
            if (Math.random() * 20 > 18)
                inimigo.animations.play('atirar');
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
        // O grupo inimigos será usado para gerenciar todos os inimigos
        inimigos = game.add.group();
        inimigos.enableBody = true;

        /**
         *  Faz cada inimigo adicionado ir em direção ao jogador
         */
        for (var i = 0; i < qtdInicialInimigos; i++) {
            var inimigo = inimigos.create(300, (game.world.height - 180), 'inimigo1'); //((i + 8) * Math.random() * 100) + 400, (game.world.height - 180), 'inimigo1');

            game.physics.enable(inimigo);

            inimigo.body.bounce.y = 0.2;
            inimigo.body.gravity.y = 1600;
            inimigo.body.linearDamping = 1;

            inimigo.body.collideWorldBounds = true;
            inimigo.animations.add('atirar', [0, 1, 2, 3, 4, 5, 6], 10, false);
        }
    },

    /**
     * Função que cria o jogador
     */
    criaJogador: function () {

        jogador = game.add.sprite(32, game.world.height - 105, 'emily');
        jogador.estadoAtual = 1; //Inicia o jogador no estado parado
        jogador.emAcao = 0;

        game.physics.enable(jogador);

        // Propriedades da física do jogador. Dá a ele, um salto "normal".
        jogador.body.bounce.y = 0.2;
        jogador.body.gravity.y = 5000;
        jogador.body.linearDamping = 1;
        jogador.body.collideWorldBounds = true;

        // Define duas animações (esquerda e direita) para caminhar
        // 'nome', posições no quadro, quantas atualizações por segundo
        jogador.animations.add('andar', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
        jogador.animations.add('pulo', [13, 14, 15, 16, 17, 17, 16, 15, 14, 13], 5, false);
        jogador.animations.add('atacar', [18, 19, 20, 21, 22, 23, 24, 25, 26], 18, true);
        console.log("jogador.animations.add('atacar");
        jogador.animations.add('morte', [18, 19, 20, 21, 22, 23, 24, 25, 26], 18, true);
        console.log("Done");

        jogador.anchor.setTo(.5, .5);
        jogador.body.fixedRotation = true;

        game.camera.follow(jogador);
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

    mataOuMorre: function (jogador, inimigos) {
        if (jogador.estadoAtual == estadoJogador.atacando) {
            inimigos.kill();
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
                habilitaMorte = 1000;
            } else {
                vidas = 0;
                game.state.start("Credits");
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