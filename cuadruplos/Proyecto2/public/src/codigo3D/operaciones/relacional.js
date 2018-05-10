
class relacional{

	constructor(){


		this.operacionSimple=function(resultado1,operador,resultado2,tipo){
			var etiV=genEti();
			var etiF=genEti();
			codigo3D+="//OPERACION "+tipo+operador+tipo+"\n";
			codigo3D+="if("+resultado1.valor+operador+resultado2.valor+") goto "+etiV+";\n";
			codigo3D+="goto "+etiF+";\n";
			codigo3D+="//FIN OPERACION "+tipo+operador+tipo+"\n\n";

			return new resultado("bool",0,false,etiV,etiF);
		}

		this.operacionCadena=function(resultado1,operador,resultado2,tipo){
			var temp1=genTemp();
			var temp2=genTemp();
			var temp3=genTemp();
			var temp4=genTemp();
			var temp5=genTemp();

			var temp6;

			var etiV=genEti();
			var etiF=genEti();

			codigo3D+="//OPERACION "+tipo+operador+tipo+"\n";

			codigo3D+=temp1+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
			codigo3D+=temp2+"="+temp1+"+1; //direccion parametro1\n";

			if(resultado1.ref&&resultado1.tipo==="str"){
				temp6=genTemp();
				codigo3D+=temp6+"=heap["+resultado1.valor+"];\n";
			}else{
				temp6=resultado1.valor;
			}

			codigo3D+="stack["+temp2+"]="+temp6+";\n";


			codigo3D+=temp3+"="+temp1+"+2; //direccion parametro2\n";

			if(resultado2.ref && resultado2.tipo==="str"){
				temp6=genTemp();
				codigo3D+=temp6+"=heap["+resultado2.valor+"];\n";
			}else{
				temp6=resultado2.valor;
			}

			codigo3D+="stack["+temp3+"]="+temp6+";\n";

			codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
			switch(operador){
				case "==":
					codigo3D+="igualIgual();\n";
					break;
				case "!=":
					codigo3D+="noIgual();\n";
					break;
				case ">":
				case "<":
					codigo3D+="mayor();\n";
					break;
			}
			codigo3D+=temp4+"=p+0; //direccion del retorno\n";
			codigo3D+=temp5+"=stack["+temp4+"]; //retorno\n";
			codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

			codigo3D+="//-------------------------------------------\n";

			codigo3D+="if("+temp5+") goto "+etiV+";\n";
			codigo3D+="goto "+etiF+";\n";

			codigo3D+="//FIN OPERACION "+tipo+operador+tipo+"\n\n";

			return new resultado("bool",temp5,false,etiV,etiF);

		}

		this.operar=function(raiz){
			var resultado1=null;
			var resultado2=null;

			switch(raiz.etiqueta){
				case "+":
				case "-":
				case "*":
				case "/":
				case "%":
				case "^":
					opA=new aritmetica();
					return opA.operar(raiz);
					break;
				case "==":
				case "!=":
				case ">":
				case ">=":
				case "<":
				case "<=":
					opA=new aritmetica();
					resultado1=opA.operar(raiz.hijos[0]);
					resultado2=opA.operar(raiz.hijos[1]);
					break;
				default:

					opA=new aritmetica();
					resultado1=opA.operar(raiz);
					if(resultado1.tipo==="bool"){
						var etiV=genEti();
						var etiF=genEti();

						codigo3D+="if("+resultado1.valor+") goto "+etiV+";\n";
						codigo3D+="goto "+etiF+";\n";

						return new resultado(resultado1.tipo,resultado1.valor,false,etiV,etiF);
					}else{
						return resultado1;
					}
					break;

			}


			switch(raiz.etiqueta){
				case "==":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return this.operacionSimple(resultado1,"==",resultado2,"NUM");
									break;	
								case "null":
									return this.operacionSimple(resultado1,"==",resultado2,"NUM-NULL");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "str":
									return this.operacionCadena(resultado1,"==",resultado2,"STR");
							 	case "null":
							 		return this.operacionSimple(resultado1,"==",resultado2,"STR-NULL");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "bool":
									return this.operacionSimple(resultado1,"==",resultado2,"BOOL");
									break;
								case "null":
									return this.operacionSimple(resultado1,"==",resultado2,"BOOL-NULL");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						default:
							if((resultado1.tipo==="null"||resultado2.tipo==="null")||(resultado1.tipo===resultado2.tipo)){
								return this.operacionSimple(resultado1,"==",resultado2,"ELEMENT");
							}else{
								//error
								addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
							}
							break;
					}
					break;




				case "!=":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return this.operacionSimple(resultado1,"!=",resultado2,"NUM");
									break;
								case "null":
									return this.operacionSimple(resultado1,"!=",resultado2,"NUM-NULL");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "str":
									return this.operacionCadena(resultado1,"!=",resultado2,"STR");
									break;
								case "null":
									return this.operacionSimple(resultado1,"!=",resultado2,"STR-NULL");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "bool":
									return this.operacionSimple(resultado1,"!=",resultado2,"BOOL");
									break;
								case "null":
									return this.operacionSimple(resultado1,"!=",resultado2,"BOOL-NULL");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						default:
							if((resultado1.tipo==="null"||resultado2.tipo==="null")||(resultado1.tipo===resultado2.tipo)){
								return this.operacionSimple(resultado1,"!=",resultado2,"ELEMENT-NULL");
							}else{
							//error
							addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
							}
							break;
					}
					break;







				case ">":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return this.operacionSimple(resultado1,">",resultado2,"NUM");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "str":
									return this.operacionCadena(resultado1,">",resultado2,"STR");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "bool":
									addError("Semantico","El operador relacional > no se puede usar en datos tipo bool",raiz.linea,raiz.columna);
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						default:
							//error
							addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
							break;
					}
					break;







				case ">=":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return this.operacionSimple(resultado1,">=",resultado2,"NUM");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "str":
									addError("Semantico","El operador >= no se puede usar en datos tipo str",raiz.linea,raiz.columna);
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "bool":
									addError("Semantico","El operador >= no se puede usar en datos tipo bool",raiz.linea,raiz.columna);
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						default:
							//error
							addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
							break;
					}
					break;







				case "<":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return this.operacionSimple(resultado1,"<",resultado2,"NUM");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "str":
									return this.operacionCadena(resultado2,"<",resultado1,"STR");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "bool":
									addError("Semantico","El operador < no se puede usar en datos tipo bool",raiz.linea,raiz.columna);
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						default:
							//error
							addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
							break;
					}
					break;






				case "<=":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return this.operacionSimple(resultado1,"<=",resultado2,"NUM");
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "str":
									addError("Semantico","El operador <= no se puede usar en datos tipo str",raiz.linea,raiz.columna);
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "bool":
									addError("Semantico","El operador <= no se puede usar en datos tipo bool",raiz.linea,raiz.columna);
									break;
								default:
									//error
									addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
									break;
							}
							break;
						default:
							//error
							addError("Semantico","solo se pueden comparar datos del mismo tipo",raiz.linea,raiz.columna);
							break;
					}
					break;





				default:
					break;
			}

			return new resultado(-1,0);
		}












	}
}