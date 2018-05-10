

function primitivaOutStr(raiz){
	opA=new aritmetica();
	var cadena=opA.operar(raiz.hijos[0]);
	if(cadena.tipo==="str"){
		var temp1;
		var temp2;
		var temp3;
		codigo3D+="//METODO OUTSTR\n";
		if(cadena.ref){
			temp1=genTemp();
			temp2=genTemp();
			codigo3D+=temp1+"=heap["+cadena.valor+"];  //direccion de la cadena\n";

			codigo3D+="p=p+"+getDesplazamientoP()+";  //cambio de ambito real\n";
			codigo3D+=temp2+"=p+1; //direccion del parametro del metodo outStr\n";
			codigo3D+="stack["+temp2+"]="+temp1+";\n";
			codigo3D+="$$_outStr();\n";
			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

		}else{
			temp1=genTemp();
			codigo3D+="p=p+"+getDesplazamientoP()+";  //cambio de ambito real\n";
			codigo3D+=temp1+"=p+1; //direccion del parametro del metodo outStr\n";
			codigo3D+="stack["+temp1+"]="+cadena.valor+";\n";
			codigo3D+="$$_outStr();\n";
			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";
		}
		codigo3D+="//FIN METODO OUTSTR\n\n";
	}else{
		addError("Semantico","El metodo nativo outStr solo acepta datos tipo str",raiz.linea,raiz.columna);
	}
}





function primitivaShow(raiz){
	opA=new aritmetica();
	var cadena=opA.operar(raiz.hijos[0]);

	if(cadena.tipo==="str"){
		var temp1;
		var temp2;
		var temp3;
		codigo3D+="//METODO SHOW\n";
		if(cadena.ref){
			temp1=genTemp();
			temp2=genTemp();
			codigo3D+=temp1+"=heap["+cadena.valor+"];  //direccion de la cadena\n";

			codigo3D+="p=p+"+getDesplazamientoP()+";  //cambio de ambito real\n";
			codigo3D+=temp2+"=p+1; //direccion del parametro del metodo outStr\n";
			codigo3D+="stack["+temp2+"]="+temp1+";\n";
			codigo3D+="$$_show();\n";
			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

		}else{
			temp1=genTemp();
			codigo3D+="p=p+"+getDesplazamientoP()+";  //cambio de ambito real\n";
			codigo3D+=temp1+"=p+1; //direccion del parametro del metodo outStr\n";
			codigo3D+="stack["+temp1+"]="+cadena.valor+";\n";
			codigo3D+="$$_show();\n";
			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";
		}
		codigo3D+="//FIN METODO SHOW\n\n";
	}else{
		addError("Semantico","El metodo nativo show solo acepta datos tipo str",raiz.linea,raiz.columna);
	}
}


function primitivaOutNum(raiz){
	//debugger;
	opA=new aritmetica();
	var numero=opA.operar(raiz.hijos[0]);
	opA=new aritmetica();
	var comoEntero=opA.operar(raiz.hijos[1]);
	if(numero.tipo==="num"){
		if(comoEntero.tipo==="bool"){
			var temp1=genTemp();
			var temp2=genTemp();

			codigo3D+="//METODO OUTNUM\n";

			codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
			codigo3D+=temp1+"=p+1; //direccion del primer parametro\n";
			codigo3D+="stack["+temp1+"]="+numero.valor+";\n";
			codigo3D+=temp2+"=p+2; //direccion de tipo de num a imprimir\n";
			codigo3D+="stack["+temp2+"]="+comoEntero.valor+";\n";
			codigo3D+="$$_outNum();\n";
			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

			codigo3D+="// FIN METODO OUTNUM\n\n";

		}else{
			addError("Semantico","El segundo parametro del metodo outNum debe ser tipo bool",raiz.linea,raiz.columna);
		}
	}else{
		addError("Semantico","El metodo nativo outNum solo acepta datos tipo Num",raiz.linea,raiz.columna);
	}
}


