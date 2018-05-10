
app.controller('graficaCtrl', function() {
	var scope=this;

	scope.agregarGrafica=function(){

	}	

	//debugger;
	var cadenaDot="digraph {";
	for(var i=0;i<codigoOptimizadoX.bloques.length;i++){
		var bloque=codigoOptimizadoX.bloques[i];
		var cadena=getCadena(bloque.inf,bloque.sup,codigoOptimizadoX.arreglo3D);

		cadenaDot+="subgraph cluster"+i+"{  node [style=filled]; label=\"cadena\"; color=blue }";

	}
	

	cadenaDot+="}"
	$('#idDiv').html(Viz(cadenaDot));
	scope.respaldarDatos=function(){
		//scope.txtMetodos=document.getElementById('editorPrograma').value;
		//scope.txtEstructuras=document.getElementById('editorEstructuras').value;
		//basic.txtMetodos=scope.txtMetodos;
		//basic.txtEstructuras=scope.txtEstructuras;
	}

});

