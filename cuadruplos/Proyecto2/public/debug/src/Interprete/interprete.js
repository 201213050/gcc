var tabla3D;
var tabla3DGlobal;
//var interprete3D;
var metodo3DActual;
var simboloMetodo;

var entradasNativas;



//--------------------------------
var stack=[];
var punteroPrincipal=0;
var estado=false; 
var punteroPInf=0;
var punteroPSup=0;
//--------------------------------

class simbolo3D{

	constructor(nombre,valor){
		this.nombre=nombre;
		this.valor=valor;
	}

}


class tablaSimbolo3D{

	constructor(){
		this.simbolos=[];

		this.setSimbolo=function(simbolo){
			for(var i=0;i<this.simbolos.length;i++){
				var aux=this.simbolos[i];
				if(aux.nombre==simbolo.nombre){
					aux.valor=simbolo.valor;
					return;
				}
			}

			this.simbolos.push(simbolo);
		}


		this.getSimbolo=function(nombre){
			for(var i=0;i<this.simbolos.length;i++){
				var aux=this.simbolos[i];
				if(aux.nombre==nombre){
					return aux;
				}
			}

			return null;
		}


		this.cambiarAmbito=function(global){
			for(var i=0;i<global.simbolos.length;i++){
				this.simbolos.push(global.simbolos[i]);
			}
		}



	}

}








function operarAritmetica(raiz){
	var resultado1;
	var resultado2;

	switch(raiz.etiqueta){
		case "+":
		case "-":
		case "*":
		case "/":
		case "%":
		case "^":
			resultado1=operarAritmetica(raiz.hijos[0]);
			resultado2=operarAritmetica(raiz.hijos[1]);
			break;
		case "num":
			return new resultado("num",raiz.valor);
			break;
		case "id":
			var simbolo=tabla3D.getSimbolo(raiz.valor);
			return new resultado("num",simbolo.valor);
			break;
		case "unario":
			resultado1=operarAritmetica(raiz.hijos[0]);
			return new resultado("num",resultado1.valor*-1);
			break;
	}



	switch(raiz.etiqueta){
		case "+":

			return new resultado("num",resultado1.valor+resultado2.valor);

			break;
		case "-":

			return new resultado("num",resultado1.valor-resultado2.valor);

			break;
		case "*":

			return new resultado("num",resultado1.valor*resultado2.valor);

			break;
		case "/":

			return new resultado("num",resultado1.valor/resultado2.valor);

			break;
		case "%":

			return new resultado("num",resultado1.valor%resultado2.valor);

			break;
		case "^":

			return new resultado("num",Math.pow(resultado1.valor,resultado2.valor));

			break;
	}

}


