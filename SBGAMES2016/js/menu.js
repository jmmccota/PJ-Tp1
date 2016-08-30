var game = new Phaser.Game(900, 550, Phaser.AUTO, 'Menu', { preload: preload, create: create,render:render });

var w = game.width, h = game.height;

function preload() {
    
};

function render(){
	game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");   
};

function create() {
    
	
	start_label = game.add.text((w/2-30), (2*h/8), 'Iniciar', { font: '24px Arial', fill: '#fff' });
    start_label.inputEnabled = true;
	
	continuar_label = game.add.text((w/2-40), (3*h/8), 'Continuar', { font: '24px Arial', fill: '#fff' });
    continuar_label.inputEnabled = true;
	
	opcoes_label = game.add.text((w/2-35), (4*h/8), 'Opções', { font: '24px Arial', fill: '#fff' });
    opcoes_label.inputEnabled = true;
	
	creditos_label = game.add.text((w/2-40), (5*h/8), 'Creditos', { font: '24px Arial', fill: '#fff' });
    creditos_label.inputEnabled = true;
	
	
	creditos_label.events.onInputUp.add(function () {
        
		var graphics = game.add.graphics(50,0);
		
		graphics.beginFill(0xFF3300);
		graphics.lineStyle(10, 0xffd900, 1);
		var sw = w/15;
		var sh = h/11;
		// draw a shape
		graphics.moveTo(sw,sh);
		graphics.lineTo(w-sw, sh);
		graphics.lineTo(w-sw, h-2*sh);
		graphics.lineTo(sw, h-2*sh);
		graphics.endFill();
		
		
        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = game.add.text(w/2, h/2, 'Este jogo foi desenvolvido por Daniel Gomes,\n Diego Haji, Jo\u00e3o Marcos e Roberto\n Junior, todos alunos graduandos em Engenharia de Computa\u00e7\u00e3o do CEFET-MG\n campus Tim\u00f3teo. Tal trabalho \u00e9 pr\u00e9-requisito para aprova\u00e7\u00e3o na disciplina de\n Programa\u00e7\u00e3o com Jogos, que possui como professor o Andr\u00e9 Rodrigues da Cruz.\n Utilizou-se para a constru\u00e7\u00e3o do jogo, a linguagem JavaScript em conjunto com a API Canvas do HTML5.\n Utilizou-se folha de estilo CSS como parte do layout do jogo.', { font: '20px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });
	
	
	
    
    /*
        Code for the pause menu
    */

    // Create a label to use as a button
    pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    // And finally the method that handels the pause menu
    function unpause(event){
        // Only act if paused
        if(game.paused){
            // Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                y1 = h/2 - 180/2, y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                // Display the choice
                choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    };
}