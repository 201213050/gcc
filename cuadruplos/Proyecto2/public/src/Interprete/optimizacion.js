
var arreglo3D=[];
var cantidadOptimizaciones=0;
var bloques=[];
var indice=0;


var primerBloque=true;
var bloqueInf=-1;
var bloqueSup=-1;

class bloque{

	constructor(inf,sup,indice){
		this.inf=inf;
		this.sup=sup;
		this.indice=indice;
		this.id;
		this.reglas=[];
	}
}

function setRegla(indice,regla){
	indice=indice-1;
	//debugger;
	for(var i=0;i<bloques.length;i++){
		var bloque=bloques[i];
		if(indice>=bloque.inf&&indice<=bloque.sup){
			bloque.reglas.push("Regla No. "+regla);
			break;
		}
	}
}

function optimizar(codigo){
	bloques=[];
	cantidadOptimizaciones=0;
	indice=0;

	//-----------------------------------------------------------
	//optimizacion de flujo de control
	var raiz=null;
	try { 
		arreglo3D=codigo.split("\n");
	  	raiz=gramatica3D.parse(codigo);
	}catch (e) {
		//scope.txtConsola=e.message;
	  	console.log("Error: "+e.message);
	}


	for(var i=0;i<raiz.hijos.length;i++){
		optimizarFlujo(raiz.hijos[i]);
	}
	var cod=getCodigo(arreglo3D);
	
	bloques=generarBloques(cod).bloques;

	//-----------------------------------------------------------
	//optimizacion de expresiones
	var codigoMedio=getCodigo(arreglo3D);	
	arreglo3D=codigoMedio.split("\n");
	raiz=null;
	try { 
		arreglo3D=codigo.split("\n");
	  	raiz=gramatica3D.parse(codigoMedio);
	}catch (e) {
		//scope.txtConsola=e.message;
	  	console.log("Error: "+e.message);
	}

	for(var i=0;i<raiz.hijos.length;i++){
		optimizarExpresiones(raiz.hijos[i]);
	}

	//----------------------------------------------------------
	
	return {"bloques":bloques,"arreglo3D":arreglo3D};
}


function getCodigo1(arreglo){
	var codigo="";
	for(var i=0;i<arreglo3D.length;i++){
		codigo+=arreglo3D[i]+"\n";
	}
	return codigo;
}	

function generarBloques(codigo){
	bloques=[];
	cantidadOptimizaciones=0;
	indice=0;
	//debugger;
	//codigo3D=document.getElementById('editorCodigo3D').value;
	var raiz=null;
	try { 
		arreglo3D=codigo.split("\n");
	  	raiz=gramatica3D.parse(codigo);
	}catch (e) {
		//scope.txtConsola=e.message;
	  	console.log("Error: "+e.message);
	}

	for(var i=0;i<raiz.hijos.length;i++){
		
		primerBloque=true;
		bloqueInf=-1;
		bloqueSup=-1;
		construirBloques(raiz.hijos[i]);
	}

	return {"bloques":bloques,"arreglo3D":arreglo3D};
}


function optimizarFlujo(raiz){//metodo
	
	for(var i=0;i<raiz.hijos[0].hijos.length;i++){
		var sentencia=raiz.hijos[0].hijos[i];
		switch(sentencia.etiqueta){
			case "etiquetaLLegada":
				break;
			case "etiquetaSalida":
				break;
			case "saltoIncondicional":
				var saltoIncondicional=sentencia.valor;
				var salto=getEtiquetaLlegada(saltoIncondicional,raiz);
				setRegla(sentencia.linea-1,17);

				if(salto!=null){
					arreglo3D[sentencia.linea-1]=arreglo3D[sentencia.linea-1].replace(saltoIncondicional,salto);
					cantidadOptimizaciones++;
				}
				break;
			case "if":
				var saltoIncondicional=sentencia.hijos[1].valor;
				var salto=getEtiquetaLlegada(saltoIncondicional,raiz);


				if(salto!=null){
					arreglo3D[sentencia.linea-1]=arreglo3D[sentencia.linea-1].replace(saltoIncondicional,salto);
					cantidadOptimizaciones++;
					setRegla(sentencia.linea-1,18);
				}

				saltoIncondicional=sentencia.hijos[2].valor;
				salto=getEtiquetaLlegada(saltoIncondicional,raiz);

				if(salto!=null){
					arreglo3D[sentencia.linea-1]=arreglo3D[sentencia.linea-1].replace(saltoIncondicional,salto);
					cantidadOptimizaciones++;
					setRegla(sentencia.linea-1,18);
				}


				break;
		}
	}
}




