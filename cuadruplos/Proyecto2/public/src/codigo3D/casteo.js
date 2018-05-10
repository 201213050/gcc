

function castear(simbolo,resultado,raiz){
	var estructura=getEstructura();
	var puntero=getPuntero();
	var temp1;
	var temp2;
	var temp3;
	var temp4;
	var temp5;

	switch(simbolo.tipo){
		case  "num":
			switch(resultado.tipo){
				case  "num":
					
					temp1=genTemp();

					codigo3D+="//DECLARACION\n";
					codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
					codigo3D+="//FIN DECLARACION\n\n";

					simbolo.inicializado=true;
					break;
				case "str":
					//error
					addError("Semantico","un numero no puede ser str, por favor use algun casteo explicito",raiz.linea,raiz.columna);
					break;
				case "bool":
					temp1=genTemp();

					codigo3D+="//DECLARACION\n";
					codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
					codigo3D+="//FIN DECLARACION\n\n";

					simbolo.inicializado=true;

					break;
				case "null":
					
					temp1=genTemp();

					codigo3D+="//DECLARACION\n";
					codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
					codigo3D+="//FIN DECLARACION\n\n";


					break;
				default:
				    
					addError("Semantico","La variable "+simbolo.nombre +" no es tipo "+resultado.tipo,raiz.linea,raiz.columna);
					break;
			}
			break;
		case "str":
			switch(resultado.tipo){
				case  "num":

					//temp1=genTemp();
					temp2=genTemp();

					temp1=numToStr(resultado);
					codigo3D+="//DECLARACION\n";	

					codigo3D+=temp2+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp2+"]=h;\n";
					codigo3D+="heap[h]="+temp1+";\n";
					codigo3D+="h=h+1;\n";

					codigo3D+="//FIN DECLARACION\n\n";

					simbolo.inicializado=true;

					break;
				case "str":
					temp2=genTemp();
					temp3=genTemp();
					codigo3D+="//DECLARACION\n";	

					codigo3D+=temp2+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp2+"]=h;\n";

					if(resultado.ref){
						codigo3D+=temp3+"=heap["+resultado.valor+"];\n";
						codigo3D+="heap[h]="+temp3+";\n";
					}else{
						codigo3D+="heap[h]="+resultado.valor+";\n";
					}

					codigo3D+="h=h+1;\n";

					codigo3D+="//FIN DECLARACION\n\n";

					simbolo.inicializado=true;

					break;
				case "bool":
					//temp1=genTemp();
					temp2=genTemp();

					temp1=boolToStr(resultado);
					codigo3D+="//DECLARACION\n";	

					codigo3D+=temp2+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp2+"]=h;\n";
					codigo3D+="heap[h]="+temp1+";\n";
					codigo3D+="h=h+1;\n";

					codigo3D+="//FIN DECLARACION\n\n";

					simbolo.inicializado=true;

					break;
				case "null":
					temp2=genTemp();
					codigo3D+="//DECLARACION\n";	

					codigo3D+=temp2+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp2+"]=h;\n";
					codigo3D+="heap[h]="+resultado.valor+";\n";
					codigo3D+="h=h+1;";

					codigo3D+="//FIN DECLARACION\n\n";
					break;
				default:
				    
					addError("Semantico","La variable "+simbolo.nombre +" no es tipo "+resultado.tipo,raiz.linea,raiz.columna);
					break;
			}
			break;
		case "bool":
			switch(resultado.tipo){
				case  "num":
					temp1=genTemp();

					codigo3D+="//DECLARACION\n";
					codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
					codigo3D+="//FIN DECLARACION\n\n";

					simbolo.inicializado=true;

					break;
				case "str":
					//error
					
					addError("Semantico","un bool no puede ser str, por favor use algun casteo explicito",raiz.linea,raiz.columna);
					break;
				case "bool":
					temp1=genTemp();

					codigo3D+="//DECLARACION\n";
					codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
					codigo3D+="//FIN DECLARACION\n\n";

					simbolo.inicializado=true;

					break;
				case "null":
					temp1=genTemp();

					codigo3D+="//DECLARACION\n";
					codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
					codigo3D+="//FIN DECLARACION\n\n";
					break;
				default:
					
					addError("Semantico","La variable "+simbolo.nombre +" no es tipo "+resultado.tipo,raiz.linea,raiz.columna);
					break;
			}
			break;
		default://es es un element
			switch(resultado.tipo){
				case "num":
				case "str":
				case "bool":
					
					addError("Semantico","Un element no puede ser str/num/bool",raiz.linea,raiz.columna);
					break;
				case "null":
					temp1=genTemp();

					codigo3D+="//DECLARACION\n";
					codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
					codigo3D+="//FIN DECLARACION\n\n";


					break;

				default:
					if(simbolo.tipo===resultado.tipo){
						temp1=genTemp();

						codigo3D+="//DECLARACION\n";
						codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
						codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
						codigo3D+="//FIN DECLARACION\n\n";

						simbolo.inicializado=true;

					}else{
						//error
						
					}
					break;
			}
			break;
	}
}



