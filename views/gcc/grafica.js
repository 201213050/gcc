var cadenaDot="";
function grafica(   ) {
		cadenaDot="";
        cadenaDot = cadenaDot + "digraph lista{ rankdir=TB;node [shape = box, style=rounded]; ";
        recorrerArbol(opRaiz);
        cadenaDot = cadenaDot + "}";
}

function recorrerArbol(raiz){
	if (raiz.valor != null) {

            var valor = raiz.valor+"";
            valor = valor.replace(/\"/g, "\\\"");
            cadenaDot = cadenaDot  + raiz.codigo + "[label=\"" + valor + "  [" + raiz.etiqueta + "]{" + raiz.linea +","+raiz.columna+ "} \", color=\"cyan\", style =\"filled\", shape=\"doublecircle\"]; \n";
        } else {
            cadenaDot = cadenaDot  + raiz.codigo + "[label=\"" + raiz.etiqueta +"  {"+raiz.linea+"," +raiz.columna+ "} \", color=\"cyan\", style =\"filled\", shape=\"doublecircle\"]; \n";
        }

        for(var i=0;i<raiz.hijos.length;i++) {
        	var hijo=raiz.hijos[i];
            cadenaDot = cadenaDot + "\"" + raiz.codigo + "\"-> \"" + hijo.codigo + "\"" + "\n";
        }

        for(var i=0;i<raiz.hijos.length;i++) {
        	var hijo=raiz.hijos[i];
            recorrerArbol(hijo);
        }

}

