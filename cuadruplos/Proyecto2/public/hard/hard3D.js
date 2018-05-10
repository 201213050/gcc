
function cambiar(){
	//debugger;
	 pagina="\\debug\\debug.html";

	 var json={"nombre":"jose","carnet":"201213402"}
	 	var uri_enc = encodeURIComponent(codigoAltoNivel);
        url=pagina+"?codigo="+uri_enc;
        window.open(url);
        //location.href=url;
}

app.controller('hard3DCtrl', function(basic) {
	var scope=this;
	//debugger;
	//scope.txtCodigo3D=basic.txtCodigo3D;
	if(optimizado){
		scope.txtCodigo3D=codigo3D;
		optimizado=false;
	}else{
		scope.txtCodigo3D=codigo3D+core3D;
		scope.txtConsola=basic.txtConsola;
	}

	/*
	scope.descargarPrograma=function(){
		//scope.txtMetodos=document.getElementById('editorPrograma').value;
		if(scope.txtMetodos){
			downloadB("basic3D.b3D",scope.txtMetodos);
			alert("Descargando archivo...");
		}else{
			alert("Editor vacio, descarga abortada");
		}
	}	*/

	/*
	scope.descargarEstructuras=function(){
		//scope.txtEstructuras=document.getElementById('editorEstructuras').value;
		if(scope.txtMetodos){
			downloadS("basic3D.s3D",scope.txtEstructuras);
			alert("Descargando archivo...");
		}else{
			alert("Editor vacio, descarga abortada");
		}
	}
	*/
	/*
	scope.inicio=function(){
		document.getElementById('archivo').addEventListener('change', upload, false); 
	}

	scope.cargar=function(){
		upload();
	}*/
/*
	scope.compilar=function(){
		
		var raiz=null;
		try {

	  		raiz=gramaticaHard3D.parse(scope.txtMetodos);
	  		grafica(raiz);
	  		//debugger;
	  		compilador=new compiladorBasic(raiz);
	  		compilador.iniciar(raiz);
	  		scope.txtMetodos2=codigo3D;
	  		//scope.txtEstructuras=encabezadoCodigo3D+"\n"+codigo3D;
	  			
		}
		catch (e) {
			scope.txtEstructuras=e.message;
	  		console.log("Error: "+e.message);
		}
	}	*/


	scope.interpretar=function(){
		
		var raiz=null;
		try { 
			consola3D="hola!";
			cadena="";

			raiz=cuadruplos.parse(scope.txtCodigo3D);
			cadena=grafica(raiz);
	  		interprete4D=new interprete();



			//interprete3D.ejecucionGlobal(raiz);
			//interpretar cuadrupo  
	  		interprete3D.ejecutarMetodoPrincipal(raiz);
	  		scope.txtConsola=cadena;
	  			
		}
		catch (e) {
			scope.txtConsola=e.message;
	  		console.log("Error: "+e.message);
		}
	}

	scope.respaldarDatos=function(){
		scope.txtCodigo3D=document.getElementById('editorCodigo3D').value;
		scope.txtConsola=document.getElementById('editorConsola').value;
		basic.txtCodigo3D=scope.txtCodigo3D;
		basic.txtConsola=scope.txtConsola;
	}

});

/*
	function downloadB(filename, text)

	{

		var element = document.createElement('a');

		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));

		element.setAttribute('download', filename);

 

		element.style.display = 'none';

		document.body.appendChild(element);

 

		element.click();

 

		document.body.removeChild(element);

	}

		function downloadS(filename, text)

	{

		var element = document.createElement('a');

		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));

		element.setAttribute('download', filename);

 

		element.style.display = 'none';

		document.body.appendChild(element);

 

		element.click();

 

		document.body.removeChild(element);

	}

	function upload(ev) {
        var arch=new FileReader();
        arch.addEventListener('load',leer,false);
        arch.readAsText(ev.target.files[0]);
    }
    
    function leer(ev) {
        document.getElementById('editorPrograma').value=ev.target.result;
    }*/