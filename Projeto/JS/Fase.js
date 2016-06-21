var Fase = function = function(){}
{
		var passouFase = false;

		//Personagem jogavel
        var principal;
        //Lista de inimigos que apareceram na tela
        var inimigosAtivos[];

        //Lista de projeteis que apareceram na tela
        var projeteisInimigos[];
        var projeteisAmigos[];

        //Lista de explosoes na tela
        var explosoesAtivas[];

		//Caixas de recompensa
		var caixas[];

	
		//Inicializa o personagem principal e a fila de inimigos
		var definePersonagens = function(){};

		//Desenha o fundo da fase na tela
        var desenhaBackground = function(){};

        //Desenha as explosoes e as atualiza
        var desenhaExplosoes = function(){};
		
		//Desenha a varerface (hp, municao, tempo, score, ...)
		var desenhaHUD = function(){};

		//Desenha todos os elementos da fase na tela
		var desenha = function(){};

		//Define se a fase foi encerrada
		//	Caso tenha sido desvia o fluxo para a funcao que define as fases
		var terminou = function(){};

		//Define quais alteracoes devem ser feitas do frame anterior
		//para o frame atual e chama a funcao de desenho
        var atualiza = function(var value){};

        //Faz os tratamentos necessarios caso haja um clique do mouse
        var mouse = function(var key, var state, var x, var y){};

        //Faz os tratamentos necessarios caso seja pressionada uma tecla
        //  do teclado
        var keyDown = function(var key, var x, var y){};

        //Faz os tratamentos necessarios caso seja solta uma tecla
        //  do teclado
        var keyUp = function(var key, var x, var y){};

        //Faz os tratamentos necessarios caso seja pressionada uma tecla
        //  especial do teclado
        var specialKeyDown = function(var key, var x, var y){};

        //Faz os tratamentos necessarios caso seja solta uma tecla
        //  especial do teclado
        var specialKeyUp = function(var key, var x, var y){};

        //Realiza chamada para definePersonagens e glSetup
        var inicializa = function(){};

        //Insere um novo projetil na fase
        var novoProjetilInimigo = function(var p){};
        var novoProjetilAmigo = function(var p){};
		
        var reseta = function(){};
        var desenhaHPBoss = function(var hp, var hpTotal){};
};