function castearAtributo(simbolo,resultado,raiz){
	var estructura=getEstructura();
	var puntero=getPuntero();
	var temp1;
	var temp2;
	var temp3;
	var temp4;
	var temp5;


	switch(simbolo.tipo){
		case  "num":
			switch(resultado.tipo){
				case  "num":					
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();

					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
					codigo3D+="//FIN INICIALIZACION\n\n";

					simbolo.inicializado=true;

					break;
				case "str":
					//error
					
					addError("Semantico","un numero no puede ser str, por favor use algun casteo explicito",raiz.linea,raiz.columna);
					break;
				case "bool":
					
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();

					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
					codigo3D+="//FIN INICIALIZACION\n\n";

					simbolo.inicializado=true;

					break;
				case "null":
					
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();

					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
					codigo3D+="//FIN INICIALIZACION\n\n";
					break;
				default:
					break;
			}
			break;
		case "str":
			switch(resultado.tipo){
				case  "num":
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();
					temp4=numToStr(resultado);
					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+temp4+";\n";

					codigo3D+="//FIN INICIALIZACION\n\n";

					simbolo.inicializado=true;

					break;
				case "str":
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();
					temp4=genTemp();
					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					

					if(resultado.ref){
						codigo3D+=temp4+"=heap["+resultado.valor+"];\n";
						codigo3D+="heap["+temp3+"]="+temp4+";\n";
					}else{
						codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
					}

					codigo3D+="//FIN INICIALIZACION\n\n";

					simbolo.inicializado=true;

					break;
				case "bool":
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();
					temp4=boolToStr(resultado);
					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+temp4+";\n";

					codigo3D+="//FIN INICIALIZACION\n\n";

					simbolo.inicializado=true;

					break;
				case "null":
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();
					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";

					codigo3D+="//FIN INICIALIZACION\n\n";
					break;
				default:
					
					break;
			}
			break;
		case "bool":
			switch(resultado.tipo){
				case  "num":
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();

					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
					codigo3D+="//FIN INICIALIZACION\n\n";

					simbolo.inicializado=true;

					break;
				case "str":
					//error
					
					addError("Semantico","un bool no puede ser str, por favor use algun casteo explicito",raiz.linea,raiz.columna);
					break;
				case "bool":
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();

					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
					codigo3D+="//FIN INICIALIZACION\n\n";

					simbolo.inicializado=true;

					break;
				case "null":
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();

					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
					codigo3D+="//FIN INICIALIZACION\n\n";
					break;
				default:
					
					break;
			}
			break;
		default://es es un element
			switch(resultado.tipo){
				case "num":
				case "str":
				case "bool":
					
					addError("Semantico","Un element no puede ser str/num/bool",raiz.linea,raiz.columna);
					break;
				case "null":
					temp1=genTemp();
					temp2=genTemp();
					temp3=genTemp();

					codigo3D+="//INICIALIZACION\n";
					codigo3D+=temp1+"=p+0; //puntero del this\n";
					codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
					codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
					codigo3D+="//FIN INICIALIZACION\n\n";
					break;

				default:
					if(simbolo.tipo===resultado.tipo){
						temp1=genTemp();
						temp2=genTemp();
						temp3=genTemp();

						codigo3D+="//INICIALIZACION\n";
						codigo3D+=temp1+"=p+0; //puntero del this\n";
						codigo3D+=temp2+"=stack["+temp1+"]; //puntero del objeto a crear\n";
						codigo3D+=temp3+"="+temp2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
						
						codigo3D+="heap["+temp3+"]="+resultado.valor+";\n";
						codigo3D+="//FIN INICIALIZACION\n\n";

						simbolo.inicializado=true;

					}else{
						//error
					}
					break;
			}
			break;
	}
}


