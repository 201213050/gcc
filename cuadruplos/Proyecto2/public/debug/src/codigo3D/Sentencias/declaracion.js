
function declararParametros(raiz){

	for(var i=0;i<raiz.hijos.length;i++){
		var parametro=raiz.hijos[i];
		var simbolo=tabla.getSimbolo(parametro.hijos[1].valor,ambito);
		//debugger;
		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",parametro.linea,parametro.columna);
			return;
		}

		simbolo.inicializado=true;
	}
}


function declaracionPrimitivaD(raiz){
	//debugger;
	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}
		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}


		var temp1=genTemp();

		codigo3D+="//DECLARACION\n";
		codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";

		switch(simbolo.tipo){
			case "num":
				codigo3D+="stack["+temp1+"]=0;\n";
				break;
			case "str":
				codigo3D+="stack["+temp1+"]="+nulo+";\n";
				break;
			case "bool":
				codigo3D+="stack["+temp1+"]="+nulo+";\n";
				break;
			default:
				break;
		}

		
		codigo3D+="//FIN DECLARACION\n\n";

	}
}




function declaracionPrimitivaDA(raiz){
	//debugger;
	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		//debugger;
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}

		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}


		opA=new aritmetica();
		var resultado=opA.operar(raiz.hijos[2]);
		castear(simbolo,resultado,id);

	}
}




function declaracionElementDD(raiz){
	//falta verificar si el element existe

	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}

		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}

		var element=tabla.getElement(simbolo,[]);
		if(element==null){
			addError("Semantico","El element "+simbolo.tipo+" no existe",id.linea,id.columna);
			return;
		}


		opA=new aritmetica();
		var resultado=opA.operar(raiz.hijos[2]);
		castear(simbolo,resultado,id);
	}
}

function declaracionElementDI(raiz){
	//falta verificar si el element existe
	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}
		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}

		var element=tabla.getElement(simbolo,[]);
		if(element==null){
			addError("Semantico","El element "+simbolo.tipo+" no existe",id.linea,id.columna);
			return;
		}

		simbolo.inicializado=true;

		var temp1=genTemp();
		var temp2=genTemp();
		var temp3=genTemp();
		var temp4=genTemp();

		codigo3D+="//DECLARACION\n";

		codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
		codigo3D+="stack["+temp1+"]=h;\n";
		codigo3D+=temp2+"=h; //direccion del nuevo objeto\n";
		codigo3D+="h=h+"+element.tamanio+"; //se reserva el espacio para el objeto\n";

		codigo3D+=temp3+"=p+"+getDesplazamientoP()+"; //simulacion d cambio de ambito\n";
		codigo3D+=temp4+"="+temp3+"+0; //direccion del this del constructor\n";
		codigo3D+="stack["+temp4+"]="+temp2+";\n";

		codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
		codigo3D+="element_"+element.nombre+"(); //llamada al constructor del element "+element.nombre+"\n";
		codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

		codigo3D+="//FIN DECLARACION\n\n";

	}
}

function declaracionElementD(raiz){
	//falta verificar si el element existe
	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}
		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}

		var element=tabla.getElement(simbolo,[]);
		if(element==null){
			addError("Semantico","El element "+simbolo.tipo+" no existe",id.linea,id.columna);
			return;
		}

		var temp1=genTemp();

		codigo3D+="//DECLARACION\n";
		codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
		codigo3D+="stack["+temp1+"]="+nulo+";\n";
		codigo3D+="//FIN DECLARACION\n\n";
	}
}

function declaracionArray(raiz){

	
		var id=raiz.hijos[0];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}
		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}

		var temp1=genTemp();
		codigo3D+="//DECLARACION ARRAY\n";
		codigo3D+=temp1+"=p+"+simbolo.direccion+";\n";
		codigo3D+="stack["+temp1+"]=h;\n";

		var tamanio=1;
		for(var i=0;i<simbolo.dimension.length;i++){
			tamanio*=simbolo.dimension[i];
		}

		codigo3D+="h=h+"+tamanio+"; //reservando espacio para el arreglo\n";
		codigo3D+="//FIN DECLARACION ARRAY\n\n";
	
}

























//declaraciones en elements

