
var listaConstructores;

function crearConstructores(elements){
	var elementos=[];
	listaConstructores=[];
	for(var i=0;i<elements.length;i++){
		var element=elements[i];
		elementos.push(element);
		
		create(element,elementos);
	}


	for(var i=0;i<listaConstructores.length;i++){
		codigo3D+=listaConstructores[i];
	}
	
}

function create(element,elementos){

	var sentencias=element.hijos[1].hijos;
	var elemento=tabla.getSimbolo(element.hijos[0].valor,ambito);

	var ambitoAux=ambito;

	ambito=[];

	ambito.push(element.hijos[0].valor);
	
	

	codigo3D+="void element_"+element.hijos[0].valor+"(){\n";
	for(var i=0;i<sentencias.length;i++){
		var sentencia=sentencias[i];
		
		switch(sentencia.etiqueta){
			case "primitivaD":
				declaPrimitivaD(sentencia);
				break;
			case "primitivaDA":
				declaPrimitivaDA(sentencia);
				break;
			case "elementDD":
				declaElementDD(sentencia);
				break;
			case "elementDI":
				declaElementDI(sentencia);
				break;
			case "elementD":
				declaElementD(sentencia);
				break;
			case "array":
				declaArray(sentencia);
				break;
			case "element":
				elementos.push(sentencia);
				var auxC3D=codigo3D;
				codigo3D="";
				create(sentencia,elementos);
				listaConstructores.push(codigo3D);
				codigo3D=auxC3D;
				break;
			default:
				break;
		}
	}
	
	codigo3D+="}\n\n";

	ambito.pop();

	ambito=ambitoAux;
}



