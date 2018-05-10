
var cadenaShow="";

function printf(raiz,tipo){
	//debugger;
	if(tipo==="$$_show"){
		switch(raiz.valor){
			case "%c":
				var caracter=operarAritmetica(raiz.hijos[0]);
				cadenaShow+=String.fromCharCode(caracter.valor);
				break
			case "%d":
				var caracter=operarAritmetica(raiz.hijos[0]);
				cadenaShow+=Math.trunc(caracter.valor);
				break;
			case "%f":
				var caracter=operarAritmetica(raiz.hijos[0]);
				cadenaShow+=caracter.valor;
				break;
		}
		
	}else{
		switch(raiz.valor){
			case "%c":
				var caracter=operarAritmetica(raiz.hijos[0]);
				consola4D+=String.fromCharCode(caracter.valor);
				break
			case "%d":
				var caracter=operarAritmetica(raiz.hijos[0]);
				consola4D+=Math.trunc(caracter.valor);
				break;
			case "%f":
				var caracter=operarAritmetica(raiz.hijos[0]);
				consola4D+=caracter.valor;
				break;
		}
	}
}


function inStr(raiz){

	var variable=entradasNativas[0];
	var mensaje=entradasNativas[1];

	var strMensaje="";

	var indice=mensaje.valor;
	var char=interprete4D.pool[indice];
	indice++;
	while(char!=0){
		strMensaje+=String.fromCharCode(char);
		char=interprete4D.pool[indice];
		indice++;
	}

	var valor = prompt(strMensaje); 
	//debugger;
	if(valor!=null){
		var s=tabla4D.getSimbolo("s");
		interprete4D.heap[variable.valor]=s.valor;

		for(var i=0;i<valor.length;i++){
			var char=valor.charAt(i);
			interprete4D.pool[s.valor]=char.charCodeAt();
			s.valor=s.valor+1;
		}
		interprete4D.pool[s.valor]=0;
		s.valor=s.valor+1;
	}
}



function inNum(raiz){
	//debugger;
	var variable=entradasNativas[1];
	var mensaje=entradasNativas[0];

	var strMensaje="";

	var indice=mensaje.valor;
	var char=interprete4D.pool[indice];
	indice++;
	while(char!=0){
		strMensaje+=String.fromCharCode(char);
		char=interprete4D.pool[indice];
		indice++;
	}

	var valor = prompt(strMensaje); 

	if(isNaN(valor)||valor==null||valor==""){
		valor=Number(variable.valor)
	}else{
		valor=Number(valor);
	}
	//debugger;
	var p=tabla4D.getSimbolo("p");
	interprete4D.stack[p.valor]=Number(valor);
}


function getRandom(){
	var valor=Math.random();
	var p=tabla4D.getSimbolo("p");
	interprete4D.stack[p.valor]=Number(valor);
}






function exit(raiz){
	//debugger;
	var puntero=tabla4D.getSimbolo("p");
	var puntero2=puntero.valor+1;
	var valor=interprete4D.stack[puntero2];
	switch(valor){
		case 102:
			alert("NullPointerException en linea:"+raiz.linea+" columna:"+raiz.columna);
			break;
		case 243:
			alert("MissingReturnStatement en linea:"+raiz.linea+" columna:"+raiz.columna);
			break;
		case 396:
			alert("ArithmeticException en linea:"+raiz.linea+" columna:"+raiz.columna);
			break;
		case 624:
			alert("StackOverFlowException en linea:"+raiz.linea+" columna:"+raiz.columna);
			break;
		case 789:
			alert("HeapOverFlowException en linea:"+raiz.linea+" columna:"+raiz.columna);
			break;
		case 801:
			alert("PoolOverFlowException en linea:"+raiz.linea+" columna:"+raiz.columna);
			break;
	}
}