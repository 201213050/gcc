app.controller('bloqueCtrl', function() {
	var scope=this;
	scope.bloques=[];

	//codigo3D=scope.txtMetodos=document.getElementById('editorCodigo3D').value;
	//debugger;
	var bloques=generarBloques(codigo3D+core3D);
	var codigoOptimizado=optimizar(codigo3D+core3D);
	//debugger;
	//var bloquesOpti=optimizar(scope.txtMetodos=document.getElementById('editorCodigo3D').value);
	var content="<table align=\"center\" border=1 cellspacing=0 cellpadding=2 >";
	content+="<tr>"+"<th>Codigo original</th>"+"<th>Codigo optimizado</th>"+"<th>Reglas aplicadas</th>"+"<th>No. bloque</th>"+"/<tr>";
	for(var i=0;i<bloques.bloques.length;i++){
		var bloque=bloques.bloques[i];
		var bloqueOp=codigoOptimizado.bloques[i];
		content+="<tr>"
		var bloque={"original":getCadena(bloque.inf,bloque.sup,bloques.arreglo3D),"optimizado":getCadena(bloqueOp.inf,bloqueOp.sup,codigoOptimizado.arreglo3D),"reglas":getReglas(bloqueOp.reglas),"indice":bloque.indice};
		
		content+="<td>";
		content+=bloque.original;
		content+="</td>";
		content+="<td>";
		content+=bloque.optimizado;
		content+="</td>";
		content+="<td>";
		content+=bloque.reglas;
		content+="</td>";
		content+="<td>";
		content+=bloque.indice;
		content+="</td>";
		content+="</tr>";
	}
	
	content+="</table>";

	scope.agregar=function(){
		$("#tablaBloques").html(content);	
	}
	scope.agregar();

});


function getReglas(arreglo){
	var cadena="";
	for(var i=0;i<arreglo.length;i++){
		cadena+=arreglo[i]+"<br/>";
	}
	return cadena;
}

function getCadena(inf,sup,arreglo3D){
	var cadena="";
	for(var i=inf;i<=sup;i++){
		cadena+=arreglo3D[i]+"<br/>";
	}
	return cadena;
}


