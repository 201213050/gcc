app.controller('mediumLoadCtrl', function($scope) {
	blocklyMedium();
});






app.controller('mediumCtrl', function($scope,basic) {
	$scope.funciones =[];
	$scope.estructuras=[];

	$scope.actualizar=function(){
		$scope.funciones=[];
		$scope.funciones=funciones;
	}

	$scope.mostrarFuncion=function(){
		//debugger;
		$scope.txtCodigo=$scope.funcionSeleccionada.codigo;

	}

	$scope.guardarFuncion=function(){
		//debugger;
		for(var i=0;i<funciones.length;i++){
   			if(funciones[i].id===$scope.funcionSeleccionada.id){
   				funciones[i].codigo=$scope.txtCodigo;
   				$scope.funcionSeleccionada.codigo=$scope.txtCodigo;
   			}
   		}
   		$scope.funciones=funciones;
	}

	$scope.guardarElement=function(){
		//debugger;
		for(var i=0;i<estructuras.length;i++){
   			if(estructuras[i].id===$scope.estructuraSeleccionada.id){
   				estructuras[i].codigo=$scope.txtCodigo;
   				$scope.estructuraSeleccionada.codigo=$scope.txtCodigo;
   			}
   		}
   		$scope.estructuras=estructuras;
	}

   $scope.actualizarCodigo=function(){
   		/*for(var i=0;i<funciones.length;i++){
   			if(funciones[i].id===$scope.funcionSeleccionada.id){
   				funciones[i].codigo=$scope.txtCodigo;
   				$scope.funcionSeleccionada.codigo=$scope.txtCodigo;
   			}
   		}
   		$scope.funciones=funciones;*/
   }



   	$scope.actualizarEstructura=function(){
		$scope.estructuras=[];
		$scope.estructuras=estructuras;
	}

	$scope.mostrarEstructura=function(f){
		//debugger;
		$scope.txtCodigo=$scope.estructuraSeleccionada.codigo;

	}



	   $scope.actualizarCodigo2=function(){
	  /* //	debugger;
   		for(var i=0;i<estructuras.length;i++){
   			if(estructuras[i].id===$scope.estructuraSeleccionada.id){
   				estructuras[i].codigo=$scope.txtCodigo;
   				$scope.estructuraSeleccionada.codigo=$scope.txtCodigo;
   			}
   		}
   		$scope.estructuras=estructuras;*/
   }


$scope.generarCodigo=function(){
	codigoAltoNivel="";
	for(var i=0;i<estructuras.length;i++){
		codigoAltoNivel+=estructuras[i].codigo;
	}

	for(var i=0;i<funciones.length;i++){
		codigoAltoNivel+=funciones[i].codigo;
	}
}

   $scope.compilar=function(){
   			$scope.generarCodigo();
   			var raiz=null;
		try {
	  		raiz=gramaticaHard3D.parse(codigoAltoNivel);
	  		grafica(raiz);

	  		compilador=new compiladorBasic(raiz);

	  		compilador.iniciar(raiz);
	  		basic.txtCodigo3D=codigo3D;
	  		basic.txtConsola="";
	  			
		}
		catch (e) {
			scope.txtEstructuras=e.message;
	  		console.log("Error: "+e.message);
		}
   }


   $scope.debuggear=function(){
   	 $scope.generarCodigo();
   	 cambiar();
   }


});

var funciones=[];
var estructuras=[];

class funcion{

	constructor(nombre){
		this.nombre=nombre;
		this.codigo="";
		this.editado=false;
		this.tipo;
		this.id;
	}
}

class estructura{

	constructor(nombre){
		this.nombre=nombre;
		this.codigo="";
		this.editado=false;
		this.tipo;
		this.id;
	}
}



function setFuncion(funcion){
	var aux=getFuncion(funcion.id);
	if(aux==null){
		funciones.push(funcion);
	}
}

function getFuncion(id){
	for(var i=0;i<funciones.length;i++){
		var funcion=funciones[i];
		if(id===funcion.id){
			return funcion;
		}
	}
	return null;
}

function modificarObjeto(objeto){
	for(var i=0;i<funciones.length;i++){
		if(funciones[i].id===objeto.id){
			
			funciones[i]=objeto;
			break;
		}
	}
}





function modificarEstructura(objeto){
	for(var i=0;i<estructuras.length;i++){
		if(estructuras[i].id===objeto.id){
			estructuras[i]=objeto;
			break;
		}
	}
}


function setElement(funcion){
	var aux=getElement(funcion.id);
	if(aux==null){
		estructuras.push(funcion);
	}
}



function getElement(id){
	for(var i=0;i<estructuras.length;i++){
		var funcion=estructuras[i];
		if(id===funcion.id){
			return funcion;
		}
	}
	return null;
}