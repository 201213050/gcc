
function Iniciar(texto) {
    limpiarErrores();

    var raiz=null;
        try 
        {         
            raiz = gcc.parse(texto);	  	
	  		grafica(raiz);	  		  			
		}
		catch (e) {
			
              console.log("Error: "+e.message);
              addSalida(e.message);
              
              if(e.hash.token=="INVALIDO")
              {
                addError(e.hash.loc.first_line, e.hash.loc.first_column, "Lexico", e.message);
              }
              else
              {
                addError(e.hash.loc.first_line, e.hash.loc.first_column, "Sintactico", e.message);
              }
              //
		}
        
}



function IniciarVariables() {
    tablaSimbolos = [];
    claseActual = "";
    metodoActual = "";
    ambito = [];
    ambito.push("Global");
  
}


