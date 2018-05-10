

function controlIf(raiz){
	

	var condicion=raiz.hijos[0];
	opL=new logica();
	var salidaIf=genEti();

	codigo3D+="//CONTROLIF\n";
	
	var resultadoCondicion=opL.operar(condicion);
	codigo3D+=resultadoCondicion.etiV+":\n";
	ambito.push(tabla.generarIdSent("if"));
	compilador.ejecutar(raiz.hijos[1]);
	codigo3D+="goto "+salidaIf+";\n";
	codigo3D+=resultadoCondicion.etiF+":\n";
	codigo3D+=salidaIf+":\n";

	codigo3D+="//FIN CONTROLIF\n\n";

	ambito.pop();
}

function controlIfElse(raiz){
	

	var condicion=raiz.hijos[0];
	opL=new logica();
	var salidaIf=genEti();

	codigo3D+="//CONTROLIFELSE\n";
	
	var resultadoCondicion=opL.operar(condicion);

	codigo3D+=resultadoCondicion.etiV+":\n";
	ambito.push(tabla.generarIdSent("if"));
	compilador.ejecutar(raiz.hijos[1]);
	ambito.pop();
	codigo3D+="goto "+salidaIf+";\n";
	codigo3D+=resultadoCondicion.etiF+":\n";
	ambito.push(tabla.generarIdSent("else"));
	compilador.ejecutar(raiz.hijos[2]);
	ambito.pop();
	codigo3D+=salidaIf+":\n";

	codigo3D+="//FIN CONTROLIFELSE\n\n";

	
}

function controlSwitch(raiz){
	var nodoCondicion=raiz.hijos[0];
	var modo=raiz.hijos[1];
	var nodoCasos=raiz.hijos[2];
	var nodoDefecto=raiz.hijos[3];

	
	var etiModo1=genEti();
	var etiModo2=genEti();
	var etiSalidaFinal=genEti();
	var tempEstado=genTemp();

	pilaSalidas.push(etiSalidaFinal);
	//opA=new aritmetica();
	//debugger;
	//var resultado1=opA.operar(modo);
	codigo3D+=tempEstado+"=0;\n";
	//codigo3D+="if("+resultado1.valor+"==1) goto "+etiModo1+";\n";
	//codigo3D+="goto "+etiModo2+";\n";

if(modo.valor==="true"){

	codigo3D+=etiModo1+": //modo ciclo\n";

	var etiEntrada=genEti();
	//var auxContador=tabla.contadorCase;
	for(var i=0;i<nodoCasos.hijos.length;i++){
		
		var nuevaCondicion=crearNodo("==",0,0);
		nuevaCondicion.add(nodoCasos.hijos[i].hijos[0]);
		nuevaCondicion.add(nodoCondicion);

		if(nodoCasos.hijos[i].etiqueta=="default"){
			ambito.push(tabla.generarIdSent("case"));
			codigo3D+=etiEntrada+":\n";
			var etiDefault=genEti();
			codigo3D+="if("+tempEstado+"==0) goto "+etiDefault+";\n";
			codigo3D+="goto "+etiSalidaFinal+";\n";

			codigo3D+=etiDefault+":\n";
			//ejecutar default
			compilador.ejecutar(nodoCasos.hijos[i].hijos[1]);
			codigo3D+="goto "+etiSalidaFinal+";\n";
			ambito.pop();
		}else{
			ambito.push(tabla.generarIdSent("case"));
			codigo3D+=etiEntrada+":\n";
			opL=new logica();
			var resultado2=opL.operar(nuevaCondicion);
			codigo3D+=resultado2.etiV+":\n";
			etiEntrada=resultado2.etiF;
			codigo3D+=tempEstado+"=1;\n";
			//ejecutar
			compilador.ejecutar(nodoCasos.hijos[i].hijos[1]);
			codigo3D+="goto "+etiModo1+";\n";
			ambito.pop();
		}

	}

}else{



	codigo3D+=etiModo2+":\n";
	//codigo3D+=tempEstado+"=0;\n";

	var etiEntrada=genEti();
	//tabla.contadorCase=auxContador;
	for(var i=0;i<nodoCasos.hijos.length;i++){
		
		var nuevaCondicion=crearNodo("==",0,0);
		nuevaCondicion.add(nodoCasos.hijos[i].hijos[0]);
		nuevaCondicion.add(nodoCondicion);

		if(nodoCasos.hijos[i].etiqueta=="default"){
			ambito.push(tabla.generarIdSent("case"));
			codigo3D+=etiEntrada+":\n";
			var etiDefault=genEti();
			codigo3D+="if("+tempEstado+"==0) goto "+etiDefault+";\n";
			codigo3D+="goto "+etiSalidaFinal+";\n";

			codigo3D+=etiDefault+":\n";
			//ejecutar default
			compilador.ejecutar(nodoCasos.hijos[i].hijos[1]);
			codigo3D+="goto "+etiSalidaFinal+";\n";
			ambito.pop();
		}else{
			ambito.push(tabla.generarIdSent("case"));
			codigo3D+=etiEntrada+":\n";
			opL=new logica();
			var resultado2=opL.operar(nuevaCondicion);
			codigo3D+=resultado2.etiV+":\n";
			etiEntrada=resultado2.etiF;
			codigo3D+=tempEstado+"=1;\n";
			//ejecutar
			compilador.ejecutar(nodoCasos.hijos[i].hijos[1]);
			//codigo3D+="goto "+etiSalidaFinal+";\n";
			ambito.pop();
		}

	}
	
	}
	codigo3D+=etiSalidaFinal+":\n";


	pilaSalidas.pop();
}



