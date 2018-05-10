
function writeNext(i)
{
    document.write(i);

    if(i == 5)
        return;

    setTimeout(function()
    {
        writeNext(i + 1);

    }, 2000);
}


function proceso(){
	while(true){

	}
}


app.controller('hardCtrl', function(basic) {
	var scope=this;

	
	//writeNext(1);


	scope.txtMetodos=basic.txtMetodos;
	scope.txtEstructuras=basic.txtEstructuras;


	scope.descargarPrograma=function(){
		//scope.txtMetodos=document.getElementById('editorPrograma').value;
		if(scope.txtMetodos){
			downloadB("basic3D.b3D",scope.txtMetodos);
			alert("Descargando archivo...");
		}else{
			alert("Editor vacio, descarga abortada");
		}
	}	

	scope.descargarEstructuras=function(){
		//scope.txtEstructuras=document.getElementById('editorEstructuras').value;
		if(scope.txtMetodos){
			downloadS("basic3D.s3D",scope.txtEstructuras);
			alert("Descargando archivo...");
		}else{
			alert("Editor vacio, descarga abortada");
		}
	}

	scope.inicio=function(tipo){
		if(tipo==1){
			document.getElementById('archivo').addEventListener('change', upload, false); 
		}else{
			document.getElementById('archivo2').addEventListener('change', upload2, false); 
		}
	}

	scope.cargar=function(){
		upload();
	}

	scope.compilar=function(){
		
		var raiz=null;
		try {

			codigoAltoNivel=scope.txtMetodos+scope.txtEstructuras;

	  		raiz=gramaticaHard3D.parse(codigoAltoNivel);
	  		//debugger;
	  		//codigoAltoNivel=scope.txtMetodos;
	  		grafica(raiz);
	  		//debugger;
	  		compilador=new compiladorBasic(raiz);

	  		compilador.iniciar(raiz);
	  		basic.txtCodigo3D=codigo3D;
	  		basic.txtConsola="";
	 
	  		//scope.txtEstructuras=codigo3D;
	  		//scope.txtEstructuras=encabezadoCodigo3D+"\n"+codigo3D;
	  			
		}
		catch (e) {
			scope.txtEstructuras=e.message;
	  		console.log("Error: "+e.message);
		}
	}


	scope.interpretar=function(){
		
		var raiz=null;
		try { 
	  		raiz=gramatica3D.parse(scope.txtEstructuras);
	  		interprete3D=new interprete();

	  		interprete3D.ejecucionGlobal(raiz);
	  		interprete3D.ejecutarMetodoPrincipal();
	  		//console.log(raiz);
	  			
		}
		catch (e) {
			scope.txtEstructuras=e.message;
	  		console.log("Error: "+e.message);
		}
	}


	scope.actualizarTxtEstructuras= function (){
		//scope.txtEstructuras=scope.txtMetodos;
	}

	scope.respaldarDatos=function(){
		scope.txtMetodos=document.getElementById('editorPrograma').value;
		scope.txtEstructuras=document.getElementById('editorEstructuras').value;
		basic.txtMetodos=scope.txtMetodos;
		basic.txtEstructuras=scope.txtEstructuras;
	}

});


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
    }


    function upload2(ev) {
        var arch=new FileReader();
        arch.addEventListener('load',leer2,false);
        arch.readAsText(ev.target.files[0]);
    }
    
    function leer2(ev) {
        document.getElementById('editorEstructuras').value=ev.target.result;
    }