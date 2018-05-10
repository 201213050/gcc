//null del lenguaje basic3D
var nulo=532226811*201213402;


var nivel=0;//se utiliza pasa saber en que profundidad de acceso a un objeto 
var constructor=false;

var metodos=[];
var elements=[];
var globales=[];



var metodoActual;
var tablaGlobal;
var ambito=[];

var tabla;
var compilador;

//instancia a operaciones
var opA;
var opR;
var opL;


//manejo de errores
var errores=[];


//etiquetas de control de flujo
var etiquetaReturn;
var pilaSalidas=[];
var pilaEntradas=[];

function getEstructura(){

	if(nivel>0){
		return "heap";
	}else{
		return "stack";
	}

	/*if(ambito.length==0){
		return "heap";
	}else{
		if(nivel>0){
			return "heap";
		}else{
			return "stack";
		}
	}*/
}


function getPuntero(){
	
	if(nivel>0){
		return "h";
	}else{
		return "p";
	}

	/*if(ambito.length==0){
		return "h";
	}else{
		if(nivel>0){
			return "h";
		}else{
			return "p";
		}
	}*/
}


function getDesplazamientoP(){
	//debugger;
	if(constructor){
		return tabla.globales.length+1;
	}
	if(metodoActual==null){
		//debugger;
		return tabla.globales.length;
	}else{
		return metodoActual.tamanio;
	}
}


//manejo de errores
function addError(tipo,descripcion,linea,columna){
	error={"tipo":tipo,"descripcion":descripcion,"linea":linea,"columna":columna};
	errores.push(error);
}


class compiladorBasic{

	constructor(raiz){
		metodos=[];
		elements=[];
		globales=[];
		ambito=[];
		errores=[];


		//iniciar();
		agregarCore();

		
		//generacion de tabla de simbolos
		tabla=new TablaSimbolo();
	    //tabla.generar(raiz);

		this.iniciar=function(raiz){
			metodoActual=null;
			tabla.generar(raiz);
			tabla.reiniciarIdSent();
			for(var i=0;i<raiz.hijos.length;i++){
				var sentencia=raiz.hijos[i];
				switch(sentencia.etiqueta){
					case "metodo":
					case "metodoArray":
						metodos.push(sentencia);
						break;
					case "element":
						elements.push(sentencia);
						break;
					case "primitivaD":
					case "primitivaDA":
					case "elementDD":
					case "elementDI":
					case "elementD":
					case "array":


					case "asignacion":
					case "asignacionElement":
					case "break":
					case "breakId":
					case "continue":
					case "return":
					case "if":
					case "ifElse":
					case "switch":

					case "while":
					case "doWhile":
					case "repeatUntil":
					case "loop":
					case "count":
					case "doWhilex":
					case "for":


					case "outStr":
				    case "outNum":
				    case "inStr":
				    case "show":
				    case "llamada":

				    case "throws":

						globales.push(sentencia);
						break;
				}
			}

			this.guardarGlobales();	

			constructor=true;
			crearConstructores(elements);
			constructor=false;
			
			this.ejecutarMetodos();
			codigo3D+=core3D;
		}

		

		this.guardarGlobales=function(){
			var sentenciasGlobales=new Nodo("variablesGlobales",1,1);
			for(var i=0;i<globales.length;i++){
				sentenciasGlobales.add(globales[i]);
			}

			codigo3D+="void $$_globales(){\n";
			this.ejecutar(sentenciasGlobales);
			codigo3D+="p=p+"+getDesplazamientoP()+";\n";
			codigo3D+="}\n\n";
		}		



		this.ejecutarMetodos=function(){
			var existePrincipal=false;
			for(var i=0;i<metodos.length;i++){

				ambito=[];
				var metodo=metodos[i];
				var id=tabla.generarId(metodo);
				metodoActual=tabla.getSimbolo(id,ambito);
				
				
				etiquetaReturn=genEti();
				if(metodo.hijos[1].valor==="Principal"){

					codigo3D+="void Principal(){\n";
					codigo3D+="$$_globales();\n";
					ambito.push("Principal");
					this.ejecutar(metodo.hijos[3]);

					codigo3D+=etiquetaReturn+":  ; \n";
					codigo3D+="}\n\n";
					existePrincipal=true;

				}else{
					ambito.push(id);
					declararParametros(metodo.hijos[2]);
					
					codigo3D+="void "+id+"(){\n"
					//falta guardarPamatros
					this.ejecutar(metodo.hijos[3]);

					codigo3D+=etiquetaReturn+":  ;\n";
					codigo3D+="}\n\n";

				}
			}
			if(!existePrincipal){
				addError("Semantico","El programa no tiene un metodo principal",1,1);
				return;
			}


		}


		this.ejecutar=function(raiz){
			for(var i=0;i<raiz.hijos.length;i++){
				var sentencia=raiz.hijos[i];
				switch(sentencia.etiqueta){
					case "primitivaD":
						declaracionPrimitivaD(sentencia);
						break;
					case "primitivaDA":
						declaracionPrimitivaDA(sentencia);
						break;
					case "elementDD":
						declaracionElementDD(sentencia);
						break;
					case "elementDI":
						declaracionElementDI(sentencia);
						break;
					case "elementD":
						declaracionElementD(sentencia);
						break;
					case "array":
						declaracionArray(sentencia);
						break;
					case "asignacion":
						//debugger;
						asignacion(sentencia);
						break;
					case "asignacionElement":
						asignacionElement(sentencia);
						break;
					case "return":
						branchingReturn(sentencia);
						break;
					case "break":
					case "breakId":
						controlBreak(sentencia);
						break;
					case "continue":
					    controlContinue(sentencia);
						break;
					case "if":
						controlIf(sentencia);
						break;
					case "ifElse":
						controlIfElse(sentencia);
						break;
					case "switch":
						controlSwitch(sentencia);
						break;
					case "while":
						cicloWhile(sentencia);
						break;
					case "doWhile":
						cicloDoWhile(sentencia);
						break;
					case "repeatUntil":
						cicloRepeatUntil(sentencia);
						break;
					case "loop":
						cicloLoop(sentencia);
						break;
					case "count":
						cicloCount(sentencia);
						break;
					case "doWhilex":
						cicloDoWhilex(sentencia);
						break;
					case "for":
						cicloFor(sentencia);
						break;

					case "throws":
						crearExcepcion(sentencia);




				    case "outStr":
				    	primitivaOutStr(sentencia);
				    	break;
				    case "outNum":
				    	primitivaOutNum(sentencia);
				    	break;
				    case "inStr":
				    	primitivaInStr(sentencia);
				    	break;
				    case "show":
				    	primitivaShow(sentencia);
				    	break;
				    case "llamada":
				    	llamadaMetodo(sentencia)
				    	break;
				}
			}
		}






	}
}