function getEtiquetaLlegada(nombre,raiz){
	for(var i=0;i<raiz.hijos[0].hijos.length;i++){
		var sentencia=raiz.hijos[0].hijos[i];
		//debugger;
		switch(sentencia.etiqueta){
			case "etiquetaLLegada":
			case "etiquetaSalida":
				if(getEtiqueta(nombre,sentencia)!=null){
					if((i+1)<raiz.hijos[0].hijos.length){
						if(raiz.hijos[0].hijos[i+1].etiqueta==="saltoIncondicional"){
							return raiz.hijos[0].hijos[i+1].valor;
						}
					}
				}
				break;
		}
	}

	return null;
}


	function getEtiqueta(etiqueta,sentencia){
			//debugger;
			for(var j=0;j<sentencia.hijos[0].hijos.length;j++){
				var aux=sentencia.hijos[0].hijos[j];
				if(etiqueta===aux.valor){
					return etiqueta;
				}
			}
			return null;
		}



function construirBloques(raiz){
	for(var i=0;i<raiz.hijos[0].hijos.length;i++){
		var sentencia=raiz.hijos[0].hijos[i];
		//debugger;
		switch(sentencia.etiqueta){
			case "etiquetaLLegada":
				if(bloqueInf!=-1){
					bloqueSup=sentencia.linea-2;
					var b=new bloque(bloqueInf,bloqueSup,indice);
					bloques.push(b);
					indice++;
					bloqueInf=sentencia.linea-1;
					bloqueSup=-1;	
				}else{
					bloqueInf=sentencia.linea-1
				}
				break;
			case "etiquetaSalida":

				if(bloqueInf!=-1){
					bloqueSup=sentencia.linea-2;
					var b=new bloque(bloqueInf,bloqueSup,indice);
					bloques.push(b);
					indice++;
					bloqueInf=sentencia.linea-1;
					bloqueSup=-1;	
				}else{
					//bloqueInf.sentencia.linea-1;
				}
				break;
			case "saltoIncondicional":
				if(bloqueInf!=-1){
					bloqueSup=sentencia.linea-1;
					var b=new bloque(bloqueInf,bloqueSup,indice);
					bloques.push(b);
					indice++;
					bloqueInf=-1;
					bloqueSup=-1;	
				}
				break;
			case "if":

				if(bloqueInf!=-1){
					bloqueSup=sentencia.linea-1;
					var b=new bloque(bloqueInf,bloqueSup,indice);
					bloques.push(b);
					indice++;
					bloqueInf=-1;
					bloqueSup=-1;

					bloqueInf=sentencia.linea;
					bloqueSup=sentencia.linea;
					b=new bloque(bloqueInf,bloqueSup,indice);
					bloques.push(b);
					indice++;
					bloqueInf=-1;
					bloqueSup=-1;
				}

				break;
			case "asignacion":
			case "asignacionStack":
			case "asignacionHeap":
			case "asignacionPool":
			case "accesoStack":
			case "accesoHeap":
			case "accesoPool":
			case "llamada":
			case "printf":
				if(primerBloque){
					bloqueInf=sentencia.linea-1;
					primerBloque=false;
				}else if(i==raiz.hijos[0].hijos.length-1&&bloqueInf!=-1){
					bloqueSup=sentencia.linea-1;
					var b=new bloque(bloqueInf,bloqueSup,indice);
					bloques.push(b);
					indice++;
					bloqueInf=-1;
					bloqueSup=-1;	
				}
				break;
		}
	}
}


