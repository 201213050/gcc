class aritmetica{


	constructor(){

		this.operarTipo=function(raiz){
			var resultado1=null;
			var resultado2=null;
			var temp1=0;
			//debugger;
			switch(raiz.etiqueta){
				case "+":
				case "-":
				case "*":
				case "/":
				case "%":
				case "^":
					resultado1=this.operarTipo(raiz.hijos[0]);
					resultado2=this.operarTipo(raiz.hijos[1]);
					break;
				case "unario":
					resultado1=this.operarTipo(raiz.hijos[0]);
					switch(resultado1.tipo){
						case "num":
							return new resultado("num",temp1);
							break;
						case "str":
							break;
						case "bool":
							break;
					}
					break;
				case "null":
					return new resultado("null",nulo);
					break;
				case "num":
					return new resultado("num",raiz.valor);
					break;
				case "str":
					return new resultado("str",raiz.valor);
					break;
				case "bool":

					return new resultado("bool",raiz.valor);
					break;
				case "acceso":
					return accesoTipo(raiz);
					break
				case "inNum":
					
					return new resultado("num",0);
					break;
				case "getRandom":
					return new resultado("num",0);
					break;
				case "getLength":
					return new resultado("num",0);
					break;
			}








			switch(raiz.etiqueta){






				case "+":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								

								case "num":
									return new resultado("num",temp1);
									break;
								

								case "str":
									return new resultado("str",temp1);
									break;
								

								case "bool":
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									return new resultado("str",temp1);
									break;
								

								case "str":
									return new resultado("str",temp1);									
									break;


								case "bool":
									return new resultado("str",temp1);	
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado("str",temp1);
									break;
								case "bool":
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;











				case "-":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									return new resultado(-1,null);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;












				case "*":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									return new resultado(-1,null);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;












				case "/":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									return new resultado(-1,null);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;













				case "%":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									return new resultado(-1,null);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;












				case "^":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									return new resultado(-1,null);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									return new resultado("num",temp1);
									break;
								case "str":
									return new resultado(-1,null);
									break;
								case "bool":
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;











				default:
					break;
			}

			return new resultado(-1,null);
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
					resultado1=this.operar(raiz.hijos[0]);
					resultado2=this.operar(raiz.hijos[1]);
					break;
				case "unario":
					resultado1=this.operar(raiz.hijos[0]);
					switch(resultado1.tipo){
						case "num":
							var tempUni=genTemp();
							var tempRes=genTemp();
							codigo3D+="//OPERADOR UNARIO\n";
							codigo3D+=tempUni+"=-1;\n";
							codigo3D+=tempRes+"="+resultado1.valor+"*"+tempUni+";\n";
							codigo3D+="//FIN OPERADOR UNARIO\n\n";
							return new resultado("num",tempRes);
							break;
						case "str":
							break;
						case "bool":
							break;
					}
					break;
				case "null":
					return new resultado("null",nulo);
					break;
				case "num":
					//var tempNum=genTemp();
					//codigo3D+=tempNum+"="+raiz.valor+";\n";
					return new resultado("num",raiz.valor);
					break;
				case "str":

					var tempStr=genTemp();
					codigo3D+=tempStr+"="+"s; //puntero string pool\n";
					for(var i=0;i<raiz.valor.length;i++){
						var char=raiz.valor.charAt(i);
						codigo3D+="pool[s]="+char.charCodeAt()+"; //"+char+"\n";
						codigo3D+="s=s+1;\n";
					}
					codigo3D+="pool[s]="+"0"+"; //"+"0"+"\n";
					codigo3D+="s=s+1;\n";
					return new resultado("str",tempStr);

					break;
				case "bool":
					var tempBool=genTemp();
					if(raiz.valor){
						codigo3D+=tempBool+"="+1+"; //true\n";
					}else{
						codigo3D+=tempBool+"="+0+"; //false\n";
					}
					return new resultado("bool",tempBool+"");
					break;
				case "acceso":
					return acceso(raiz);
					break;
				case "inNum":
					return primitivaInNum(raiz);
					break;
				case "getRandom":
					return primitivaGetRandom(raiz);
					break;
				case "getLength":
					return primitivaGetArrLength(raiz);
					break;
				case "getLengthCad":
					return primitivaGetStrLength(raiz);
					break;
				case "getBool":
					return primitivaGetBool(raiz);
					break;
			}








			switch(raiz.etiqueta){






				case "+":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								

								case "num":
									codigo3D+="//OPERACION NUM + NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"+"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM + NUM\n\n";
									return new resultado("num",temp1);
									break;
								

								case "str":
									codigo3D+="//CASTEANDO NUM A STR\n"
									
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+";\n";
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

									codigo3D+="//CONCATENACION DE NUM CASTEADO Y STR\n";

									var temp6=genTemp();
									codigo3D+=temp6+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
									var temp7=genTemp();
									codigo3D+=temp7+"="+temp6+"+1; //direccion parametro1\n";
									codigo3D+="stack["+temp7+"]="+temp5+";\n";

									var temp8=genTemp();
									codigo3D+=temp8+"="+temp6+"+2; //direccion parametro2\n";


									//------------------------------------------------------------
									if(resultado2.ref){
										var tempAux1=genTemp()
										codigo3D+=tempAux1+"=heap["+resultado2.valor+"];\n";
										codigo3D+="stack["+temp8+"]="+tempAux1+";\n";
									}else{
										codigo3D+="stack["+temp8+"]="+resultado2.valor+";\n";
									}
									//-------------------------------------------------------------

									codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
									codigo3D+="concat();\n";
									var temp9=genTemp();
									codigo3D+=temp9+"=p+0; //direccion del retorno\n";
									var temp10=genTemp();
									codigo3D+=temp10+"=stack["+temp9+"]; //puntero al pool de la concatenacion\n";
									codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

									codigo3D+="//FIN CONCATENACION DE NUM CASTEADO Y STR\n\n";
									return new resultado("str",temp10);
									break;
								

								case "bool":
									codigo3D+="//OPERACION NUM + BOOL\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"+"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM + BOOL\n\n";
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								

								case "num":
									codigo3D+="//CASTEANDO NUM A STR\n"
									
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado2.valor+";\n";
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

									codigo3D+="//CONCATENACION DE NUM CASTEADO Y STR\n";

									var temp6=genTemp();
									codigo3D+=temp6+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
									
									var temp7=genTemp();
									codigo3D+=temp7+"="+temp6+"+1; //direccion parametro1\n";


									//------------------------------------------------------------
									if(resultado1.ref){
										var tempAux1=genTemp()
										codigo3D+=tempAux1+"=heap["+resultado1.valor+"];\n";
										codigo3D+="stack["+temp7+"]="+tempAux1+";\n";
									}else{
										codigo3D+="stack["+temp7+"]="+resultado1.valor+";\n";
									}
									//-------------------------------------------------------------

									var temp8=genTemp();
									codigo3D+=temp8+"="+temp6+"+2; //direccion parametro2\n";
									codigo3D+="stack["+temp8+"]="+temp5+";\n";

									codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
									codigo3D+="concat();\n";
									var temp9=genTemp();
									codigo3D+=temp9+"=p+0; //direccion del retorno\n";
									var temp10=genTemp();
									codigo3D+=temp10+"=stack["+temp9+"]; //puntero al pool de la concatenacion\n";
									codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

									codigo3D+="//FIN CONCATENACION DE NUM CASTEADO Y STR\n\n";
									return new resultado("str",temp10);
									break;
								

								case "str":
									codigo3D+="//CONCATENACION DE STR Y STR\n";

									var temp6=genTemp();
									codigo3D+=temp6+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
									
									var temp7=genTemp();
									codigo3D+=temp7+"="+temp6+"+1; //direccion parametro1\n";

									if(resultado1.ref){
										var tempAux1=genTemp()
										codigo3D+=tempAux1+"=heap["+resultado1.valor+"];\n";
										codigo3D+="stack["+temp7+"]="+tempAux1+";\n";
									}else{
										codigo3D+="stack["+temp7+"]="+resultado1.valor+";\n";
									}

									var temp8=genTemp();
									codigo3D+=temp8+"="+temp6+"+2; //direccion parametro2\n";

									if(resultado2.ref){
										var tempAux1=genTemp()
										codigo3D+=tempAux1+"=heap["+resultado2.valor+"];\n";
										codigo3D+="stack["+temp8+"]="+tempAux1+";\n";
									}else{
										codigo3D+="stack["+temp8+"]="+resultado2.valor+";\n";
									}

									codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
									codigo3D+="concat();\n";
									var temp9=genTemp();
									codigo3D+=temp9+"=p+0; //direccion del retorno\n";
									var temp10=genTemp();
									codigo3D+=temp10+"=stack["+temp9+"]; //puntero al pool de la concatenacion\n";
									codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

									codigo3D+="//FIN CONCATENACION DE STR Y STR\n\n";
									return new resultado("str",temp10);									
									break;


								case "bool":

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



									codigo3D+="//CONCATENACION DE STR Y BOOL\n";

									var temp6=genTemp();
									codigo3D+=temp6+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
									
									var temp7=genTemp();
									codigo3D+=temp7+"="+temp6+"+1; //direccion parametro1\n";

									//------------------------------------------------------------
									if(resultado1.ref){
										var tempAux1=genTemp()
										codigo3D+=tempAux1+"=heap["+resultado1.valor+"];\n";
										codigo3D+="stack["+temp7+"]="+tempAux1+";\n";
									}else{
										codigo3D+="stack["+temp7+"]="+resultado1.valor+";\n";
									}
									//-------------------------------------------------------------

									var temp8=genTemp();
									codigo3D+=temp8+"="+temp6+"+2; //direccion parametro2\n";
									codigo3D+="stack["+temp8+"]="+temp4+";\n";

									codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
									codigo3D+="concat();\n";
									var temp9=genTemp();
									codigo3D+=temp9+"=p+0; //direccion del retorno\n";
									var temp10=genTemp();
									codigo3D+=temp10+"=stack["+temp9+"]; //puntero al pool de la concatenacion\n";
									codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

									codigo3D+="//FIN CONCATENACION DE STR Y BOOL\n\n";
									return new resultado("str",temp10);	

									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION BOOL + NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"+"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION BOOL + NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":

									codigo3D+="//CASTEO DE BOOL A STR\n";
									var temp1=genTemp();
									codigo3D+=temp1+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";

									var temp2=genTemp();
									codigo3D+=temp2+"="+temp1+"+1; //direccion del parametro\n";
									codigo3D+="stack["+temp2+"]="+resultado1	.valor+";\n";
									codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
									codigo3D+="getStrBool();\n";
									var temp3=genTemp();
									codigo3D+=temp3+"=p+0; //direccion del retorno\n";
									var temp4=genTemp();
									codigo3D+=temp4+"=stack["+temp3+"]; //puntero al pool de la conversion\n"
									codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

									codigo3D+="//FIN CASTEO DE BOOL A STR\n\n";



									codigo3D+="//CONCATENACION DE BOOL Y STR\n";

									var temp6=genTemp();
									codigo3D+=temp6+"=p+"+getDesplazamientoP()+"; //simulacion de cambio de ambito\n";
									
									var temp7=genTemp();
									codigo3D+=temp7+"="+temp6+"+1; //direccion parametro1\n";
									codigo3D+="stack["+temp7+"]="+temp4+";\n";

									var temp8=genTemp();
									codigo3D+=temp8+"="+temp6+"+2; //direccion parametro2\n";

									//------------------------------------------------------------
									if(resultado1.ref){
										var tempAux1=genTemp()
										codigo3D+=tempAux1+"=heap["+resultado2.valor+"];\n";
										codigo3D+="stack["+temp8+"]="+tempAux1+";\n";
									}else{
										codigo3D+="stack["+temp8+"]="+resultado2.valor+";\n";
									}
									//-------------------------------------------------------------

									codigo3D+="p=p+"+getDesplazamientoP()+"; //cambio de ambito real\n";
									codigo3D+="concat();\n";
									var temp9=genTemp();
									codigo3D+=temp9+"=p+0; //direccion del retorno\n";
									var temp10=genTemp();
									codigo3D+=temp10+"=stack["+temp9+"]; //puntero al pool de la concatenacion\n";
									codigo3D+="p=p-"+getDesplazamientoP()+"; //regreso al ambito actual\n";

									codigo3D+="//FIN CONCATENACION DE BOOL Y STR\n\n";
									return new resultado("str",temp10);

									break;
								case "bool":
									codigo3D+="//OPERACION BOOL + BOOL\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"+"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION BOOL + BOOL\n\n";
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;











				case "-":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION NUM - NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"-"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM - NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion num - str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									codigo3D+="//OPERACION NUM - BOOL\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"-"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM - BOOL\n\n";
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									addError("Semantico","La operacion str - num no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "str":
									addError("Semantico","La operacion str - str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion str - bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION BOOL - NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"-"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION BOOL - NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion bool - str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion bool - bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;












				case "*":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION NUM * NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"*"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM * NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion num * str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									codigo3D+="//OPERACION NUM * BOOL\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"*"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM * BOOL\n\n";
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									addError("Semantico","La operacion str * num no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "str":
									addError("Semantico","La operacion str * str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion str * bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION BOOL * NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"*"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION BOOL * NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion bool * str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									codigo3D+="//OPERACION BOOL * BOOL\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"*"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION BOOL * BOOL\n\n";
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;












				case "/":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION NUM / NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"/"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM / NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion num / str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									codigo3D+="//OPERACION NUM / BOOL\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"/"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM / BOOL\n\n";
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									addError("Semantico","La operacion str / num no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "str":
									addError("Semantico","La operacion str / str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion str / bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION BOOL / NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"/"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION BOOL / NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion bool / str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion bool / bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;













				case "%":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION NUM % NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"%"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM % NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion num % str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									codigo3D+="//OPERACION NUM % BOOL\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"%"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM % BOOL\n\n";
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									addError("Semantico","La operacion str % num no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "str":
									addError("Semantico","La operacion str % str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion str % bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION BOOL % NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"%"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION BOOL % NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion bool % str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion bool % bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;












				case "^":
					switch(resultado1.tipo){
						case "num":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION NUM ^ NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"^"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM ^ NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion num ^ str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									codigo3D+="//OPERACION NUM ^ BOOL\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"^"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION NUM ^ BOOL\n\n";
									return new resultado("num",temp1);
									break;
								default:
									break;
							}
							break;
						case "str":
							switch(resultado2.tipo){
								case "num":
									addError("Semantico","La operacion str ^ num no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "str":
									addError("Semantico","La operacion str ^ str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion str ^ bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						case "bool":
							switch(resultado2.tipo){
								case "num":
									codigo3D+="//OPERACION BOOL ^ NUM\n";
									var temp1=genTemp();
									codigo3D+=temp1+"="+resultado1.valor+"^"+resultado2.valor+";\n";
									codigo3D+="//FIN OPERACION BOOL ^ NUM\n\n";
									return new resultado("num",temp1);
									break;
								case "str":
									addError("Semantico","La operacion bool ^ str no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								case "bool":
									addError("Semantico","La operacion bool ^ bool no se puede realizar",raiz.linea,raiz.columna);
									return new resultado(-1,null);
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
					break;











				default:
					break;
			}






			




			return new resultado(-1,null);
		}
	}

}


class resultado{

	constructor(tipo,valor,ref,etiV,etiF){
		this.tipo=tipo;
		this.valor=valor;
		this.etiV=etiV;
		this.etiF=etiF;
		this.ref=ref;
		this.simbolo=null;
		this.posicionArreglo=false;
	}

}

function getTipo(tipo){
	switch(tipo){
		case "void":
			return 0;
		case "num":
			return 1;
		case "str":
			return 2;
		case "bool":
			return 3;
		default:
			return -1;
	}
}


function accesoTipo(raiz){
	var simbolo;
	var dir;
	var ambitoAux=ambito;
	


	var temp1;
	var temp2;
	var temp3;

	var temp4;
	var temp5;
	var temp6;
	var posicion;

	var resultado1=new resultado(-1,null);
	//debugger;
	for(var i=0;i<raiz.hijos.length;i++){

		var acceso=raiz.hijos[i];
		switch(acceso.etiqueta){
			case "accesoId":
				/*if(simbolo!=null){
					if(!simbolo.inicializado){
						return new resultado(-1,null);
					}
				}*/
				simbolo=tabla.getSimboloDeclarado(acceso.hijos[0].valor,ambito);
				if(simbolo==null){
					return new resultado(-1,null);
				}


				if(i==0){
					ambito=[];
				}

				resultado1=new resultado(simbolo.tipo,null);
				resultado1.simbolo=simbolo;

				if(!(simbolo.tipo==="num"||simbolo.tipo==="str"||simbolo.tipo==="bool")&&i!=raiz.hijos.length-1){
					nivel++;
					var element=tabla.getElement(simbolo,ambito);
					ambito=[];
					if(element==null){
						return new resultado(-1,null);
					}
					
					ambito.push(simbolo.tipo);
				}

				break;
			case "llamada":
				var resultado1=llamadaMetodoTipo(acceso);
				var metodo=resultado1.simbolo;
				temp3=resultado1.valor;
				//debugger;
				ambito=[];
				if(!(metodo.tipo==="num"||metodo.tipo==="str"||metodo.tipo==="bool")){
					nivel++;
					var element=tabla.getElement(metodo,ambito);
					if(element==null){
						return new resultado(-1,null);
					}

					//PENDIENTE*********************************************************************	
					//tabla=element.tabla;
					ambito.push(metodo.tipo);
				}else{
					if(metodo.dimension>0){

					}
				}

				break;
			case "accesoArray":
				/*
				if(simbolo!=null){
					if(!simbolo.inicializado){
						return new resultado(-1,null);
					}
				} */

				simbolo=tabla.getSimboloDeclarado(acceso.hijos[0].valor,ambito);
				if(simbolo==null){
					return new resultado(-1,null);
				}

				if(simbolo.dimension==0){
					return new resultado(-1,null);
				}



				resultado1=new resultado(simbolo.tipo,null);
				//resultado1.simbolo=simbolo;
				break;
		}
	}

	ambito=ambitoAux;
	nivel=0;
	return resultado1;
}



function llamadaMetodoTipo(raiz){
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

		return new resultado(-1,null);
	}

	//faltan validaciones

	var parametros=metodoLLamado.nodo.hijos[2].hijos;
	var valorParametros=raiz.hijos[1].hijos;
    var ambitoAux=[idMetodo];
	for(var i=0;i<parametros.length;i++){
		var parametro=tabla.getSimbolo(parametros[i].hijos[1].valor,ambitoAux);
		opA=new aritmetica();
		var valor=opA.operar(valorParametros[i]);


		//debugger;
		if(parametro.tipo==="str"){
			if(parametro.ref||parametro.dimension!=0){

			}else{

			}
		}else{

		}

	}



	var resultado1=new resultado(metodoLLamado.tipo,temp4);
	resultado1.simbolo=metodoLLamado;
	return resultado1;
}




function acceso(raiz){
	var simbolo;
	var dir;
	var ambitoAux=ambito;
	

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
						if(constructor){

							var tempThis=genTemp();
							var tempThis2=genTemp();
							codigo3D+=tempThis+"=p+0;\n";
							codigo3D+=tempThis2+"=stack["+tempThis+"];\n";
							codigo3D+=temp1+"="+tempThis2+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
							
						}else{
							codigo3D+=temp1+"=p+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
						}
					}
					
					if(constructor){
						//codigo3D+=temp2+"=heap["+temp1+"]; \n\n";
						
						if(simbolo.tipo=="num"||simbolo.tipo==="bool"||simbolo.tipo==="str"){
							temp2=genTemp();
							codigo3D+=temp2+"=stack["+temp1+"]; \n\n";	
						}else{
							temp2=temp1;
						}

					}else{
						temp2=genTemp();
						codigo3D+=temp2+"=stack["+temp1+"]; \n\n";
					}
					temp3=temp2;
					resultado1=new resultado(simbolo.tipo,temp3,true);
					resultado1.simbolo=simbolo;
				}else{

					if(constructor){
						var tempElement=genTemp();
						codigo3D+=tempElement+"=heap["+temp3+"];\n";
						temp1=genTemp();
						codigo3D+=temp1+"="+tempElement+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
					
					//--------------------------------------------------------
						if(simbolo.tipo!="str"||simbolo.dimension!=0){
							temp2=genTemp();
							codigo3D+=temp2+"=heap["+temp1+"]; \n\n";
							temp3=temp2;
						}else{
							temp3=temp1;
						}
						//--------------------------------------------------
					}else{
						temp1=genTemp();
						codigo3D+=temp1+"="+temp3+"+"+simbolo.direccion+"; //direccion de "+simbolo.nombre+"\n";
						
						if(simbolo.tipo!="str"||simbolo.dimension!=0){
							temp2=genTemp();
							codigo3D+=temp2+"=heap["+temp1+"]; \n\n";
							temp3=temp2;
						}else{
							temp3=temp1;
						}
					}
					
					resultado1=new resultado(simbolo.tipo,temp3,true);
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
				//debugger
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
				}else{
					temp1=genTemp();
					codigo3D+=temp1+"="+temp3+"+"+simbolo.direccion+";\n";
					temp2=genTemp();
					codigo3D+=temp2+"=heap["+temp1+"]; //direccion de "+simbolo.nombre+"\n\n";
					temp3=temp2;
					resultado1=new resultado(simbolo.tipo,temp3,true);
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
				if(simbolo.tipo==="num"||simbolo.tipo==="bool"){
					temp6=genTemp();
					codigo3D+=temp6+"=heap["+temp5+"];\n";
				}else{
					temp6=temp5;
				}

				codigo3D+="//FIN POSICION LINEALIZADA\n\n";

				resultado1=new resultado(simbolo.tipo,temp6,true);
				resultado1.posicionArreglo=true;
				resultado1.simbolo=simbolo;
				break;
		}
	}
	
	ambito=ambitoAux;
	nivel=0;
	return resultado1;
}


function llamadaMetodo(raiz){
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


function generarId(nodo){
	var id=nodo.hijos[0].valor;
	var parametros=nodo.hijos[1].hijos;
	for(var i=0;i<parametros.length;i++){
		var parametro=parametros[i];
		opA=new aritmetica();
		//debugger;
		var resultado=opA.operarTipo(parametro);
		id+="$"+resultado.tipo;

		if(resultado.simbolo){
			if(resultado.simbolo.dimension!=0){
				for(var j=0;j<resultado.simbolo.dimension.length;j++){
					id+=resultado.simbolo.dimension[j];
				}
			}
		}

	}
	return id;
}