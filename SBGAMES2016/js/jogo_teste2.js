var game = new Phaser.Game(700, 400, Phaser.AUTO, '', {
        preload: carregaAssets,
        create: criaCenario, 
        update: atualizaJogo
    });
	
	 var mountainsBack, mountainsMid1, mountainsMid2;

/**
 *  Carrega imagens, sons etc, para usar no jogo
 */
function carregaAssets() {
    this.game.load.image('mountains-back', 'assets/mountains-back.png');
    this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
    this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');
}

/**
 *  Cria cenÃ¡rio do jogo
 */
function criaCenario() {
 
    //Enable Arcade Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
    //Set the games background colour
    this.game.stage.backgroundColor = '#697e96';
 
    this.mountainsBack = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('mountains-back').height, 
        this.game.width, 
        this.game.cache.getImage('mountains-back').height, 
        'mountains-back'
    );
 
    this.mountainsMid1 = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('mountains-mid1').height, 
        this.game.width, 
        this.game.cache.getImage('mountains-mid1').height, 
        'mountains-mid1'
    );
 
    this.mountainsMid2 = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('mountains-mid2').height, 
        this.game.width, 
        this.game.cache.getImage('mountains-mid2').height, 
        'mountains-mid2'
    );      
}

/**
 *  Atualiza jogo. Esta funÃ§Ã£o roda em torno de 60 vezes em 1 segundo, ou seja,
 *  60 FPS (FPS = Frames Por Segundo)
 */
function atualizaJogo() {
    this.mountainsBack.tilePosition.x -= 0.05;
    this.mountainsMid1.tilePosition.x -= 0.3;
    this.mountainsMid2.tilePosition.x -= 0.75;      
}