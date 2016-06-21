var Jogo = function()
{
	var proxFase;
	var fases[] = new Fase[5];
	var pausado = false;
	var estado = 0;
	var controlaScore = 10000;
	setControlaScore = function(){
	};
	zeraControlaScore = function(){
	};
	getControlaScore = function(){
	};
	
	//Armazena as vidas do jogador
	var vidas[5];
	
	//Callbacks OpenGL
	mouse = function(int button, int state, int x, int y){
	};
	keyDown = function(unsigned char key, int x, int y){
	};
	keyUp= function( key,  x, y){};
	specialKeyDown= function(key, x, y){};
	specialKeyUp= function( key, x, y){};
	draw= function(){};

	timer= function(int value){};

	run= function();
	inicializa= function(int fase);
	setProxFase= function(int p);
	proximaFase= function();
	fimJogo= function();
};