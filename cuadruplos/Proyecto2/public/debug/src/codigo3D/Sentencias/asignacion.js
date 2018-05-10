

function asignacion(raiz){

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
	castearAsignacion(varAsignacion,resultado,raiz);
	nivel=0;


}

var ambitoAux;
function asignacionElement(raiz){
	opA=new aritmetica();
	ambitoAux=ambito;
	var varAsignacion=accesoAsignacion(raiz.hijos[0]);
	
		var element=tabla.getElement(varAsignacion.simbolo,ambito);
		if(element==null){
			ambito=ambitoAux;
			addError("Semantico","El element "+varAsignacion.simbolo.tipo+" no existe",raiz.linea,raiz.columna);
			return;
		}



		varAsignacion.simbolo.inicializado=true;

		//var temp1=genTemp();
		var temp2=genTemp();
		var temp3=genTemp();
		var temp4=genTemp();

		codigo3D+="//DECLARACION\n";
		if(nivel==0){
			//temp1=varAsignacion.valor;
			codigo3D+="stack["+varAsignacion.valor+"]=h; //direccion "+varAsignacion.simbolo.nombre+"\n";
			codigo3D+=temp2+"=h; //direccion del nuevo objeto\n";
		}else{
			codigo3D+="heap["+varAsignacion.valor+"]=h; //direccion "+varAsignacion.simbolo.nombre+"\n";
			codigo3D+=temp2+"=h; //direccion del nuevo objeto\n";
		}

		

		//codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";

		//codigo3D+="stack["+temp1+"]=h;\n";

		//codigo3D+=temp2+"=h; //direccion del nuevo objeto\n";

		codigo3D+="h=h+"+element.tamanio+"; //se reserva el espacio para el objeto\n";

		codigo3D+=temp3+"=p+"+getDesplazamientoP()+"; //simulacion d cambio de ambito\n";
		codigo3D+=temp4+"="+temp3+"+0; //direccion del this del constructor\n";
		codigo3D+="stack["+temp4+"]="+temp2+";\n";

		codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
		codigo3D+="element_"+element.nombre+"(); //llamada al constructor del element "+element.nombre+"\n";
		codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

		codigo3D+="//FIN DECLARACION\n\n";

		nivel=0;
	 	ambito=ambitoAux;
}