function cicloWhile(raiz){
	var eti1=genEti();

	opL=new logica();

	codigo3D+="//CICLO WHILE\n";
	
	codigo3D+=eti1+":\n";
	
	var condicion=opL.operar(raiz.hijos[0]);
	codigo3D+=condicion.etiV+":\n";
	//--------------------------------------------------------------
	pilaSalidas.push(condicion.etiF);
	pilaEntradas.push(eti1);
	//---------------------------------------------------------------
	ambito.push(tabla.generarIdSent("while"));
	compilador.ejecutar(raiz.hijos[1]);
	codigo3D+="goto "+eti1+";\n";
	

	codigo3D+="//FIN CICLO WHILE\n";
	codigo3D+=condicion.etiF+":\n\n";

	ambito.pop();
	//-----------------------------------------------------------
	pilaSalidas.pop();
	pilaEntradas.pop();
	//------------------------------------------------------------
	
}



function cicloDoWhile(raiz){

	/*
	do{
	
	}while(true);

	*/

	var strAmbito=tabla.generarIdSent("doWhile");

	var eti1="entrada53226811201213402"+strAmbito;
	var etiSalida="salida53226811201213402"+strAmbito;

	opL=new logica();

	codigo3D+="//CICLO DOWHILE\n";
	
	codigo3D+=eti1+":\n";
	ambito.push(strAmbito);
	//--------------------------------------------------------------
	pilaSalidas.push(etiSalida);
	pilaEntradas.push(eti1);
	//------------------------------------------------------------
	compilador.ejecutar(raiz.hijos[1]);
	
	var condicion=opL.operar(raiz.hijos[0]);
	//pilaSalidas.push(condicion.etiF);
	

	codigo3D+="//FIN CICLO DOWHILE\n";
	codigo3D+=condicion.etiF+":\n\n";

	codigo3D=codigo3D.replace(etiSalida,condicion.etiF);
	codigo3D=codigo3D.replace(eti1,condicion.etiV);

	ambito.pop();
	//--------------------------------------------------------------
	pilaSalidas.pop();
	pilaEntradas.pop();
    //---------------------------------------------------------------
	
}

function cicloRepeatUntil(raiz){

		/*
	do{
	
	}while(true);

	*/

	var strAmbito=tabla.generarIdSent("repeat");

	var eti1="entrada53226811201213402"+strAmbito;
	var etiSalida="salida53226811201213402"+strAmbito;

	opL=new logica();

	codigo3D+="//CICLO REPEAT\n";
	
	codigo3D+=eti1+":\n";
	ambito.push(strAmbito);
	//--------------------------------------------------------------
	pilaSalidas.push(etiSalida);
	pilaEntradas.push(eti1);
	//------------------------------------------------------------
	compilador.ejecutar(raiz.hijos[1]);
	
	var condicion=opL.operar(raiz.hijos[0]);


	codigo3D+="//FIN CICLO REPEAT\n";
	codigo3D+=condicion.etiV+":\n\n";

	codigo3D=codigo3D.replace(etiSalida,condicion.etiV);
	codigo3D=codigo3D.replace(eti1,condicion.etiF);

	ambito.pop();
	//--------------------------------------------------------------
	pilaSalidas.pop();
	pilaEntradas.pop();
    //---------------------------------------------------------------
	
}



