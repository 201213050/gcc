
function Iniciar(texto) {


    var raiz=null;
        try 
        {         
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