function numToStr(resultado){

	codigo3D+="//CASTEANDO NUM A STR\n"
				
	var temp1=genTemp();
	codigo3D+=temp1+"="+resultado.valor+";\n";
	var temp2=genTemp();
	codigo3D+=temp2+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
	var temp3=genTemp();
	codigo3D+=temp3+"="+temp2+"+1; //parametro\n";
	codigo3D+="stack["+temp3+"]="+temp1+";\n";
	codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
	codigo3D+="getStr();\n";
	var temp4=genTemp();
	codigo3D+=temp4+"=p+0; //retorno\n";
	var temp5=genTemp();
	codigo3D+=temp5+"=stack["+temp4+"]; //puntero a pool de la cadena\n";
	codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";
									
	codigo3D+="//FIN CASTEO NUM A STR\n\n";

	return temp5;
}

function boolToStr(resultado2){
	codigo3D+="//CASTEO DE BOOL A STR\n";
	var temp1=genTemp();
	codigo3D+=temp1+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";

	var temp2=genTemp();
	codigo3D+=temp2+"="+temp1+"+1; //direccion del parametro\n";
	codigo3D+="stack["+temp2+"]="+resultado2.valor+";\n";
	codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
	codigo3D+="getStrBool();\n";
	var temp3=genTemp();
	codigo3D+=temp3+"=p+0; //direccion del retorno\n";
	var temp4=genTemp();
	codigo3D+=temp4+"=stack["+temp3+"]; //puntero al pool de la conversion\n"
	codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

	codigo3D+="//FIN CASTEO DE BOOL A STR\n\n";	

	return temp4;							
}