function primitivaInStr(raiz){
	opA=new aritmetica();
	var varAsignacion;
	var resultado;
	
	var auxAmbito=ambito;
	varAsignacion=accesoAsignacion(raiz.hijos[0]);
	var auxNivel=nivel;
	ambito=auxAmbito;
	
	nivel=0;
	resultado=opA.operar(raiz.hijos[1]);
	nivel=auxNivel;
	ambito=auxAmbito;
	//debugger;

	var temp1;
	var temp2;
	var temp3;
	var temp4;

	var tempDir;
	var tempMsg;

	if(varAsignacion.tipo==="str"){
		//if(resultado.tipo==="str"){
		if(true){
			codigo3D+="//METODO INSTR\n";
			if(varAsignacion.simbolo.inicializado){
				if(nivel==0){
					temp1=genTemp();
					codigo3D+=temp1+"=stack["+varAsignacion.valor+"]; //direccion de la variable\n";
					tempDir=temp1;
				}else{
					tempDir=varAsignacion.valor;
				}
			}else{
				if(nivel==0){
					temp1=genTemp();
					codigo3D+=temp1+"=h;\n";
					codigo3D+="stack["+varAsignacion.valor+"]="+temp1+";\n";
					codigo3D+="h=h+1;\n";
					tempDir=temp1;
				}else{
					tempDir=varAsignacion.valor;
				}
			}

			if(resultado.tipo!="str"){
				tempMsg=0;
				addError("Semantico","El segundo parametro del metodo inStr debe ser tipo str",raiz.linea,raiz.columna);
			}else{
				if(resultado.ref){
					temp2=genTemp();
					codigo3D+=temp2+"heap["+resultado.valor+"];\n";
					tempMsg=temp2;
				}else{
					tempMsg=resultado.valor;
				}
			}
			temp3=genTemp();
			temp4=genTemp();

			codigo3D+="p=p+"+getDesplazamientoP()+";  //cambio de ambito real\n";
			codigo3D+=temp3+"=p+1; //direccion del parametro1\n";
			codigo3D+="stack["+temp3+"]="+tempDir+";\n";


			codigo3D+=temp4+"=p+2; //direccion del parametro2\n";
			codigo3D+="stack["+temp4+"]="+tempMsg+";\n";

			codigo3D+="$$_inStr();\n";
			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

			codigo3D+="//FIN METODO INSTR\n\n";

		}else{
			addError("Semantico","El segundo parametro del metodo inStr debe ser tipo str",raiz.linea,raiz.columna);	
		}
	}else{
		addError("Semantico","La variable que recibe el valor del metodo intStr debe ser tipo str",raiz.linea,raiz.columna);
	}
	
	nivel=0;

	//castearAsignacion(varAsignacion,resultado,raiz);
}


function primitivaInNum(raiz){
	opA=new aritmetica();
	var mensaje=opA.operar(raiz.hijos[0]);
	opA=new aritmetica();
	var defecto=opA.operar(raiz.hijos[1]);


	var tempMsg;
	var tempDefecto;

	var temp1;
	var temp2;

	codigo3D+="//METODO INNUM\n";
	if(mensaje.tipo!="str"){
		tempMsg=0;
		addError("Semantico","El segundo parametro del metodo inStr debe ser tipo str",raiz.linea,raiz.columna);
	}else{
		if(mensaje.ref){
			temp1=genTemp();
			codigo3D+=temp1+"heap["+mensaje.valor+"];\n";
			tempMsg=temp1;
		}else{
			tempMsg=mensaje.valor;
		}
	}

	if(defecto.tipo!="num"){
		tempDefecto=0;
	}else{
		tempDefecto=defecto.valor;
	}


	var temp3=genTemp();
	var temp4=genTemp();
	var temp5=genTemp();
	var temp6=genTemp();

	codigo3D+="p=p+"+getDesplazamientoP()+";  //cambio de ambito real\n";
	codigo3D+=temp3+"=p+1; //direccion del parametro1\n";
	codigo3D+="stack["+temp3+"]="+tempMsg+";\n";


	codigo3D+=temp4+"=p+2; //direccion del parametro2\n";
	codigo3D+="stack["+temp4+"]="+tempDefecto+";\n";

	codigo3D+="$$_inNum();\n";

	codigo3D+=temp5+"=p+0; //direccion de retorno\n";
	codigo3D+=temp6+"=stack["+temp5+"];\n";
	codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

	codigo3D+="//FIN METODO INNUM\n\n";
	return new resultado("num",temp6);
}



