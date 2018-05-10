var tabla4D;
var tabla4DGlobal;
var interprete4D;
var metodo4DActual;

var entradasNativas;


class simbolo4D{

	constructor(nombre,valor){
		this.nombre=nombre;
		this.valor=valor;
	}

}


class tablaSimbolo4D{

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
			resultado1=operarAritmetica(raiz.hijos[1]);
			resultado2=operarAritmetica(raiz.hijos[2]);
			break;
		case "num":
			return new resultado("num",raiz.valor);
			break;
		case "id":
			var simbolo=tabla3D.getSimbolo(raiz.valor);
			return new resultado("num",simbolo.valor);
			break;
		/*
		case "unario":
			resultado1=operarAritmetica(raiz.hijos[0]);
			return new resultado("num",resultado1.valor*-1);
			break;
			*/
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
		/*
		case "%":

			return new resultado("num",resultado1.valor%resultado2.valor);

			break;
		case "^":

			return new resultado("num",Math.pow(resultado1.valor,resultado2.valor));

			break;
			*/
	}

}


function operarRelacional(raiz){
	var resultado1;
	var resultado2;

	switch(raiz.etiqueta){
		case "je":
		case "jne":
		case "jg":
		case "jl":
		case "jge":
		case "jle":
			resultado1=operarAritmetica(raiz.hijos[0]);
			resultado2=operarAritmetica(raiz.hijos[1]);
			break;
		default:

			resultado1=operarAritmetica(raiz);
			if(resultado1.valor==0){
				return new resultado("bool",false);
			}else if(resultado1.valor==1){
				return new resultado("bool",true);
			}
			break;
	}

	switch(raiz.etiqueta){
		case "je":
			if(resultado1.valor==resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "jne":
			if(resultado1.valor!=resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "jg":
			if(resultado1.valor>resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "jl":
			if(resultado1.valor<resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "jge":
			if(resultado1.valor>=resultado2.valor){
				return new resultado("bool",true);
			}else{
				return new resultado("bool",false);
			}
			break;
		case "jle":
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


		//this.pool=[];


		this.p;
		this.h;
		//this.s;




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
			for(var i=0;i<metodo4DActual.hijos[0].hijos.length;i++){
				var sentencia=metodo4DActual.hijos[0].hijos[i];
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
			return metodo4DActual.hijos.length-1;
		}



		this.ejecucionGlobal=function(raiz){
			this.raiz=raiz;
			tabla4D=new tablaSimbolo4D();
			this.p=new simbolo4D("p",0);
			tabla4D.setSimbolo(this.p);
			this.h=new simbolo4D("h",0);
			tabla4D.setSimbolo(this.h);
			//this.s=new simbolo3D("s",1);
			//tabla3D.setSimbolo(this.s);
			metodo4DActual=this.raiz;
            
            //this.pool[0]=0;

            tabla4DGlobal=tabla4D;

            //debugger;
            var nodoGlobal=crearNodo("global",0,0);
            nodoGlobal.add(this.raiz);
            metodo4DActual=nodoGlobal;
			ejecutar(raiz);
			tabla4DGlobal=tabla4D;

		}



		this.ejecutarMetodoPrincipal=function(raiz){
			this.raiz=raiz;
			tabla4D=new tablaSimbolo4D();
			this.p=new simbolo4D("p",0);
			tabla4D.setSimbolo(this.p);
			this.h=new simbolo4D("h",0);
			tabla4D.setSimbolo(this.h);
			//this.s=new simbolo4D("s",1);
			//tabla4D.setSimbolo(this.s);
			metodo4DActual=this.raiz;
            
            //this.pool[0]=0;

            tabla4DGlobal=tabla4D;


			var metodoPrincipal=getMetodo("Principal");
			if(metodoPrincipal!=null){
				var metodoAux=metodo4DActual;
				metodo4DActual=metodoPrincipal;
				tabla4D=new tablaSimbolo4D();
				tabla4D.cambiarAmbito(tabla4DGlobal);
				//debugger;
				ejecutar(metodo4DActual.hijos[0]);
				//debugger;

			metodo4DActual=metodoAux;
			}else{
				var metodoGlobal=getMetodo("$$_globales");
				var metodoAux=metodo4DActual;
				metodo4DActual=metodoGlobal;
				tabla4D=new tablaSimbolo4D();
				tabla4D.cambiarAmbito(tabla4DGlobal);
				ejecutar(metodoGlobal.hijos[0]);
			}

		}



	}

}

		function getMetodo(nombre){

			for(var i=0;i<interprete4D.raiz.hijos.length;i++){
				var metodo=interprete4D.raiz.hijos[i];
				if(metodo.etiqueta==="metodo"){
					if(metodo.valor===nombre){
						return metodo;
					}
				}
			}
			return null;
		}

		function ejecutar(raiz){
			//debugger;
			for(var i=0;i<raiz.hijos.length;i++){
				var sentencia=raiz.hijos[i];
				//console.log(sentencia);
				//debugger;
				switch(sentencia.etiqueta){
					case "+":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia);
						var simbolo=new simbolo4D(nombre,resultado.valor);
						tabla4D.setSimbolo(simbolo);
						break;
					case "-":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia);
						var simbolo=new simbolo4D(nombre,resultado.valor);
						tabla4D.setSimbolo(simbolo);
						break;
					case "*":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia);
						var simbolo=new simbolo4D(nombre,resultado.valor);
						tabla4D.setSimbolo(simbolo);
						break;
					case "/":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia);
						var simbolo=new simbolo4D(nombre,resultado.valor);
						tabla4D.setSimbolo(simbolo);
						break;
					case "asignacion":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var simbolo=new simbolo4D(nombre,resultado.valor);
						tabla4D.setSimbolo(simbolo);
						break;
					case "<=Stack":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete4D.stack[resultado1.valor]=resultado2.valor;
						break;
					case "<=Heap":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete4D.heap[resultado1.valor]=resultado2.valor;
						break;
					/*
					case "asignacionPool":
						var resultado1=operarAritmetica(sentencia.hijos[0]);
						var resultado2=operarAritmetica(sentencia.hijos[1]);
						interprete4D.pool[resultado1.valor]=resultado2.valor;
						break;
						*/
					case "=>Stack":
						var nombre=sentencia.hijos[1].valor;
						var resultado=operarAritmetica(sentencia.hijos[0]);
						var valor=interprete4D.stack[resultado.valor];
						var simbolo=new simbolo4D(nombre,valor);
						tabla4D.setSimbolo(simbolo);

						if(metodo4DActual.valor==="$$_inStr"||metodo4DActual.valor==="$$_inNum"){
							entradasNativas.push(simbolo);
						}

						break;
					case "=>Heap":
						var nombre=sentencia.hijos[1].valor;
						var resultado=operarAritmetica(sentencia.hijos[0]);
						var valor=interprete4D.heap[resultado.valor];
						var simbolo=new simbolo4D(nombre,valor);
						tabla4D.setSimbolo(simbolo);
						break;
					/*
					case "accesoPool":
						var nombre=sentencia.hijos[0].valor;
						var resultado=operarAritmetica(sentencia.hijos[1]);
						var valor=interprete4D.pool[resultado.valor];
						var simbolo=new simbolo4D(nombre,valor);
						tabla4D.setSimbolo(simbolo);
						break;
						*/
					case "llamada":

						var metodo=getMetodo(sentencia.valor);
						var metodoAux=metodo4DActual;
						metodo4DActual=metodo;
						var tabla4DAux=tabla4D;
						//cadenaOutStr="";
						tabla4D=new tablaSimbolo4D();
						

						tabla4D.cambiarAmbito(tabla4DGlobal);

						//debugger;
						switch(metodo.valor){
							case "$$_outStr":
							case "$$_outNum":
								//debugger;
								ejecutar(metodo.hijos[0]);
								consola4D+="\n";
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
								//debugg3er;
								entradasNativas=[];
								ejecutar(metodo.hijos[0]);
								inNum();
								break;
							case "$$_getRandom":
								ejecutar(metodo.hijos[0]);
								getRandom();
								break;
							case "exit":
								exit(sentencia);
								break;
							default:

								//debugger;
								ejecutar(metodo.hijos[0]);
								break;
						}

						metodo4DActual=metodoAux;
						tabla4D=tabla4DAux;
						break;
					case "jmp":
						i=interprete4D.getIndiceEtiqueta(sentencia.valor);
						break;
					case "etiquetaLLegada":
						continue;
						break;
					case "etiquetaSalida":
						continue;
						break;
					case "je":
					case "jne":
					case "jg":
					case "jge":
					case "jl":
					case "jle":
						//debugger;
						var exp=operarRelacional(sentencia);
						if(exp.valor){
							var etiV=sentencia.hijos[2].valor;
							i=interprete4D.getIndiceEtiqueta(etiV);
						}
						break;
					/*
					case "if":
						//debugger;
						var exp=operarRelacional(sentencia.hijos[0]);
						if(exp.valor){
							var etiV=sentencia.hijos[1].valor;
							i=interprete4D.getIndiceEtiqueta(etiV);
						}else{
							var etiF=sentencia.hijos[2].valor;
							i=interprete4D.getIndiceEtiqueta(etiF);
						}
						break;
					*/
					case "printf":
						printf(sentencia,metodo4DActual.valor);
						break;
				}
			}


		}