function castearAsignacion(varAsignacion,resultado,raiz){
	var estructura=getEstructura();
	var puntero=getPuntero();
	var temp1;
	var temp2;
	var temp3;
	var temp4;
	var temp5;

	switch(varAsignacion.tipo){
		case  "num":
			switch(resultado.tipo){
				case  "num":

					codigo3D+="//ASIGNACION\n";

					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
					}else{
						
						if(nivel==0){
	 						codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}
					}
					codigo3D+="//FIN ASIGNACION\n\n";
					varAsignacion.simbolo.inicializado=true;

					break;
				case "str":
					//error
					
					addError("Semantico","un numero no puede ser str, por favor use algun casteo explicito",raiz.linea,raiz.columna);
					break;
				case "bool":

					codigo3D+="//ASIGNACION\n";
					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
						//codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
					}else{
						if(nivel==0){

							if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
								codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
							}else{
								codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
							}
	 						
	 					}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}
					}
					codigo3D+="//FIN ASIGNACION\n\n";
					varAsignacion.simbolo.inicializado=true;
					break;
				case "null":

					codigo3D+="//ASIGNACION\n";

					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]=0"+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]=0"+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
						//codigo3D+="heap["+varAsignacion.valor+"]=0; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
					}else{

						if(nivel==0){
							if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
								codigo3D+="stack["+varAsignacion.valor+"]=0; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
							}else{
								codigo3D+="heap["+varAsignacion.valor+"]=0; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
							}
	 						
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]=0; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}
					}
					codigo3D+="//FIN ASIGNACION\n\n";

					varAsignacion.simbolo.inicializado=true;
					break;
				default:
				    
					addError("Semantico","La variable "+simbolo.nombre +" no es tipo "+resultado.tipo,raiz.linea,raiz.columna);
					break;
			}
			break;
		case "str":
			switch(resultado.tipo){
				case  "num":

					temp1=numToStr(resultado);
					codigo3D+="//ASIGNACION\n";

					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+temp1+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+temp1+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
						addError("Semantico","Los arrreglos deben de ser del mismo tipo en una asignacion",raiz.linea,raiz.columna);
					}else{

						if(varAsignacion.simbolo.inicializado){
							if(nivel==0){
								temp2=genTemp();
								codigo3D+=temp2+"=stack["+varAsignacion.valor+"];\n";
								codigo3D+="heap["+temp2+"]="+temp1+"; //asignacion numToStr a "+varAsignacion.simbolo.nombre+"\n";
							}else{
								codigo3D+="heap["+varAsignacion.valor+"]="+temp1+"; //asignacion numToStr a "+varAsignacion.simbolo.nombre+"\n";
							}
						}else{
							if(nivel==0){

								codigo3D+="heap[h]="+temp1+";\n";
								codigo3D+="stack["+varAsignacion.valor+"]=h;\n";
								codigo3D+="h=h+1;\n";

							}else{
								codigo3D+="heap["+varAsignacion.valor+"]="+temp1+"; //asignacion numToStr a "+varAsignacion.simbolo.nombre+"\n";
							}
						}
					}
					codigo3D+=" //FIN ASIGNACION\n\n";

					varAsignacion.simbolo.inicializado=true;
					break;
				case "str":

					codigo3D+="//ASIGNACION\n";

					temp1=genTemp();
					if(resultado.ref){
						codigo3D+=temp1+"=heap["+resultado.valor+"];\n";
					}else{
						temp1=resultado.valor;
					}

					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array sdfsadfdas"+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array sdfsadfdas"+varAsignacion.simbolo.nombre+"\n";
					
						}
					}else{

						if(varAsignacion.simbolo.inicializado){

							if(nivel==0){
								temp2=genTemp();
								codigo3D+=temp2+"=stack["+varAsignacion.valor+"];\n";
								codigo3D+="heap["+temp2+"]="+temp1+"; //asignacion str a "+varAsignacion.simbolo.nombre+"\n";
							}else{
								codigo3D+="heap["+varAsignacion.valor+"]="+temp1+"; //asignacion str a "+varAsignacion.simbolo.nombre+"\n";
							}
						}else{
							if(nivel==0){

								codigo3D+="heap[h]="+temp1+";\n";
								codigo3D+="stack["+varAsignacion.valor+"]=h;\n";
								codigo3D+="h=h+1;\n";

							}else{
								codigo3D+="heap["+varAsignacion.valor+"]="+temp1+"; //asignacion str a "+varAsignacion.simbolo.nombre+"\n";
							}
						}
					}
					codigo3D+="//FIN ASIGNACION\n\n";


					varAsignacion.simbolo.inicializado=true;

					break;
				case "bool":
					temp1=boolToStr(resultado);
					codigo3D+="//ASIGNACION\n";
					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
						//codigo3D+="heap["+varAsignacion.valor+"]="+temp1+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						
					}else{

					
						if(varAsignacion.simbolo.inicializado){
							if(nivel==0){
								temp2=genTemp();
								codigo3D+=temp2+"=stack["+varAsignacion.valor+"];\n";
								codigo3D+="heap["+temp2+"]="+temp1+"; //asignacion boolToStr a "+varAsignacion.simbolo.nombre+"\n";
							}else{
								codigo3D+="heap["+varAsignacion.valor+"]="+temp1+"; //asignacion numToStr a "+varAsignacion.simbolo.nombre+"\n";
							}
						}else{
							if(nivel==0){

								codigo3D+="heap[h]="+temp1+";\n";
								codigo3D+="stack["+varAsignacion.valor+"]=h;\n";
								codigo3D+="h=h+1;\n";

							}else{
								codigo3D+="heap["+varAsignacion.valor+"]="+temp1+"; //asignacion boolToStr a "+varAsignacion.simbolo.nombre+"\n";
							}
						}
					}
					codigo3D+=" //FIN ASIGNACION\n\n";

					varAsignacion.simbolo.inicializado=true;

					break;
				case "null":

					codigo3D+="//ASIGNACION NULL\n";

					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
						//codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
					}else{

						if(nivel==0){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+";\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+";\n";
						}
					}
					codigo3D+="//FIN ASIGNACION NULL\n\n";

					varAsignacion.simbolo.inicializado=false;
					break;
				default:
				   
					addError("Semantico","La variable "+simbolo.nombre +" no es tipo "+resultado.tipo,raiz.linea,raiz.columna);
					break;
			}
			break;
		case "bool":
			switch(resultado.tipo){
				case  "num":
					codigo3D+="//ASIGNACION\n";

					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
						//codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
					}else{

						if(nivel==0){
	 						codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}
					}
					codigo3D+="//FIN ASIGNACION\n\n";
					varAsignacion.simbolo.inicializado=true;

					break;
				case "str":
					//error
					
					addError("Semantico","un bool no puede ser str, por favor use algun casteo explicito",raiz.linea,raiz.columna);
					break;
				case "bool":
					codigo3D+="//ASIGNACION\n";
					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
						//codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
					}else{
						if(nivel==0){
	 						codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}
					}
					codigo3D+="//FIN ASIGNACION\n\n";
					varAsignacion.simbolo.inicializado=true;

					break;
				case "null":
					codigo3D+="//ASIGNACION\n";

					if(varAsignacion.simbolo.dimension!=0){
						if(nivel==0&&!varAsignacion.simbolo.posicionArreglo){
							codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
						}
						//codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a array "+varAsignacion.simbolo.nombre+"\n";
					}else{
						if(nivel==0){
	 						codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}
					}
					codigo3D+="//FIN ASIGNACION\n\n";
					varAsignacion.simbolo.inicializado=true;
					break;
				default:
					
					addError("Semantico","La variable "+simbolo.nombre +" no es tipo "+resultado.tipo,raiz.linea,raiz.columna);
					break;
			}
			break;
		default://es es un element
			switch(resultado.tipo){
				case "num":
				case "str":
				case "bool":
					
					addError("Semantico","Un element no puede ser str/num/bool",raiz.linea,raiz.columna);
					break;
				case "null":
					
					codigo3D+="//ASIGNACION NULL\n";

					if(nivel==0){
 						codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
					}else{
						codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
					}
					codigo3D+="//FIN ASIGNACION NULL\n\n";
					varAsignacion.simbolo.inicializado=false;


					break;

				default:
					if(varAsignacion.simbolo.tipo===resultado.tipo){
						
					    codigo3D+="//ASIGNACION\n";

						if(nivel==0){
	 						codigo3D+="stack["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}else{
							codigo3D+="heap["+varAsignacion.valor+"]="+resultado.valor+"; //asignacion a "+varAsignacion.simbolo.nombre+"\n";
						}

						codigo3D+="//FIN ASIGNACION\n\n";
						varAsignacion.simbolo.inicializado=true;
					}else{
						//error
						
					}
					break;
			}
			break;
	}

	//nivel=0;
}