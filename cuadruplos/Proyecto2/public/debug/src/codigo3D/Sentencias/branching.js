

function branchingReturn(raiz) {
	var temp1;
	var temp2;
	if(raiz.hijos.length==0){
		if(metodoActual.tipo==="void"){
			codigo3D+="goto "+etiquetaReturn+";\n";
		}else{
			//falta asignarle null al retorno
			addError("Semantico","Los metodos tipo num/str/bool/element deben retornar un valor obligatoriamente");
			codigo3D+="goto "+etiquetaReturn+";\n";
		}
	}else{
		if(metodoActual.tipo==="void"){
			//falta asignarle null al retorno
			addError("Semantico","Los metodos tipo void no retornan un valor",raiz.linea,raiz.columna);
			codigo3D+="goto "+etiquetaReturn+";\n";
		}else{
			codigo3D+="//RETURN\n";
			opA=new aritmetica();
			//debugger;
			var resultado=opA.operar(raiz.hijos[0]);
	
			if(resultado.tipo===metodoActual.tipo){
				if(resultado.ref){
					if((resultado.tipo==="str"&&resultado.simbolo.dimension==0)||(resultado.tipo==="str"&&resultado.posicionArreglo)){
						//debugger;
						temp1=genTemp();
						temp2=genTemp();
						codigo3D+=temp1+"=heap["+resultado.valor+"]; //puntero s de str\n";
						codigo3D+=temp2+"=p+0; //direccion de return\n";
						codigo3D+="stack["+temp2+"]="+temp1+";\n";

					}else{
						temp1=genTemp();
						codigo3D+=temp1+"=p+0; //direccion de return\n";
						codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
					}
					
				}else{
					temp1=genTemp();
					codigo3D+=temp1+"=p+0; //direccion de return\n";
					codigo3D+="stack["+temp1+"]="+resultado.valor+";\n";
				}
			}else{
			
				temp1=genTemp();
				codigo3D+=temp1+"=p+0;  //direccion de return\n";
				codigo3D+="stack["+temp1+"]="+nulo+";\n";
				addError("Semantico","El metodo "+metodoActual.nombre+" debe devolver un valor tipo "+metodoActual.tipo,raiz.linea,raiz.columna);
			}
			codigo3D+="goto "+etiquetaReturn+";\n";
			codigo3D+="//FIN RETURN\n\n";
		}	
	}
}