function cicloLoop(raiz){
	var id=raiz.hijos[0].valor;
	var sentencias=raiz.hijos[1];

	var etiEntrada=genEti();
	var etiSalida;

	etiEntrada+="_"+id;
	etiSalida="loop_"+id;

	var strAmbito=tabla.generarIdSent("loop");

	codigo3D+="//CICLO LOOP\n";
	codigo3D+=etiEntrada+":\n";

	ambito.push(strAmbito);
	pilaEntradas.push(etiEntrada);
	pilaSalidas.push(etiSalida);

	compilador.ejecutar(sentencias);

	codigo3D+="goto "+etiEntrada+";\n"
	codigo3D+="//FIN CICLO LOOP\n";
	codigo3D+=etiSalida+":\n\n";
	

	ambito.pop();
	pilaSalidas.pop();
	pilaSalidas.pop();
}


function cicloCount(raiz){
	

	opA=new aritmetica();

	var resultado1=opA.operar(raiz.hijos[0]);
	if(resultado1.tipo=="num"){
		var eti1=genEti();
		var eti2=genEti();
		var eti3=genEti();
		codigo3D+="//CICLO COUNT\n";
		var temp1=genTemp();
		codigo3D+=temp1+"="+resultado1.valor+";\n";
		
		codigo3D+=eti1+":\n";
		
		codigo3D+="if("+temp1+">0) goto "+eti2+";\n";
		codigo3D+="goto "+eti3+";\n";

		codigo3D+=eti2+":\n";
		//--------------------------------------------------------------
		pilaSalidas.push(eti3);
		pilaEntradas.push(eti1);
		codigo3D+=temp1+"="+temp1+"-1;\n";
		//---------------------------------------------------------------
		ambito.push(tabla.generarIdSent("count"));
		compilador.ejecutar(raiz.hijos[1]);
		codigo3D+="goto "+eti1+";\n";
		

		codigo3D+="//FIN CICLO COUNT\n";
		codigo3D+=eti3+":\n\n";

		ambito.pop();
		//-----------------------------------------------------------
		pilaSalidas.pop();
		pilaEntradas.pop();
		//------------------------------------------------------------
	}else{
		addError("Semantico","El valor del ciclo count debe ser tipo num",raiz.linea,raiz.columna);
	}
	
}


function cicloDoWhilex(raiz){

	var condicion1;
	var condicion2;

	var condicion3;
	var condicion4;

	var etiEntrada;

 	



	codigo3D+="//CICLO DOWHILEX\n";
	etiEntrada=genEti();
	codigo3D+=etiEntrada+":\n";
	opL=new logica();
	condicion1=opL.operar(raiz.hijos[0]);


	codigo3D+=condicion1.etiF+":\n";

	opL=new logica();
	condicion2=opL.operar(raiz.hijos[1]);

	//-----------------------------------------------
	ambito.push(tabla.generarIdSent("doWhilex"));
	pilaEntradas.push(etiEntrada);
	pilaSalidas.push(condicion2.etiF);
	//-----------------------------------------------

	codigo3D+=condicion1.etiV+","+condicion2.etiV+":\n";

	compilador.ejecutar(raiz.hijos[2]);

	var eti1=genEti();
	codigo3D+="goto "+eti1+";\n";
	codigo3D+=eti1+":\n";

	opL=new logica();
	condicion3=opL.operar(raiz.hijos[0]);

	codigo3D+=condicion3.etiV+":\n";

	opL=new logica();
	condicion4=opL.operar(raiz.hijos[1]);

	codigo3D+=condicion4.etiV+":\n";

	compilador.ejecutar(raiz.hijos[2]);

	codigo3D+="goto "+eti1+";\n";

	codigo3D+="//FIN CICLO DOWHILEX\n\n";
	codigo3D+=condicion2.etiF+","+condicion3.etiF+","+condicion4.etiF+":\n";

	//-----------------------------------------------
	ambito.pop();
	pilaEntradas.pop();
	pilaSalidas.pop();
	//-----------------------------------------------

}


