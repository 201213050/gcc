var encabezadoCodigo3D="";//donde se guardaran las declaraciones del heap, stack, pool y temparales

var temporal=1;
var etiqueta=1;

var codigoAltoNivel="";
var codigo3D="";
var consola3D="";
var core3D="";
var constructores3D="";
var codigoOptimizado="";

function genTemp(){
	var temp="t"+(temporal++);
	encabezadoCodigo3D+="int "+temp+";\n";
	return temp;
}

function genEti(){
	var eti="l"+(etiqueta++);
	return eti;
}


function iniciar(){
	encabezadoCodigo3D+="double[] stack=new double[1000];\n";
	encabezadoCodigo3D+="double[] heap=new double[1000];\n";
	encabezadoCodigo3D+="double[] pool=new double[1000];\n\n";
	encabezadoCodigo3D+="int p=0;\n";//puntero del stack
	encabezadoCodigo3D+="int h=0;\n";//puntero del heap
	encabezadoCodigo3D+="int s=0;\n\n";//puntero del string pool
}

function reiniciar(){
	temporal=1;
	etiqueta=1;
	codigo3D="";
	core3D="";
	codigoOptimizado="";
	encabezadoCodigo3D="";
	constructores3D="";
}