var optimizado=false;
var codigoOptimizadoX;
app.controller('optiCtrl', function(basic) {
	var scope=this;

	
	//writeNext(1);


	scope.txtCodigoOrignal="";
	scope.txtCodigoOptimizado="";

	var bloques=generarBloques(codigo3D+core3D);
	var codigoOptimizado=optimizar(codigo3D+core3D);
codigoOptimizadoX=codigoOptimizado;
	scope.codigoOriginal=codigo3D+core3D;
	scope.codigoOptimizado=getCodigo(codigoOptimizado.arreglo3D);
	
	codigo3D=scope.codigoOptimizado;
	optimizado=true;


	scope.interpretar=function(){
		optimizado=true;
		codigo3D=scope.codigoOptimizado;

		/*
		var raiz=null;
		try { 
			consola3D="";

	  		raiz=gramatica3D.parse(scope.codigoOptimizado);
	  		interprete3D=new interprete();



	  		//interprete3D.ejecucionGlobal(raiz);
	  		interprete3D.ejecutarMetodoPrincipal(raiz);
	  		scope.txtConsola=consola3D;
	  			
		}
		catch (e) {
			scope.txtConsola=e.message;
	  		console.log("Error: "+e.message);
		}
		*/
	}

	scope.respaldarDatos=function(){
		//scope.txtMetodos=document.getElementById('editorPrograma').value;
		//scope.txtEstructuras=document.getElementById('editorEstructuras').value;
		//basic.txtMetodos=scope.txtMetodos;
		//basic.txtEstructuras=scope.txtEstructuras;
	}


	scope.graficar=function(){
		generarGraficas(scope.codigoOptimizado);
	}

});



function generarGraficas(codigoOptimizado){


}


	