function optimizarExpresiones(raiz){
	//debugger;
	for(var i=0;i<raiz.hijos[0].hijos.length;i++){
		var sentencia=raiz.hijos[0].hijos[i];
		switch(sentencia.etiqueta){
			case "asignacion":
				aplicarRegla(sentencia);
				break;
		}
	}

}


function aplicarRegla(sentencia){
	
	var t1=sentencia.hijos[0];
	if(sentencia.hijos[1].hijos.length==2){
		var t2=sentencia.hijos[1].hijos[0];
		var t3=sentencia.hijos[1].hijos[1];
		switch(sentencia.hijos[1].etiqueta){
			case "+":
				if(t1.valor===t2.valor){
					if(t3.valor==0||t2.valor==0){
						setRegla(sentencia.linea,3);
						arreglo3D[sentencia.linea-1]="";
					}
				}else if(t1.valor===t3.valor){
					if(t3.valor==0||t2.valor==0){
						setRegla(sentencia.linea,3);
						arreglo3D[sentencia.linea-1]="";
					}	
				}else{
					if(t2.valor==0){
						setRegla(sentencia.linea,7);
						arreglo3D[sentencia.linea-1]=t1.valor+"="+t3.valor+";\n";
					}else if(t3.valor==0){
						setRegla(sentencia.linea,7);
						arreglo3D[sentencia.linea-1]=t1.valor+"="+t2.valor+";\n";
					}
				}
				break;
			case "-":
				if(t1.valor===t2.valor&&t3.valor===0){
					arreglo3D[sentencia.linea-1]="";
					setRegla(sentencia.linea,4);
				}else if(t1.valor!=t2.valor&&t3.valor==0){
					arreglo3D[sentencia.linea-1]=t1.valor+"="+t2.valor+";\n";
					setRegla(sentencia.linea,8);
				}
				break;
			case "*":
				if((t1.valor===t2.valor&&t3.valor===1)||(t1.valor===t3.valor&&t2.valor===1)){
					arreglo3D[sentencia.linea-1]="";
					setRegla(sentencia.linea,5)
				}else if(t1.valor!=t2.valor&&t3.valor==1){
					arreglo3D[sentencia.linea-1]=t1.valor+"="+t2.valor+";\n";
					setRegla(sentencia.linea,9);
				}else if(t1.valor!=t3.valor&&t2.valor==1){	
					arreglo3D[sentencia.linea-1]=t1.valor+"="+t3.valor+";\n";
					setRegla(sentencia.linea,9);
				}else if(t2.valor==0||t3.valor==0){
					arreglo3D[sentencia.linea-1]="0;\n";
					setRegla(sentencia.linea,10);
				}else if(t3.valor==2){
					arreglo3D[sentencia.linea-1]=t1.valor+"="+t2.valor+"+"+t2.valor+";\n";
					setRegla(sentencia.linea,16);
				}		
				break;
			case "/":
				if(t1.valor==t2.valor&&t3.valor==0){
					arreglo3D[sentencia.linea-1]="";
					setRegla(sentencia.linea,6);
				}else if(t1.valor!=t2.valor&&t3.valor==1){
					arreglo3D[sentencia.linea-1]=t2.valor+";\n";
					setRegla(sentencia.linea,11);
				}else if(t2.valor==0&&t3.valor!=0){
					arreglo3D[sentencia.linea-1]="0;\n";
					setRegla(sentencia.linea,12);
				}
				break;
			case "%":
				break;
			case "^":
				if(t2.valor!=0&&t3.valor==0){
					arreglo3D[sentencia.linea-1]="1;\n";
					setRegla(sentencia.linea,13);
				}else if(t3.valor==1){
					arreglo3D[sentencia.linea-1]=t1.valor+"="+t2.valor+";\n";
					setRegla(sentencia.linea,14);
				}else if(t3.valor==2){
					arreglo3D[sentencia.linea-1]=t1.valor+"="+t2.valor+"*"+t2.valor+";\n";
					setRegla(sentencia.linea,15);
				}
				break;
		}

	}
}