function operarRelacional(raiz){
	var resultado1;
	var resultado2;

	switch(raiz.etiqueta){
		case "==":
		case "!=":
		case ">":
		case "<":
		case ">=":
		case "<=":
			resultado1=operarAritmetica(raiz.hijos[0]);
			resultado2=operarAritmetica(raiz.hijos[1]);
			break;
		default:

			resultado1=operarAritmetica(raiz);
			if(resultado1.valor==0){
				return new resultado("bool",false);
			}else{
				return new resultado("bool",true);
			}
			break;
	}

	switch(raiz.etiqueta){
		case "==":
			if(resultado1.valor==resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("boo",false);
			}
			break;
		case "!=":
			if(resultado1.valor!=resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case ">":
			if(resultado1.valor>resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "<":
			if(resultado1.valor<resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case ">=":
			if(resultado1.valor>=resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "<=":
			if(resultado1.valor<=resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
	}

	return new resultado("bool",false);
}





class interprete{

	constructor(raiz){
		this.raiz=raiz;
		stack=[];

		this.stack=[];


		this.heap=[];


		this.pool=[];


		this.p;
		this.h;
		this.s;




		this.existeEtiqueta=function(etiqueta,sentencia){
			//debugger;
			for(var j=0;j<sentencia.hijos[0].hijos.length;j++){
				var aux=sentencia.hijos[0].hijos[j];
				if(etiqueta===aux.valor){
					return true;
				}
			}
			return false;
		}

		this.getIndiceEtiqueta=function(etiqueta){
			//debugger;
			for(var i=0;i<metodo3DActual.hijos[0].hijos.length;i++){
				var sentencia=metodo3DActual.hijos[0].hijos[i];
				switch(sentencia.etiqueta){
					case "etiquetaLLegada":
					case "etiquetaSalida":
						if(this.existeEtiqueta(etiqueta,sentencia)){
							return i;
						}
						break;
					default:
						break;
				}
			}
			return metodo3DActual.hijos.length-1;
		}



		this.ejecucionGlobal=function(raiz){
			this.raiz=raiz;
			//console.log(interprete3D.raiz);
			tabla3D=new tablaSimbolo3D();
			this.p=new simbolo3D("p",0);
			tabla3D.setSimbolo(this.p);
			this.h=new simbolo3D("h",0);
			tabla3D.setSimbolo(this.h);
			this.s=new simbolo3D("s",1);
			tabla3D.setSimbolo(this.s);
			metodo3DActual=this.raiz;
            
            this.pool[0]=0;

            tabla3DGlobal=tabla3D;

            //debugger;
            var nodoGlobal=crearNodo("global",0,0);
            nodoGlobal.add(this.raiz);
            metodo3DActual=nodoGlobal;
			ejecutar(raiz);
			tabla3DGlobal=tabla3D;

		}



		this.ejecutarMetodoPrincipal=function(raiz){
			//console.log(raiz);
			this.raiz=raiz;
			tabla3D=new tablaSimbolo3D();
			this.p=new simbolo3D("p",0);
			tabla3D.setSimbolo(this.p);
			this.h=new simbolo3D("h",0);
			tabla3D.setSimbolo(this.h);
			this.s=new simbolo3D("s",1);
			tabla3D.setSimbolo(this.s);
			metodo3DActual=this.raiz;
            
            this.pool[0]=0;

            tabla3DGlobal=tabla3D;


			var metodoPrincipal=getMetodo("Principal");
			console.log(metodoPrincipal);
			if(metodoPrincipal!=null){
				var metodoAux=metodo3DActual;
				metodo3DActual=metodoPrincipal;
				tabla3D=new tablaSimbolo3D();
				tabla3D.cambiarAmbito(tabla3DGlobal);
				//debugger;

				simboloMetodo=tabla.getSimboloMetodo("$$_inicio5322");
				llenarStack(simboloMetodo);
				simboloMetodo=tabla.getSimboloMetodo(metodo3DActual.valor);
				llenarStack(simboloMetodo);
				Concurrent.Thread.create(ejecutar,metodo3DActual.hijos[0]);
				//ejecutar(metodo3DActual.hijos[0]);
				//debugger;

				//metodo3DActual=metodoAux;
			}else{
				var metodoGlobal=getMetodo("$$_globales");
				simboloMetodo=tabla.getSimboloMetodo("$$_globales");
				metodo3DActual=metodoGlobal;
				tabla3D=new tablaSimbolo3D();
				tabla3D.cambiarAmbito(tabla3DGlobal);
				Concurrent.Thread.create(ejecutar,metodoGlobal.hijos[0]);
			}

		}



	}

}




		function getMetodo(nombre){
			//console.log(interprete3D);
			for(var i=0;i<interprete3D.raiz.hijos.length;i++){
				var metodo=interprete3D.raiz.hijos[i];
				if(metodo.etiqueta==="metodo"){
					if(metodo.valor===nombre){
						return metodo;
					}
				}
			}
			return null;
		}

		function ejecutar(raiz){
			//console.log(raiz);
			for(var i=0;i<raiz.hijos.length;i++){
				var sentencia=raiz.hijos[i];
				while(pausa){
					delay(50);
				}
				//console.log(sentencia);
				switch(sentencia.etiqueta){
					case "asignacion":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var simbolo=new simbolo3D(nombre,resultado.valor);
						tabla3D.setSimbolo(simbolo);
						pintar(sentencia.linea);
						delay(tiempoD);
						break;
					case "asignacionStack":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete3D.stack[resultado1.valor]=resultado2.valor;
						var punteroP=tabla3D.getSimbolo("p");
						
						pintar(sentencia.linea);
						delay(tiempoD);
						break;
					case "asignacionHeap":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete3D.heap[resultado1.valor]=resultado2.valor;
						pintar(sentencia.linea);
						delay(tiempoD);
						break;
					case "asignacionPool":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete3D.pool[resultado1.valor]=resultado2.valor;
						pintar(sentencia.linea);
						delay(tiempoD);
						break;
					case "accesoStack":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var valor=interprete3D.stack[resultado.valor];
						var simbolo=new simbolo3D(nombre,valor);
						tabla3D.setSimbolo(simbolo);

						if(metodo3DActual.valor==="$$_inStr"||metodo3DActual.valor==="$$_inNum"){
							entradasNativas.push(simbolo);
						}
						pintar(sentencia.linea);
						delay(tiempoD);
						break;
					case "accesoHeap":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var valor=interprete3D.heap[resultado.valor];
						var simbolo=new simbolo3D(nombre,valor);
						tabla3D.setSimbolo(simbolo);
						pintar(sentencia.linea);
						delay(tiempoD);
						break;
					case "accesoPool":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var valor=interprete3D.pool[resultado.valor];
						var simbolo=new simbolo3D(nombre,valor);
						tabla3D.setSimbolo(simbolo);
						pintar(sentencia.linea);
						delay(tiempoD);
						break;
					case "llamada":
					pintar(sentencia.linea);
						var metodo=getMetodo(sentencia.valor);

						var auxSimboloMetodo=simboloMetodo;
						simboloMetodo=tabla.getSimboloMetodo(metodo.valor);
						llenarStack(simboloMetodo);

						var metodoAux=metodo3DActual;
						metodo3DActual=metodo;
						var tabla3DAux=tabla3D;
						//cadenaOutStr="";
						tabla3D=new tablaSimbolo3D();
						

						tabla3D.cambiarAmbito(tabla3DGlobal);

						//debugger;
						switch(metodo.valor){
							case "$$_outStr":
							case "$$_outNum":
								//debugger;
								ejecutar(metodo.hijos[0]);
								consola3D+="\n";
								break;
							case "$$_inStr":
								entradasNativas=[];
								ejecutar(metodo.hijos[0]);
								inStr();
								break;
							case "$$_show":
								//debugger;
								cadenaShow="";
								ejecutar(metodo.hijos[0]);
								alert(cadenaShow);
								break;
							case "$$_inNum":
								//debugger;
								entradasNativas=[];
								ejecutar(metodo.hijos[0]);
								inNum();
								break;
							case "$$_getRandom":
								ejecutar(metodo.hijos[0]);
								getRandom();
								break;
							case "$$_globales":
								ejecutar(metodo.hijos[0]);
								var auxPuntero=tabla3D.getSimbolo("s");
								punteroPrincipal=auxPuntero.valor;
								break;
							default:

								//debugger;
								ejecutar(metodo.hijos[0]);
								break;
						}

						metodo3DActual=metodoAux;
						tabla3D=tabla3DAux;
						simboloMetodo=auxSimboloMetodo
						break;
					case "saltoIncondicional":
						i=interprete3D.getIndiceEtiqueta(sentencia.valor);
						break;
					case "etiquetaLLegada":
						continue;
						break;
					case "etiquetaSalida":
						continue;
						break;
					case "if":
						//debugger;
						var exp=operarRelacional(sentencia.hijos[0]);
						if(exp.valor){
							var etiV=sentencia.hijos[1].valor;
							i=interprete3D.getIndiceEtiqueta(etiV);
						}else{
							var etiF=sentencia.hijos[2].valor;
							i=interprete3D.getIndiceEtiqueta(etiF);
						}
						break;
					case "printf":
						printf(sentencia,metodo3DActual.valor);
						break;
				}
			}


		}





function llenarStack(metodo){
	console.log("---------------------------------------------");
	console.log(metodo);
	var p=tabla3D.getSimbolo("p");
	console.log(p.valor+"  "+metodo.tamanio);
	var i=0;
	var j=0;
	if(metodo.nombre=="Principal"){
		j=p.valor+metodo.tamanio+tabla.globales.length;
	}else{
		j=p.valor+metodo.tamanio;
	}
	console.log("---------------");
	for(var i=p.valor;i<j;i++){
		var ambitoReal={"ambito":metodo.nombre,"valor":interprete3D.stack[i]};
		console.log(ambitoReal);
		stack[i]=ambitoReal;
	}
	console.log("-------------------------------------------------");
	//console.log(stack);
	//var ambitoReal={"ambito":"__","valor":"0"};
		//console.log(ambitoReal);
	//stack[i]=ambitoReal;
}



function delay( sleepDuration ){
	actualizar();
	//disminuirTiempo();
	//aumentarTiempo();
	document.getElementById('out').value=consola3D;
	//console.log(consola3D);
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
    
}


















































/*

var tabla3D;
var tabla3DGlobal;
var interprete3D;
var metodo3DActual;

var entradasNativas;

var tiempo=500;

var stack=[];

function getMetodo(nombre){
			
			for(var i=0;i<interprete3D.raiz.hijos.length;i++){
				var metodo=interprete3D.raiz.hijos[i];
				if(metodo.etiqueta==="metodo"){
					if(metodo.valor===nombre){
						return metodo;
					}
				}
			}
			return null;
		}

class simbolo3D{

	constructor(nombre,valor){
		this.nombre=nombre;
		this.valor=valor;
	}

}

function eje(nodo){
			while(true){
				console.log(nodo);
			}
		}


class tablaSimbolo3D{

	constructor(){
		this.simbolos=[];

		this.setSimbolo=function(simbolo){
			for(var i=0;i<this.simbolos.length;i++){
				var aux=this.simbolos[i];
				if(aux.nombre==simbolo.nombre){
					aux.valor=simbolo.valor;
					return;
				}
			}

			this.simbolos.push(simbolo);
		}


		this.getSimbolo=function(nombre){
			for(var i=0;i<this.simbolos.length;i++){
				var aux=this.simbolos[i];
				if(aux.nombre==nombre){
					return aux;
				}
			}

			return null;
		}


		this.cambiarAmbito=function(global){
			for(var i=0;i<global.simbolos.length;i++){
				this.simbolos.push(global.simbolos[i]);
			}
		}



	}

}








function operarAritmetica(raiz){
	var resultado1;
	var resultado2;

	switch(raiz.etiqueta){
		case "+":
		case "-":
		case "*":
		case "/":
		case "%":
		case "^":
			resultado1=operarAritmetica(raiz.hijos[0]);
			resultado2=operarAritmetica(raiz.hijos[1]);
			break;
		case "num":
			return new resultado("num",raiz.valor);
			break;
		case "id":
			var simbolo=tabla3D.getSimbolo(raiz.valor);
			return new resultado("num",simbolo.valor);
			break;
		case "unario":
			resultado1=operarAritmetica(raiz.hijos[0]);
			return new resultado("num",resultado1.valor*-1);
			break;
	}



	switch(raiz.etiqueta){
		case "+":

			return new resultado("num",resultado1.valor+resultado2.valor);

			break;
		case "-":

			return new resultado("num",resultado1.valor-resultado2.valor);

			break;
		case "*":

			return new resultado("num",resultado1.valor*resultado2.valor);

			break;
		case "/":

			return new resultado("num",resultado1.valor/resultado2.valor);

			break;
		case "%":

			return new resultado("num",resultado1.valor%resultado2.valor);

			break;
		case "^":

			return new resultado("num",Math.pow(resultado1.valor,resultado2.valor));

			break;
	}

}


function operarRelacional(raiz){
	var resultado1;
	var resultado2;

	switch(raiz.etiqueta){
		case "==":
		case "!=":
		case ">":
		case "<":
		case ">=":
		case "<=":
			resultado1=operarAritmetica(raiz.hijos[0]);
			resultado2=operarAritmetica(raiz.hijos[1]);
			break;
		default:

			resultado1=operarAritmetica(raiz);
			if(resultado1.valor==0){
				return new resultado("bool",false);
			}else{
				return new resultado("bool",true);
			}
			break;
	}

	switch(raiz.etiqueta){
		case "==":
			if(resultado1.valor==resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("boo",false);
			}
			break;
		case "!=":
			if(resultado1.valor!=resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case ">":
			if(resultado1.valor>resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "<":
			if(resultado1.valor<resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case ">=":
			if(resultado1.valor>=resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "<=":
			if(resultado1.valor<=resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
	}

	return new resultado("bool",false);
}



class interprete{

	constructor(){
		this.raiz;


		this.stack=[];


		this.heap=[];


		this.pool=[];


		this.p;
		this.h;
		this.s;


		this.getMetodo=function(nombre){
			
			for(var i=0;i<this.raiz.hijos.length;i++){
				var metodo=this.raiz.hijos[i];
				if(metodo.etiqueta==="metodo"){
					if(metodo.valor===nombre){
						return metodo;
					}
				}
			}
			return null;
		}

		this.existeEtiqueta=function(etiqueta2,sentencia){
			//debugger;
			for(var j=0;j<sentencia.hijos[0].hijos.length;j++){
				var aux=sentencia.hijos[0].hijos[j];
				if(etiqueta2===aux.valor){
					return true;
				}
			}
			return false;
		}

		this.getIndiceEtiqueta=function(etiqueta2){
			//console.log(etiqueta2);
			if(etiqueta2==null){
				return metodo3DActual.hijos.length-1;
			}
			//debugger;
			for(var i=0;i<metodo3DActual.hijos[0].hijos.length;i++){
				var sentencia=metodo3DActual.hijos[0].hijos[i];
				switch(sentencia.etiqueta){
					case "etiquetaLLegada":
					case "etiquetaSalida":
						if(this.existeEtiqueta(etiqueta2,sentencia)){
							return i;
						}
						break;
					default:
						break;
				}
			}
			return metodo3DActual.hijos.length-1;
		}



		this.ejecucionGlobal=function(raiz){
			this.raiz=raiz;
			tabla3D=new tablaSimbolo3D();
			this.p=new simbolo3D("p",0);
			tabla3D.setSimbolo(this.p);
			this.h=new simbolo3D("h",0);
			tabla3D.setSimbolo(this.h);
			this.s=new simbolo3D("s",1);
			tabla3D.setSimbolo(this.s);
			metodo3DActual=this.raiz;
            
            this.pool[0]=0;

            tabla3DGlobal=tabla3D;

            //debugger;
            var nodoGlobal=crearNodo("global",0,0);
            nodoGlobal.add(this.raiz);
            metodo3DActual=nodoGlobal;
            //debugger;
            Concurrent.Thread.create(ejecutar,raiz);
			//ejecutar(raiz)
			//this.eje();
			tabla3DGlobal=tabla3D;

		}


		this.ejecutarMetodoPrincipal=function(){
			var metodoPrincipal=this.getMetodo("Principal");
			if(metodoPrincipal!=null){
				var metodoAux=metodo3DActual;
				metodo3DActual=metodoPrincipal;
				tabla3D=new tablaSimbolo3D();
				tabla3D.cambiarAmbito(tabla3DGlobal);
				//debugger;
				ejecutar(metodo3DActual.hijos[0]);
				//debugger;
			metodo3DActual=metodoAux;
			}
		}

		

		




	}




}



function ejecutar(raiz){
			
			//while(true){
			//	console.log("hola");
			//}
			
			for(var i=0;i<raiz.hijos.length;i++){
				var sentencia=raiz.hijos[i];
				//console.log(sentencia+" ite:"+i);
				if(true){

				//actualizar();
				switch(sentencia.etiqueta){
					case "asignacion":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var simbolo=new simbolo3D(nombre,resultado.valor);
						tabla3D.setSimbolo(simbolo);
						
						delay(tiempo);
						break;
					case "asignacionStack":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete3D.stack[resultado1.valor]=resultado2.valor;
						if(metodo3DActual!=null){
							if(metodo3DActual.valor!=null){
								var ambitoReal={"ambito":metodo3DActual.valor,"valor":resultado2.valor};
								stack[resultado1.valor]=ambitoReal;
							}else{
								var ambitoReal={"ambito":"global","valor":resultado2.valor};
								stack[resultado1.valor]=ambitoReal;
							}
						}else{
							var ambitoReal={"ambito":"global","valor":resultado2.valor}
							stack[resultado1.valor]=ambitoReal;
						}
						
						delay(tiempo);
						break;
					case "asignacionHeap":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete3D.heap[resultado1.valor]=resultado2.valor;
						
						delay(tiempo);
						break;
					case "asignacionPool":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete3D.pool[resultado1.valor]=resultado2.valor;
						
						delay(tiempo);
						break;
					case "accesoStack":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var valor=interprete3D.stack[resultado.valor];
						var simbolo=new simbolo3D(nombre,valor);
						tabla3D.setSimbolo(simbolo);

						if(metodo3DActual.valor==="$$_inStr"||metodo3DActual.valor==="$$_inNum"){
							entradasNativas.push(simbolo);
						}
						
						delay(tiempo);
						break;
					case "accesoHeap":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var valor=interprete3D.heap[resultado.valor];
						var simbolo=new simbolo3D(nombre,valor);
						tabla3D.setSimbolo(simbolo);
						
						delay(tiempo);
						break;
					case "accesoPool":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var valor=interprete3D.pool[resultado.valor];
						var simbolo=new simbolo3D(nombre,valor);
						tabla3D.setSimbolo(simbolo);
						
						delay(tiempo);
						break;
					case "llamada":
						//console.log(sentencia);
						//var metodo=interprete3D.getMetodo(sentencia.valor);
						var metodo=getMetodo(sentencia.valor);
						var metodoAux=metodo3DActual;
						metodo3DActual=metodo;
						var tabla3DAux=tabla3D;
						//cadenaOutStr="";
						tabla3D=new tablaSimbolo3D();
						//debugger;

						tabla3D.cambiarAmbito(tabla3DGlobal);

						//debugger;
						actualizar();
						switch(metodo.valor){
							case "$$_outStr":
							case "$$_outNum":
								//debugger;
								ejecutar(metodo.hijos[0]);
								consola3D+="\n";
								break;
							case "$$_inStr":
								entradasNativas=[];
								ejecutar(metodo.hijos[0]);
								inStr();
								break;
							case "$$_show":
								//debugger;
								cadenaShow="";
								ejecutar(metodo.hijos[0]);
								alert(cadenaShow);
								break;
							case "$$_inNum":
								//debugger;
								entradasNativas=[];
								ejecutar(metodo.hijos[0]);
								inNum();
								break;
							case "$$_getRandom":
								ejecutar(metodo.hijos[0]);
								getRandom();
								break;
							default:

								//debugger;
								ejecutar(metodo.hijos[0]);
								break;
						}

						metodo3DActual=metodoAux;
						tabla3D=tabla3DAux;
						break;
					case "saltoIncondicional":
						i=interprete3D.getIndiceEtiqueta(sentencia.valor);
						break;
					case "etiquetaLLegada":
						continue;
						break;
					case "etiquetaSalida":
						continue;
						break;
					case "if":
						//debugger;
						var exp=operarRelacional(sentencia.hijos[0]);
						//console.log(exp);
						if(exp.valor){
							var etiV=sentencia.hijos[1].valor;
							//console.log(etiV+"**************************************");
							if(etiV!=null){
							i=interprete3D.getIndiceEtiqueta(etiV);
							}
						}else{
							var etiF=sentencia.hijos[2].valor;
							//console.log(etiF+"**************************************");
							if(etiF!=null){
							i=interprete3D.getIndiceEtiqueta(etiF);
							}
						}
						break;
					case "printf":
						printf(sentencia,metodo3DActual.valor);
						break;
				}
			}
			}

}
*/

