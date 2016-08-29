var game = new Phaser.Game(700, 600, Phaser.AUTO, 'Ninjaço', { preload: preload, create: create, update: update });

function preload() {
    //Carrega o json do mapa
    game.load.tilemap('map', 'assets/mapaFase1.json', null, Phaser.Tilemap.TILED_JSON);

    //Carrega o tileset do mapa
    game.load.image('tilesetFase1', 'assets/tilesetFase1.png');

    //Carrega sprites do jogo
    game.load.spritesheet('emily', 'assets/emily.png', 110, 145);
}

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;

var map;
var layer;

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.stage.backgroundColor = '#2d2d2d';

    map = game.add.tilemap('map');
    map.addTilesetImage('tilesetFase1');

    layer = map.createLayer('Camada de Tiles 1');
    layer.resizeWorld();

    map.setCollisionBetween(1, 12);

    game.physics.p2.convertTilemap(map, layer);
    game.physics.p2.restitution = 0.5;
    game.physics.p2.gravity.y = 300;

    player = game.add.sprite(150, 200, 'emily');
    player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);

    game.physics.p2.enable(player);

    player.body.fixedRotation = true;

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    if (cursors.left.isDown){
        player.body.moveLeft(200);

        if (facing != 'left'){
            player.animations.play('left');
            facing = 'left';
        }
    }else if (cursors.right.isDown){
        player.body.moveRight(200);

        if (facing != 'right')        {
            player.animations.play('right');
            facing = 'right';
        }
    }else{
        player.body.velocity.x = 0;

        if (facing != 'idle'){
            player.animations.stop();

            if (facing == 'left'){
                player.frame = 0;
            }
            else{
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump())
    {
        player.body.moveUp(300);
        jumpTimer = game.time.now + 750;
    }
}

function checkIfCanJump() {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === player.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }
    
    return result;

}

function render() {

}