function cicloFor(raiz){

	var variable=raiz.hijos[0];
	var nodoCondicion=raiz.hijos[1];
	var nodoAsignacion=raiz.hijos[2];
	var sentencias=raiz.hijos[3];

	ambito.push(tabla.generarIdSent("for"));
	if(variable.etiqueta==="primitivaDA"){
		declaracionPrimitivaDA(variable);
	}else{
		asignacion(variable);
	}

	var etiEntrada=genEti();
	var etiEntrada2=genEti();

	codigo3D+="//INICIO CICLO FOR\n";
	codigo3D+=etiEntrada+":\n";
	opL=new logica();
	var condicion=opL.operar(nodoCondicion);

	pilaSalidas.push(condicion.etiF);
	pilaEntradas.push(etiEntrada2);

	codigo3D+=condicion.etiV+":\n";
	ambito.push("cuerpo");
	compilador.ejecutar(sentencias);
	ambito.pop();

	codigo3D+=etiEntrada2+":\n";
	if(nodoAsignacion.etiqueta==="asignacionFor"){
		//debugger;
		asignacion(nodoAsignacion);
	}else{
		addError("Semantico","En el ciclo for solo se puede asignar una variable tipo num",nodoAsignacion.linea,nodoAsignacion.columna);
	}
	codigo3D+="//FIN CICLO FOR\n";
	codigo3D+="goto "+etiEntrada+";\n";
	codigo3D+=condicion.etiF+":\n";

	ambito.pop();
	pilaSalidas.pop();
	pilaEntradas.pop();
}




function controlBreak(raiz){

	if(raiz.etiqueta==="break"){//solo break;
		var etiSalida=getSalidaTop();
		if(etiSalida!=null){
			codigo3D+="//BREAK\n";
			codigo3D+="goto "+etiSalida+";\n";
			codigo3D+="//FIN BREAK\n\n";
		}else{
			addError("Semantico","La sentencia break solo es permitida en ciclos y en cases",raiz.linea,raiz.columna);
		}

	}else{//si es break id;
		var id=raiz.hijos[0].valor;
		var loopId=getLoopId("loop_"+id);
		if(loopId!=null){
			codigo3D+="//BREAK LOOP ID\n";
			codigo3D+="goto "+loopId+";\n";
			codigo3D+="//FIN BREAK LOOP ID\n\n";
		}else{
			var etiDefecto=getSalidaTop();
			if(etiDefecto!=null){
				codigo3D+="//BREAK LOOP ID\n";
				codigo3D+="goto "+etiDefecto+";\n";
				codigo3D+="//FIN BREAK LOOP ID\n\n";
			}else{
				addError("Semantico","La sentencia break solo es permitida en ciclos y cases",raiz.linea,raiz.columna);
			}
		}
	}
}


function getSalidaTop(){
	if(pilaSalidas.length==0){
		return null;
	}
	return pilaSalidas[pilaSalidas.length-1];
}

function getEntradaTop(){
	if(pilaEntradas.length==0){
		return null;
	}
	return pilaEntradas[pilaEntradas.length-1];
}

function getLoopId(id){

	for(var i=0;i<pilaSalidas.length;i++){
		if(id===pilaSalidas[i]){
			return pilaSalidas[i];
		}
	}
	return null;
}

function controlContinue(raiz){
	var etiEntrada=getEntradaTop();
	if(etiEntrada!=null){
		codigo3D+="//CONTINUE\n";
		codigo3D+="goto "+etiEntrada+";\n";
		codigo3D+="//FIN CONTINUE\n\n";
	}else{
		addError("Semantico","La sentencia continue solo es permitida en ciclos",raiz.linea,raiz.columna);
	}
}




function crearExcepcion(raiz){


	var temp1=genTemp();
    		codigo3D+=temp1+"=p+"+getDesplazamientoP()+";\n";
    		var temp2=genTemp();
    		codigo3D+=temp2+"="+temp1+"+1;\n";
    		codigo3D+="stack["+temp2+"]="+raiz.hijos[0].valor+";\n";
    		codigo3D+="p=p+"+getDesplazamientoP()+";\n";
    		codigo3D+="exit();\n";
    		codigo3D+="p=p-"+getDesplazamientoP()+";\n";
    		codigo3D+="goto "+etiquetaReturn+";\n";

	/*
    switch(raiz.hijos[0].valor){
    	case 102:
    		var temp1=genTemp();
    		codigo3D+=temp1+"=p+"+getDesplazamientoP()+";\n";
    		var temp2=genTemp();
    		codigo3D+=temp2+"="+temp1+"+1;\n";
    		codigo3D+="stack["+temp2+"]=102;\n";
    		codigo3D+="p=p+"+getDesplazamientoP()+";\n";
    		codigo3D+="exit();\n";
    		codigo3D+="p=p-"+getDesplazamientoP()+";\n";
    		codigo3D+="goto "+etiquetaReturn+";\n";
    		break;
    	case 243:
    		break;
    	case 396:
    		break;
    	case 624:
    		break;
    	case 789:
    		break;
    	case 801:
    		break;
    }*/
}