function primitivaGetRandom(){

	var temp1=genTemp();
	var temp2=genTemp();
	codigo3D+="p=p+"+getDesplazamientoP()+";\n";
	codigo3D+="$$_getRandom();\n";
	codigo3D+=temp1+"=p+0;\n";
	codigo3D+=temp2+"=stack["+temp1+"];\n";
	codigo3D+="p=p-"+getDesplazamientoP()+";\n";

	return new resultado("num",temp2);
}


function primitivaGetArrLength(raiz){
	
	var auxAmbito=ambito;
	var varAsignacion=accesoAsignacion(raiz.hijos[0]);
	ambito=auxAmbito;

	opA=new aritmetica();
	var resultado1=opA.operar(raiz.hijos[1]);

	var tempRes;
	//debugger;
	if(resultado1.tipo==="num"){
		var indice=Math.trunc(resultado1.valor);
		if(varAsignacion.tipo!=-1){
			if(varAsignacion.simbolo.dimesion!=0){
				if(indice<varAsignacion.simbolo.dimension.length){
					tempRes=varAsignacion.simbolo.dimension[indice];
				}else{
					addError("Semantico","Indice de la dimension invalida",raiz.linea,raiz.columna);
					tempRes=0;
				}
				
			}else{
				addError("Semantico","La variable "+varAsignacion.simbolo.nombre+" no es array",raiz.linea,raiz.columna);
			}
		}else{
			tempRes=0;
		}
	}else{

		tempRes=0;
		addError("Semantico","El segundo parametro del metodo getArrLength debe ser num",raiz.linea,raiz.columna);
	}

	return new resultado("num",tempRes);
}



function primitivaGetStrLength(raiz){
	opA=new aritmetica();
	var resultado1=opA.operar(raiz.hijos[0]);

	var tempRes;
	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	codigo3D+="//METODO GETSTRLENGTH\n";
	if(resultado1.tipo==="str"){
		if(resultado1.ref){
			codigo3D+=temp1+"=heap["+resultado1.valor+"];\n";
			tempRes=temp1;
		}else{
			tempRes=resultado1.valor;
		}
	}else{
		tempRes=0;
	}


	codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
	codigo3D+=temp2+"=p+1; //direccion del parametro\n";
	codigo3D+="stack["+temp2+"]="+tempRes+";\n";
	codigo3D+="$$_getStrLength();\n";
	codigo3D+=temp3+"=p+0; //direccion del retorno\n";
    codigo3D+=temp4+"=stack["+temp3+"];\n";
    codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

	codigo3D+="//METODO GETSTRLENGTH\n";

	return new resultado("num",temp4);
}


function primitivaGetBool(raiz){

	opA=new aritmetica();
	var cadena=opA.operar(raiz.hijos[0]);

	var tempRes=0;

	if(cadena.tipo==="str"){
		var temp1;
		var temp2;
		var temp3;
		var temp4;
		codigo3D+="//METODO GETBOOL\n";
		if(cadena.ref){
			temp1=genTemp();
			temp2=genTemp();
			temp3=genTemp();
			temp4=genTemp();
			codigo3D+=temp1+"=heap["+cadena.valor+"];  //direccion de la cadena\n";

			codigo3D+="p=p+"+getDesplazamientoP()+";  //cambio de ambito real\n";
			codigo3D+=temp2+"=p+1; //direccion del parametro del metodo outStr\n";
			codigo3D+="stack["+temp2+"]="+temp1+";\n";
			codigo3D+="$$_getBool();\n";

			codigo3D+=temp3+"=p+0; //direccion de retorno\n";
			codigo3D+=temp4+"=stack["+temp3+"];\n";

			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

			tempRes=temp4;

		}else{
			temp1=genTemp();
			temp3=genTemp();
			temp4=genTemp();

			codigo3D+="p=p+"+getDesplazamientoP()+";  //cambio de ambito real\n";
			codigo3D+=temp1+"=p+1; //direccion del parametro del metodo outStr\n";
			codigo3D+="stack["+temp1+"]="+cadena.valor+";\n";
			codigo3D+="$$_getBool();\n";

			codigo3D+=temp3+"=p+0; //direccion de retorno\n";
			codigo3D+=temp4+"=stack["+temp3+"];\n";

			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

			tempRes=temp4;
		}
		codigo3D+="//FIN METODO GETBOOL\n\n";
	}else{

		addError("Semantico","El metodo nativo show solo acepta datos tipo str",raiz.linea,raiz.columna);
	}

	return new resultado("bool",tempRes);
}