function declaPrimitivaD(raiz){
	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}
		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}

		var temp1=genTemp();
		var temp2=genTemp();
		var temp3=genTemp();

		codigo3D+="//INICIALIZACION\n";
		codigo3D+=temp1+"=p+0; //puntero del this\n";
		codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
		codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";


		switch(simbolo.tipo){
			case "num":
				codigo3D+="heap["+temp3+"]=0;\n";
				break;
			case "str":
				codigo3D+="heap["+temp3+"]="+nulo+";\n";
				break;
			case "bool":
				codigo3D+="heap["+temp3+"]="+nulo+";\n";
				break;
			default:
				break;
		}
		
		codigo3D+="//FIN INICIALIZACION\n\n";
	}
}




function declaPrimitivaDA(raiz){
	//debugger;
	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		//debugger;
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}

		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}


		opA=new aritmetica();
		var resultado=opA.operar(raiz.hijos[2]);
		castearAtributo(simbolo,resultado,id);

	}
}




function declaElementDD(raiz){
	//falta verificar si el element existe

	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}

		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}


		var element=tabla.getElement(simbolo,ambito);
		if(element==null){
			addError("Semantico","El element "+simbolo.tipo+" no existe",id.linea,id.columna);
			return;
		}

		opA=new aritmetica();
		var resultado=opA.operar(raiz.hijos[2]);
		castearAtributo(simbolo,resultado,id);


	}
}

function declaElementDI(raiz){
	//falta verificar si el element existe

	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}

		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}
		//debugger;
		var element=tabla.getElement(simbolo,ambito);
		if(element==null){
			addError("Semantico","El element "+simbolo.tipo+" no existe",id.linea,id.columna);
			return;
		}

		simbolo.inicializado=true;

		var temp1=genTemp();
		var temp2=genTemp();
		var temp3=genTemp();
		var temp4=genTemp();
		var temp5=genTemp();
		var temp6=genTemp();

		codigo3D+="//INSTANCIA DE ELEMENT\n";
		codigo3D+=temp1+"=p+0; //puntero del this\n";
		codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
		codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
		codigo3D+="heap["+temp3+"]=h; //direccion del nuevo objeto\n";
		codigo3D+=temp4+"=h;\n";
		codigo3D+="h=h+"+element.tamanio+"; //se reserva espacio para el objeto\n";

		codigo3D+=temp5+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
		codigo3D+=temp6+"="+temp5+"+0; //direccion del this\n";
		codigo3D+="stack["+temp6+"]="+temp4+";\n";

		codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
		codigo3D+="element_"+element.nombre+"(); //llamada al constructor del element "+element.nombre+"\n";
		codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

		codigo3D+="//FIN INSTANCIA DE ELEMENT\n\n";

	}
}

function declaElementD(raiz){
	//falta verificar si el element existe
	var listaIds=raiz.hijos[1].hijos;
	for(var i=0;i<listaIds.length;i++){
		var id=listaIds[i];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}

		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}

		
		var element=tabla.getElement(simbolo,ambito);
		if(element==null){
			addError("Semantico","El element "+simbolo.tipo+" no existe",id.linea,id.columna);
			return;
		}

		var temp1=genTemp();
		var temp2=genTemp();
		var temp3=genTemp();

		codigo3D+="//INICIALIZACION\n";
		codigo3D+=temp1+"=p+0; //puntero del this\n";
		codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
		codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
		codigo3D+="heap["+temp3+"]="+nulo+";\n";
		codigo3D+="//FIN INICIALIZACION\n\n";
	}
}

function declaArray(raiz){

	
		var id=raiz.hijos[0];
		var simbolo=tabla.getSimbolo(id.valor,ambito);
		if(simbolo==null){
			return;
		}
		var nuevoSimbolo=tabla.setSimboloDeclarado(simbolo);
		if(nuevoSimbolo==null){
			//addError("Semantico","La variable "+simbolo.nombre+" ya existe",id.linea,id.columna);
			return;
		}

		var temp1=genTemp();
		var temp2=genTemp();
		var temp3=genTemp();

		codigo3D+="//INICIALIZACION ARRAY\n";
		codigo3D+=temp1+"=p+0; //puntero del this\n";
		codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
		codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
		codigo3D+="heap["+temp3+"]=h;\n";
		

		var tamanio=1;
		for(var i=0;i<simbolo.dimension.length;i++){
			tamanio*=simbolo.dimension[i];
		}

		codigo3D+="h=h+"+tamanio+"; //reservando espacio para el arreglo\n";
		codigo3D+="//FIN INICIALIZACION ARRAY\n\n";
}