function accesoAsignacion(raiz){
	var simbolo;
	var dir;

	var temp1;
	var temp2;
	var temp3;

	var temp4;
	var temp5;
	var temp6;
	var posicion;

	var resultado1=new resultado(-1,null);
	for(var i=0;i<raiz.hijos.length;i++){
		aux=simbolo;
		var acceso=raiz.hijos[i];
		switch(acceso.etiqueta){
			case "accesoId":
				/*if(simbolo!=null){
					if(!simbolo.inicializado){
						addError("Semantico","La variable "+simbolo.nombre+" no ha sido inicializada",acceso.linea,acceso.columna);
						return new resultado(-1,null);
					}
				}*/
				//debugger;
				simbolo=tabla.getSimboloDeclarado(acceso.hijos[0].valor,ambito);

				if(simbolo==null){
					addError("Semantico","La variable "+acceso.hijos[0].valor+" no existe",acceso.linea,acceso.columna);
					return new resultado(-1,null);
				}
				//debugger;
				if(nivel==0){
					temp1=genTemp();
					if(simbolo.ambito==="global"){
						codigo3D+=temp1+"="+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";

					}else{
						codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";						
					}
					
					if(i!=raiz.hijos.length-1){
						temp2=genTemp();
						codigo3D+=temp2+"=stack["+temp1+"]; \n\n";
						temp3=temp2;
					}else{
						temp3=temp1;
					}
					

					resultado1=new resultado(simbolo.tipo,temp3,true);
					resultado1.simbolo=simbolo;
				}else{
					temp1=genTemp();
					codigo3D+=temp1+"="+temp3+"+"+simbolo.direccion+"; //direccion ea de "+simbolo.nombre+"\n";
					
					if(i!=raiz.hijos.length-1){
						temp2=genTemp();
						codigo3D+=temp2+"=heap["+temp1+"]; \n\n";
						temp3=temp2;
					}else{
						temp3=temp1;
					}

					/*
					if(simbolo.tipo!="str"){
						temp2=genTemp();
						codigo3D+=temp2+"=heap["+temp1+"]; \n\n";
						temp3=temp2;
					}else{
						temp3=temp1;
					}
					*/
					
					resultado1=new resultado(simbolo.tipo,temp1,true);
					resultado1.simbolo=simbolo;
				}

				if(i==0){
					ambito=[];
				}

				if((simbolo.tipo!="num"||simbolo.tipo!="str"||simbolo.tipo!="bool")&&i!=raiz.hijos.length-1){
					nivel++;
					var element=tabla.getElement(simbolo,ambito);
					ambito=[];
					if(element==null){
						addError("Semantico","No existe el element "+simbolo.tipo,acceso.linea,acceso.columna);
					 	return new resultado(-1,null);
					}
					
					ambito.push(simbolo.tipo);
				}

				break;
			case "llamada":
				var resultado1=llamadaMetodo(acceso);
				var metodo=resultado1.simbolo;
				temp3=resultado1.valor;
				//debugger;
				ambito=[];
				if(!(metodo.tipo==="num"||metodo.tipo==="str"||metodo.tipo==="bool")){
					nivel++;
					var element=tabla.getElement(metodo,ambito);
					if(element==null){
						addError("Semantico","No existe el element "+metodo.tipo,acceso.linea,acceso.columna);
					 	return new resultado(-1,null);
					}
					ambito.push(metodo.tipo);
					resultado1.ref=true;
				}else{
					if(metodo.dimension>0){

					}
				}

				break;
			case "accesoArray":
				
				if(simbolo!=null){
					if(!simbolo.inicializado){
						addError("Semantico","La variable "+simbolo.nombre+" no ha sido inicializada",acceso.linea,acceso.columna);
						return new resultado(-1,null);
					}
				}

				simbolo=tabla.getSimboloDeclarado(acceso.hijos[0].valor,ambito);
				if(simbolo==null){
					addError("Semantico","La variable "+acceso.hijos[0].valor+" no existe",acceso.linea,acceso.columna);
					return new resultado(-1,null);
				}

				if(simbolo.dimension==0){
					addError("Semantico","La variable "+simbolo.nombre+" no es array",acceso.linea,acceso.columna);
					return new resultado(-1,null);
				}

				if(nivel==0){
					temp1=genTemp();
					if(simbolo.ambito==="global"){
						codigo3D+=temp1+"="+simbolo.direccion+";\n";
					}else{
						codigo3D+=temp1+"=p+"+simbolo.direccion+";\n";
					}
					temp2=genTemp();
					codigo3D+=temp2+"=stack["+temp1+"]; //direccion de "+simbolo.nombre+" \n\n";
					temp3=temp2;
					resultado1=new resultado(simbolo.tipo,temp3,true);
					resultado1.simbolo=simbolo;
				}else{
					temp1=genTemp();
					codigo3D+=temp1+"="+temp3+"+"+simbolo.direccion+";\n";
					temp2=genTemp();
					codigo3D+=temp2+"=heap["+temp1+"]; //direccion de "+simbolo.nombre+"\n\n";
					temp3=temp2;
					resultado1=new resultado(simbolo.tipo,temp3,true);
					resultado1.simbolo=simbolo;
				}

				var indices=acceso.hijos[1].hijos;
				codigo3D+="//POSICION LINEALIZADA\n";
				for(var j=0;j<indices.length;j++){
					var indice=indices[j];
					var inf=simbolo.nodo.hijos[j].hijos[0].valor;
					var sup=simbolo.nodo.hijos[j].hijos[1].valor;
					opA=new aritmetica();
					var valorIndice=opA.operar(indice);

					//codigo 3D
					if(j==0){
						temp1=genTemp();
						codigo3D+=temp1+"="+valorIndice.valor+"-"+inf+";\n";
						posicion=temp1;
					}else{
						temp1=genTemp();
						temp2=genTemp();
						temp4=genTemp();
						codigo3D+=temp1+"="+posicion+"*"+(sup-inf)+";\n";
						codigo3D+=temp2+"="+temp1+"+"+valorIndice.valor+";\n"
						codigo3D+=temp4+"="+temp2+"-"+inf+";\n";
						posicion=temp4;
					}

				}
				temp5=genTemp();
				

				codigo3D+=temp5+"="+temp3+"+"+posicion+"; //posicion absoluta\n";
				/*
				if(simbolo.tipo==="num"||simbolo.tipo==="bool"){
					temp6=genTemp();
					codigo3D+=temp6+"=heap["+temp5+"];\n";
				}else{
					temp6=temp5;
				}*/

				codigo3D+="//FIN POSICION LINEALIZADA\n\n";

				resultado1=new resultado(simbolo.tipo,temp5,true);
				simbolo.posicionArreglo=true;
				resultado1.simbolo=simbolo;
				break;
		}
	}
	
	
	return resultado1;
}






