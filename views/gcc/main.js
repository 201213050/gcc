
function Iniciar(texto) {
    //console.log("Holaaa");
    //alert("Hola");

    var raiz=null;
		try {
            //var nodo = crearNodo("putas",1,20);
            //var texto = document.getElementById('texto').value;//obtiene el texto del area de texto
            raiz = gcc.parse(texto);	  	
	  		grafica(raiz);	  		  			
		}
		catch (e) {
			
	  		console.log("Error: "+e.message);
		}

}



function IniciarVariables() {
    tablaSimbolos = [];
    claseActual = "";
    metodoActual = "";
    ambito = [];
    ambito.push("Global");
  
}