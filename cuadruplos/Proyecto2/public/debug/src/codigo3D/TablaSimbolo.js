

class Simbolo{

	constructor(nombre,tipo,ambito,rol,direccion,tamanio,dim,ref){
		this.nombre=nombre;
		this.tipo=tipo;
		this.ambito=ambito;
		this.rol=rol;
		this.direccion=direccion;
		this.tamanio=tamanio;
		this.dimension=dim;
		this.ref=ref;
		this.tabla=[];
		this.nodo=null;
		this.inicializado=false;
		this.declarado=false;
	}

}


class TablaSimbolo{

	constructor(){
		this.titulo="Tabla de Simbolos";
		this.simbolos=[];
		this.ambito=[];
		this.direccion=0;
		//this.ambito.push("global");
		this.ambito=[];
		this.globales=[];




		//contadores para ciclos y sentencias de control
		this.contadorIf=0;
		this.contadorElse=0;
		this.contadorCase=0;
		this.contadorWhile=0;
		this.contadorDoWhile=0;
		this.contadorRepeat=0;
		this.contadorLoop=0;
		this.contadorCount=0;
		this.contadorDoWhilex=0;

		this.contadorFor=0;

		this.reiniciarIdSent=function(){
			this.contadorIf=0;
			this.contadorElse=0;
			this.contadorCase=0;
			this.contadorWhile=0;
			this.contadorDoWhile=0;
			this.contadorRepeat=0;
			this.contadorLoop=0;
			this.contadorCount=0;
			this.contadorDoWhilex=0;

			this.contadorFor=0;
		}

		//generar id para las sentencias de control y los ciclos
		this.generarIdSent=function(tipo){
			switch(tipo){
				case "if":
					return "if"+(this.contadorIf++);
				case "else":
					return "else"+(this.contadorElse++);
				case "case":
					return "case"+(this.contadorCase++);
				case "while":
					return "while"+(this.contadorWhile++);
				case "doWhile":
					return "doWhile"+(this.contadorDoWhile++);
				case "repeat":
					return "repeat"+(this.contadorRepeat++);
				case "loop":
					return "loop"+(this.contadorLoop++);
				case "count":
					return "count"+(this.contadorCount++);
				case "doWhilex":
					return "doWhilex"+(this.contadorDoWhilex++);
				case "for":
					return "for"+(this.contadorFor++);
			}
		}



		this.shift=function(){
			return this.simbolos.shift();
		}

		this.setSimbolo=function(simbolo,nodo) {
			//debugger;
			if(!this.existe(simbolo)){
			
				this.simbolos.push(simbolo);
				this.direccion++;
				if(simbolo.ambito==="global"&&simbolo.rol==="variable"){
					this.globales.push(simbolo);
				}
				return simbolo;
			}else{
				addError("Semantico","La variable "+simbolo.nombre+" ya existe",nodo.linea,nodo.columna);
			}

			return null;
		}


		this.setSimboloDeclarado=function(simbolo) {
			//debugger;
			if(this.existe(simbolo)){
				if(!simbolo.declarado){
					simbolo.declarado=true;
					return simbolo;
				}
			}else{
				//addError("Semantico","La variable "+simbolo.nombre+" ya existe",nodo.linea,nodo.columna);
			}

			return null;
		}




		this.getSimbolo=function(nombre,ambito){

			var strAmbito=this.generarAmbito(ambito);
			for(var i=0;i<this.simbolos.length;i++){
				var simbolo=this.simbolos[i];
				if(nombre===simbolo.nombre){
					if(simbolo.tipo==="bool"||simbolo.tipo==="str"||simbolo.tipo==="num"){
						//var estado=strAmbito.indexOf(simbolo.ambito);
						var estado=this.existeEnAmbito(strAmbito,simbolo.ambito);
						if(strAmbito===simbolo.ambito){
							return simbolo;
						}

					}else{
						//var estado=strAmbito.indexOf(simbolo.ambito);
						var estado=this.existeEnAmbito(strAmbito,simbolo.ambito);
						if(estado==0||simbolo.ambito==="global"){
							return simbolo;
						}
					}
				}
			}
			return null;
		}


	this.getSimboloMetodo=function(nombre){
			console.log(nombre);
			switch(nombre){
				case "$$_getBool":
					return new Simbolo("$$_getBool","void","global","metodo",-1,2);
					break;
				case "$$_getNum":
					return new Simbolo("$$_getNum","void","global","metodo",-1,4);
					break;
				case "$$_outStr":
					return new Simbolo("$$_outStr","void","global","metodo",-1,2);
					break;
				case "$$_outNum":
					return new Simbolo("$$_outNum","void","global","metodo",-1,3);
					break;
				case "$$_inStr":
					return new Simbolo("$$_inStr","void","global","metodo",-1,3);
					break;
				case "$$_inNum":
					return new Simbolo("$$_inNum","void","global","metodo",-1,3);
					break;
				case "$$_show":
					return new Simbolo("$$_show","void","global","metodo",-1,2);
					break;
				case "$$_getRandom":
					return new Simbolo("$$_getRandom","void","global","metodo",-1,1);
					break;
				case "$$_getArrLength":
					return new Simbolo("$$_getArrLength","void","global","metodo",-1,3);
					break;
				case "$$_getStrLength":
					return new Simbolo("$$_getStrLength","void","global","metodo",-1,2);
					break;
				case "exit":
					return new Simbolo("exit","void","global","metodo",-1,1);
					break;
				case "$$_globales":
					return new Simbolo("$$_globales","void","global","metodo",-1,this.globales.length);
					break;
				case "concat":
					return new Simbolo("concat","void","global","metodo",-1,3);
					break;
				case "getInt":
					return new Simbolo("getInt","void","global","metodo",-1,2);
					break;
				case "getStr":
					return new Simbolo("getStr","void","global","metodo",-1,2);
					break;
				case "getStrBool":
					return new Simbolo("getStrBool","void","global","metodo",-1,2);
					break;
				case "igualIgual":
					return new Simbolo("igualIgual","void","global","metodo",-1,3);
					break;
				case "noIgual":
					return new Simbolo("noIgual","void","global","metodo",-1,3);
					break;
				case "mayorIgual":
					return new Simbolo("mayorIgual","void","global","metodo",-1,3);
					break;
				case "mayor":
					return new Simbolo("mayor","void","global","metodo",-1,3);
					break;
				case "$$_inicio5322":
					return new Simbolo("global","void","global","metodo",-1,0);
					break;

			}
			var sim;
			for(var i=0;i<this.simbolos.length;i++){
				var simbolo=this.simbolos[i];

				if(nombre===simbolo.nombre&&simbolo.rol=="metodo"){
					return simbolo;	
				}else{
					if(simbolo.rol==="element"){
						var strNombre="element_"+simbolo.nombre;
						console.log(strNombre);
						if(nombre===strNombre){
							return simbolo;
						}
					}
				}
			}
		}

		this.getSimboloDeclarado=function(nombre,ambito){

			var strAmbito=this.generarAmbito(ambito);
			for(var i=this.simbolos.length-1;i>=0;i--){
				var simbolo=this.simbolos[i];
				if(nombre===simbolo.nombre){
						//var estado=strAmbito.indexOf(simbolo.ambito);
						var estado=this.existeEnAmbito(strAmbito,simbolo.ambito);
						if((estado==0||simbolo.ambito==="global")&&simbolo.declarado){
							return simbolo;
						}

					
				}
			}
			return null;
		}

		this.getElement=function(simbolo,ambito){
			var strAmbito=this.generarAmbito(ambito);
			for(var i=0;i<this.simbolos.length;i++){
				var aux=this.simbolos[i];

				if(aux.tipo==="element"){
					if(simbolo.tipo===aux.nombre){
						//var estado1=strAmbito.indexOf(simbolo.ambito,0);
						//var estado2=strAmbito.indexOf(aux.nombre);
						var estado1=this.existeEnAmbito(strAmbito,simbolo.ambito);
						var estado2=this.existeEnAmbito(strAmbito,aux.nombre);
						if(estado1==0||estado2==0||aux.ambito==="global"){
							return aux;
						}
					}
				}

			}
			return null;
		}

		this.existe=function(simbolo){
			//debugger;
			for(var i=0;i<this.simbolos.length;i++){
				var aux=this.simbolos[i];
				if(simbolo.nombre===aux.nombre){
					if(simbolo.tipo==="bool"||simbolo.tipo==="str"||simbolo.tipo==="num"){
						//var estado=simbolo.ambito.indexOf(aux.ambito,0);
						var estado=this.existeEnAmbito(simbolo.ambito,aux.ambito);
						if(estado==0){
							return true;
						}
					}else{
						if(simbolo.ambito===aux.ambito){
							return true;
						}
					}
				}
			}

			return false
		}


		this.existeEnAmbito=function(ambito1,ambito2){
			//debugger;
			var ambitos1=ambito1.split("/");
			var ambitos2=ambito2.split("/");
			for(var i=0;i<ambitos2.length;i++){
				
				if(ambitos1[i]!==ambitos2[i]){
					return -1;
				}
			}
			return 0;
		}

		this.generarAmbito=function(ambito){
			var strAmbito="";
			if(ambito.length==0){
				return "global";
			}
			for(var i=0;i<ambito.length;i++){
				var nombreAmbito=ambito[i];
				if(i==ambito.length-1){
					strAmbito+=nombreAmbito;
				}else{
					strAmbito+=nombreAmbito+"/";
				}
			}
			return strAmbito;
		}

		this.generarId=function(nodo){
			var id=nodo.hijos[1].valor;
			var parametros=nodo.hijos[2].hijos;
			for(var i=0;i<parametros.length;i++){
				var parametro=parametros[i];
				id+="$"+parametro.hijos[0].valor;
				if(parametro.etiqueta=="parametroArray"){
					for(var j=0;j<parametro.hijos[2].hijos.length;j++){
						var dim=parametro.hijos[2].hijos[j];
						var inf=dim.hijos[0].valor;
						var sup=dim.hijos[1].valor;
						id+=sup-inf;
					}
				}
			}
			return id;
		}




		//recorrido del arbol
		this.generar=function(raiz){
			for(var i=0;i<raiz.hijos.length;i++){
				var hijo=raiz.hijos[i];
				switch(hijo.etiqueta){
					case "if":
						var sentenciaIf=hijo.hijos[1];
						var sentenciaElse=hijo.hijos[2];
						if(sentenciaIf.hijos.length>0){
							this.ambito.push(this.generarIdSent("if"));
							this.generar(sentenciaIf);
							this.ambito.pop();	
						}
						
						if(sentenciaElse.hijos.length>0){
							this.ambito.push(this.generarIdSent("else"));
							this.generar(sentenciaElse);
							this.ambito.pop();	
						}

						break;
					case "ifElse":
						var sentenciaIf=hijo.hijos[1];
						var sentenciaElse=hijo.hijos[2];
						if(sentenciaIf.hijos.length>0){
							this.ambito.push(this.generarIdSent("if"));
							this.generar(sentenciaIf);
							this.ambito.pop();	
						}
						
						if(sentenciaElse.hijos.length>0){
							this.ambito.push(this.generarIdSent("else"));
							this.generar(sentenciaElse);
							this.ambito.pop();	
						}

						break;
				    case "switch":
				    		var casosSwitch=hijo.hijos[2];
				    		for(var j=0;j<casosSwitch.hijos.length;j++){
				    			var caso=casosSwitch.hijos[j];
				    			var sentenciasCaso=caso.hijos[1];
				    			if(sentenciasCaso.hijos.length>0){
				    				this.ambito.push(this.generarIdSent("case"));
									this.generar(sentenciasCaso);
									this.ambito.pop();	
				    			}
				    		}
				    	break;	
				    case "while":
						var sentenciaWhile=hijo.hijos[1];
						if(sentenciaWhile.hijos.length>0){
							this.ambito.push(this.generarIdSent("while"));
							this.generar(sentenciaWhile);
							this.ambito.pop();	
						}
						break;
					case "doWhile":
						var sentenciaDoWhile=hijo.hijos[1];
						if(sentenciaDoWhile.hijos.length>0){
							this.ambito.push(this.generarIdSent("doWhile"));
							this.generar(sentenciaDoWhile);
							this.ambito.pop();	
						}	
						break;
					case "repeatUntil":
						var sentenciaRepeat=hijo.hijos[1];
						if(sentenciaRepeat.hijos.length>0){
							this.ambito.push(this.generarIdSent("repeat"));
							this.generar(sentenciaRepeat);
							this.ambito.pop();	
						}	
						break;
					case "loop":
						var sentenciaLoop=hijo.hijos[1];
						if(sentenciaLoop.hijos.length>0){
							this.ambito.push(this.generarIdSent("loop"));
							this.generar(sentenciaLoop);
							this.ambito.pop();	
						}	
						break;
					case "count":
						var sentenciaCount=hijo.hijos[1];
						if(sentenciaCount.hijos.length>0){
							this.ambito.push(this.generarIdSent("count"));
							this.generar(sentenciaCount);
							this.ambito.pop();	
						}	
						break;
					case "doWhilex":
						var sentenciaDoWhilex=hijo.hijos[2];
						if(sentenciaDoWhilex.hijos.length>0){
							this.ambito.push(this.generarIdSent("doWhilex"));
							this.generar(sentenciaDoWhilex);
							this.ambito.pop();	
						}	
						break;
					case "for":
						var sentenciaFor=hijo.hijos[3];
						var ambitoFor=this.generarIdSent("for");
						this.ambito.push(ambitoFor);
						var raizFor=crearNodo("sentencias",1,1);
						raizFor.add(hijo.hijos[0]);
						this.generar(raizFor);
						if(sentenciaFor.hijos.length>0){
							this.ambito.push("cuerpo");
							this.generar(sentenciaFor);
							this.ambito.pop();	
						}
						this.ambito.pop();
						break;
					case "element":
						var auxAmbito=this.ambito;
						var auxDireccion=this.direccion;
						//debugger;
						this.direccion=0;
						var nombreElement=hijo.hijos[0].valor;
						this.ambito=[];
						this.ambito.push(nombreElement);
						this.generar(hijo.hijos[1]);
						this.ambito.pop();
						this.ambito=auxAmbito;
						var simbolo=new Simbolo(nombreElement,"element",this.generarAmbito(this.ambito),"element",-1,this.direccion,0);
						//this.simbolos.push(simbolo);
						this.setSimbolo(simbolo,hijo);
						this.direccion=auxDireccion;
						break;
					case "metodo":
					case "metodoArray":
						this.direccion=0;
						var tipoMetodo=hijo.hijos[0].valor;
						var nombreMetodo=this.generarId(hijo);
						var parametros=hijo.hijos[2].hijos;
						this.ambito.push(nombreMetodo);

						//ingreso de variable return
						var simbolo=new Simbolo("return",tipoMetodo,this.generarAmbito(this.ambito),"variable",this.direccion,1,0);
						//this.simbolos.push(simbolo);
						this.setSimbolo(simbolo,hijo);

						for(var j=0;j<parametros.length;j++){
							var parametro=parametros[j];
							switch(parametro.etiqueta){
								case "parametroVal":
									var tipoParametro=parametro.hijos[0].valor;
									var nombreParametro=parametro.hijos[1].valor;
									var simbolo=new Simbolo(nombreParametro,tipoParametro,this.generarAmbito(this.ambito),"parametro",this.direccion,1,0);
									//this.simbolos.push(simbolo);
									this.setSimbolo(simbolo,parametro);
									//nombre+="_"+tipoParametro;

									break;
								case "parametroRef":
								case "parametroElement":
									var tipoParametro=parametro.hijos[0].valor;
									var nombreParametro=parametro.hijos[1].valor;
									var simbolo=new Simbolo(nombreParametro,tipoParametro,this.generarAmbito(this.ambito),"parametro",this.direccion,1,0,true);
									//this.simbolos.push(simbolo);
									this.setSimbolo(simbolo,parametro);
									//nombre+="_"+tipoParametro;
									break;
								case "parametroArray":

									var nombreParametro=parametro.hijos[1].valor;
									var tipoParametro=parametro.hijos[0].valor;
									var dim=parametro.hijos[2];
									var estado=true;
									var dimension=[];
									for(var k=0;k<dim.hijos.length;k++){
										var sup=dim.hijos[k].hijos[1].valor;
										var inf=dim.hijos[k].hijos[0].valor;
										if(sup-inf+1>0){
											dimension.push(sup-inf);
										}else{
											estado=false;
											addError("Semantico","Dimension incorrecta del array "+nombre+"",parametro.linea,parametro.columna);
											//reportar error semantico
										}
									}	
									if(estado){
										var simbolo=new Simbolo(nombreParametro,tipoParametro,this.generarAmbito(this.ambito),"variable",this.direccion,1,dimension,true);
										simbolo.nodo=dim;
										this.setSimbolo(simbolo,parametro);
									}
									break;
							}
						}



						//agregando sentencias de metodos
						var sentencias=hijo.hijos[3];
						this.generar(sentencias);


						this.ambito.pop();
						var dimension=0;
						if(hijo.etiqueta==="metodoArray"){
							dimension=hijo.hijos[4].valor;
						}
						var simbolo=new Simbolo(nombreMetodo,tipoMetodo,this.generarAmbito(this.ambito),"metodo",-1,this.direccion,dimension);
						//this.simbolos.push(simbolo);
						simbolo.nodo=hijo;
						this.setSimbolo(simbolo,hijo);
						this.direccion=0;
						break;
					case "primitivaD":
					case "primitivaDA":
					case "elementDD":
					case "elementDI":
					case "elementD":
			
						for(var j=0;j<hijo.hijos[1].hijos.length;j++){
							var nodoId=hijo.hijos[1].hijos[j];
							var nombre=nodoId.valor;
							var tipo=hijo.hijos[0].valor;
							var simbolo=new Simbolo(nombre,tipo,this.generarAmbito(this.ambito),"variable",this.direccion,1,0);
							this.setSimbolo(simbolo,nodoId);
						}
						break;
					case "array":
						var nombre=hijo.hijos[0].valor;
						var tipo=hijo.hijos[2].valor;
						var dim=hijo.hijos[1];
						var estado=true;
						var dimension=[];
						for(var j=0;j<dim.hijos.length;j++){
							var sup=dim.hijos[j].hijos[1].valor;
							var inf=dim.hijos[j].hijos[0].valor;
							if(sup-inf+1>0){
								dimension.push(sup-inf);
							}else{
								estado=false;
								addError("Semantico","Dimension incorrecta del array "+nombre+"",hijo.linea,hijo.columna);
								//reportar error semantico
							}
						}	

						if(estado){
							var simbolo=new Simbolo(nombre,tipo,this.generarAmbito(this.ambito),"variable",this.direccion,1,dimension);
							simbolo.nodo=dim;
							this.setSimbolo(simbolo,hijo);
						}
						break;

				}
			}
		}















	}
}