function llamadaMetodoAsignacion(raiz){
	var temp1;
	var temp2;
	var temp3;
	var temp4;
	var temp5;
	var temp6;
	var temp7;

	var idMetodo=generarId(raiz);
	var metodoLLamado=tabla.getSimbolo(idMetodo,[]);

	if(metodoLLamado==null){
		addError("Semantico","El metodo "+idMetodo+" no existe",raiz.linea,raiz.columna);
		return new resultado(-1,null);
	}

	//faltan validaciones
	codigo3D+="//LLAMADA A METODO\n";
	var parametros=metodoLLamado.nodo.hijos[2].hijos;
	var valorParametros=raiz.hijos[1].hijos;
    var ambitoAux=[idMetodo];
	for(var i=0;i<parametros.length;i++){
		var parametro=tabla.getSimbolo(parametros[i].hijos[1].valor,ambitoAux);
		opA=new aritmetica();
		var valor=opA.operar(valorParametros[i]);

		temp1=genTemp();
		codigo3D+=temp1+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
		//debugger;
		if(parametro.tipo==="str"){
			if(parametro.ref||parametro.dimension!=0){
				temp2=genTemp();
				codigo3D+="//PARAMETRO POR REFERENCIA\n";
				codigo3D+=temp2+"="+temp1+"+"+parametro.direccion+"; //direccion del parametro "+parametro.nombre+" \n";
				
				if(!valor.ref){
					codigo3D+="heap[h]="+valor.valor+";\n";
					codigo3D+="stack["+temp2+"]=h;\n";
					codigo3D+="h=h+1;\n";
				}else{
					codigo3D+="stack["+temp2+"]="+valor.valor+";\n";
				}

				codigo3D+="//FIN PARAMETRO POR REFERENCIA\n";
			}else{
				temp2=genTemp();
				
				codigo3D+="///PARAMETRO POR VALOR\n";
				codigo3D+=temp2+"="+temp1+"+"+parametro.direccion+"; //direccion del parametro "+parametro.nombre+" \n";
				
				if(valor.ref){
					temp3=genTemp();
					temp4=genTemp();

					codigo3D+=temp3+"=heap["+valor.valor+"];\n";
					codigo3D+=temp4+"=h;\n";
					codigo3D+="heap["+temp4+"]="+temp3+";\n";
					codigo3D+="h=h+1;\n";
				}else{
					temp4=genTemp();
					codigo3D+=temp4+"=h;\n";
					codigo3D+="heap["+temp4+"]="+valor.valor+";\n";
					codigo3D+="h=h+1;\n";
				}

				
				codigo3D+="stack["+temp2+"]="+temp4+";\n";
				codigo3D+="//FIN PARAMETRO POR VALOR\n";
			}
		}else{
			temp2=genTemp();
			codigo3D+="//PARAMETRO POR REFERENCIA/NUM VALOR\n";
			codigo3D+=temp2+"="+temp1+"+"+parametro.direccion+"; //direccion del parametro "+parametro.nombre+" \n";
			codigo3D+="stack["+temp2+"]="+valor.valor+";\n";
			codigo3D+="//FIN PARAMETRO POR REFERENCIA/NUM VALOR\n";
		}

	}

	codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
	codigo3D+=idMetodo+"();\n";
	temp3=genTemp();
	codigo3D+=temp3+"=p+0; //direcion de return\n";
	temp4=genTemp();
	codigo3D+=temp4+"=stack["+temp3+"]; //valor de return\n";
	codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito acutal\n";

	codigo3D+="//FIN LLAMADA A METODO\n\n";

	var resultado1=new resultado(metodoLLamado.tipo,temp4);
	resultado1.simbolo=metodoLLamado;
	return resultado1;
}