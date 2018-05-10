
function agregarCore(){
	coreGetInt();
	coreGetStr();
	coreConcat();
	coreGetStrBool();


	//----------core basic3D

	coreOutStr();
	coreOutNum();
	coreInStr();
	coreInNum();
	coreShow();
	coreGetRandom();
	coreGetStrLength();
	coreGetBool();
	//---------------------

	coreIgualIgual();
	coreNoIgual();
	coreMayor();
    coreMayorIgual();

    coreExit();
	//codigo3D+=core3D;
}


function coreConcat(){
	var temp1=genTemp();
	core3D+="//metodo 3D que concatena 2 cadenas\n";
	core3D+="void concat(){\n";
	core3D+=temp1+"=p+1; //cadena1\n";

	var temp2=genTemp();
	core3D+=temp2+"=stack["+temp1+"]; //puntero al pool\n";
    
    //var temp3=genTemp();
    //core3D+=temp3+"=heap["+temp2+"]; //puntero a pool\n";

    var temp4=genTemp();
    core3D+=temp4+"=s; //nueva cadena\n";
    //core3D+="h=h+1;\n";
	//core3D+="heap["+temp4+"]=s;\n";

	var eti1=genEti();
	core3D+=eti1+":\n";

	var temp5=genTemp();
	core3D+=temp5+"=pool["+temp2+"]; //extrayendo caracter\n";

	var eti2=genEti();
	var eti3=genEti();
	core3D+="if("+temp5+"!=0) goto "+eti2+";\n";
	core3D+="goto "+eti3+";\n";

	core3D+=eti2+":\n";
	core3D+="pool[s]="+temp5+"; //almacenando caracter\n";
	core3D+="s=s+1;\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+="goto "+eti1+";\n";

	core3D+=eti3+":\n";

	var temp6=genTemp();
	core3D+=temp6+"=p+2; //cadena2\n";
	
	var temp7=genTemp();
	core3D+=temp7+"=stack["+temp6+"]; //puntero al pool\n";

	//var temp8=genTemp();
	//core3D+=temp8+"=heap["+temp7+"]; //puntero a pool\n"

	var eti4=genEti();
	core3D+=eti4+":\n";

	var eti5=genEti();
	var eti6=genEti();
	var temp9=genTemp();

	core3D+=temp9+"=pool["+temp7+"]; //extrayendo caracter\n";
	core3D+="if("+temp9+"!=0) goto "+eti5+";\n";
	core3D+="goto "+eti6+";\n";

	core3D+=eti5+":\n";
	core3D+="pool[s]="+temp9+"; //almacenando caracter\n";
	core3D+="s=s+1;\n";
	core3D+=temp7+"="+temp7+"+1;\n";
	core3D+="goto "+eti4+";\n";

	core3D+=eti6+":\n";
	core3D+="pool[s]=0;\n";
	core3D+="s=s+1;\n";

	var temp10=genTemp();
	core3D+=temp10+"=p+0; //return del metodo\n";
	core3D+="stack["+temp10+"]="+temp4+";\n";

	core3D+="}\n\n";
}


function coreGetInt(){

	core3D+="void getInt(){\n";

	var temp1=genTemp();
	core3D+=temp1+"=p+1;\n";

	var temp2=genTemp();
	core3D+=temp2+"=stack["+temp1+"];\n";
	core3D+=temp2+"="+temp2+"+0.0000000001;\n";

	var temp3=genTemp();
	core3D+=temp3+"=0;\n";

	var eti1=genEti();
	var eti2=genEti();
	core3D+="if("+temp2+"<0) goto "+eti1+";\n";
	core3D+="goto "+eti2+";\n";

	core3D+=eti1+":\n";
	var eti3=genEti();
	var eti4=genEti();
	var tempUni=genTemp();
	core3D+=tempUni+"=-1;\n";
	core3D+="if("+temp2+">="+tempUni+") goto "+eti3+";\n";
	core3D+="goto "+eti4+";\n";

	core3D+=eti4+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp3+"="+temp3+"+1;\n";
	core3D+="goto "+eti1+";\n";

	core3D+=eti2+":\n";
	var eti5=genEti();
	core3D+="if("+temp2+"<=1) goto "+eti3+";\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti5+":\n";
	core3D+=temp2+"="+temp2+"-1;\n";
	core3D+=temp3+"="+temp3+"+1;\n";
	core3D+="goto "+eti2+";\n";

	core3D+=eti3+":\n";
	var temp4=genTemp();
	core3D+=temp4+"=p+0;\n";
	core3D+="stack["+temp4+"]="+temp3+";\n"

	core3D+="}\n\n";
}



function coreGetStr(){
//----------------------------------------------
    var tempExt=genTemp();
    var eti12=genEti();
    var eti13=genEti();

    var etiSalida=genEti();
//----------------------------------------------
	core3D+="void getStr(){\n";

	var temp1=genTemp();
	var temp2=genTemp();
	core3D+=temp1+"=p+1;\n";
	core3D+=temp2+"=stack["+temp1+"]; //numero a convertir\n";

	var eti1=genEti();
    //-----------------------------------------------------------si es 0
	core3D+="if("+temp2+"==0) goto "+eti12+";\n";
	core3D+="goto "+eti1+";\n";

	core3D+=eti12+":\n";
	core3D+=tempExt+"=s;\n";
	core3D+="pool[s]=48;\n";
	core3D+="s=s+1;\n";
	core3D+="goto "+eti13+";\n";
	//-----------------------------------------------------------------------

	
	core3D+=eti1+":\n";

	var temp3=genTemp();
	core3D+=temp3+"=p+2; //simulacion de cambio de ambito\n";

	var temp4=genTemp();
	core3D+=temp4+"="+temp3+"+1; //parametro del metodo getInt\n";
	core3D+="stack["+temp4+"]="+temp2+";\n";

	core3D+="p=p+2; //cambio de ambito real\n";
	core3D+="getInt();\n";

	var temp5=genTemp();
	core3D+=temp5+"=p+0; //acceso al return del metodo getInt\n";

	var temp6=genTemp();
	core3D+=temp6+"=stack["+temp5+"]; //parte entera\n";
	core3D+="p=p-2;  //regreso al metodo getStr\n";

	var eti2=genEti();
	var eti3=genEti();
	core3D+="if("+temp6+">0) goto "+eti2+";\n";
	core3D+="goto "+eti3+";\n";

	core3D+=eti2+":\n";

	var temp7=genTemp();
	core3D+=temp7+"="+temp6+"%10; //extrayendo digito\n";
	temp6=genTemp();
	core3D+=temp6+"="+temp7+"+48;\n";
	core3D+="pool[s]="+temp6+"; //agregando digito al pool\n";
	core3D+="s=s+1;\n";

	core3D+=temp2+"="+temp2+"/10;\n";
	core3D+="goto "+eti1+";\n";

	core3D+=eti3+":\n";

	//agregando caracter de fin de cadena
	core3D+="pool[s]=0; //caracter de finde cadena\n";
	var temp8=genTemp();
	core3D+=temp8+"=s; //parte entera al revez\n";//**************************************
	core3D+="s=s+1;\n";


	//parte decimal
	temp2=genTemp();
	core3D+=temp2+"=stack["+temp1+"]; //numero a convertir\n";

//--

	temp3=genTemp();
	core3D+=temp3+"=p+2; //simulacion de cambio de ambito\n";

	temp4=genTemp();
	core3D+=temp4+"="+temp3+"+1; //parametro del metodo getInt\n";
	core3D+="stack["+temp4+"]="+temp2+";\n";

	core3D+="p=p+2; //cambio de ambito real\n";
	core3D+="getInt();\n";

	temp5=genTemp();
	core3D+=temp5+"=p+0; //acceso al return del metodo getInt\n";

	temp6=genTemp();
	core3D+=temp6+"=stack["+temp5+"]; //parte entera\n";
	core3D+="p=p-2;  //regreso al metodo getStr\n";


		//obteniendo parte decimal
	var temp22=genTemp();
	core3D+=temp22+"="+temp2+"^2;\n";
	var temp23=genTemp();
	core3D+=temp23+"=1.0/2.0;\n";

	var temp24=genTemp();
	core3D+=temp24+"="+temp22+"^"+temp23+";\n";

	var temp9=genTemp();
	core3D+=temp9+"="+temp24+"-"+temp6+"; // decimal\n";
	
	var temp10=genTemp();
	core3D+=temp10+"="+temp9+"^2;\n";

	var temp11=genTemp();
	core3D+=temp11+"="+temp10+"^"+temp23+";\n";

	var temp12=genTemp();
	core3D+=temp12+"="+temp11+"*10000;\n";


	var eti4=genEti()
	var eti5=genEti();

	core3D+="if("+temp12+"!=0) goto "+eti4+"; //si contiene parte decimal\n";
	core3D+="goto "+eti5+"; //si no contiene parte decimal\n";

	core3D+=eti4+":\n";

	
	temp3=genTemp();
	core3D+=temp3+"=p+2; //simulacion de cambio de ambito\n";

	temp4=genTemp();
	core3D+=temp4+"="+temp3+"+1; //parametro del metodo getInt\n";
	core3D+="stack["+temp4+"]="+temp12+";\n";

	core3D+="p=p+2; //cambio de ambito real\n";
	core3D+="getInt();\n";

	temp5=genTemp();
	core3D+=temp5+"=p+0; //acceso al return del metodo getInt\n";

	temp6=genTemp();
	core3D+=temp6+"=stack["+temp5+"]; //parte entera\n";
	core3D+="p=p-2;  //regreso al metodo getStr\n";




	eti2=genEti();
	eti3=genEti();
	core3D+="if("+temp6+">0) goto "+eti2+";\n";
	core3D+="goto "+eti3+";\n";

	core3D+=eti2+":\n";

	temp7=genTemp();
	var temp89=genTemp();
	core3D+=temp7+"="+temp6+"%10; //extrayendo digito\n";
	core3D+=temp89+"="+temp7+"+48; //ascci del digito\n";
	core3D+="pool[s]="+temp89+"; //agregando digito al pool\n";
	core3D+="s=s+1;\n";

	core3D+=temp12+"="+temp12+"/10;\n";
	core3D+="goto "+eti4+";\n";

	core3D+=eti3+":\n";
		var temp13=genTemp();
		core3D+=temp13+"=46; //simbolo de decimal . \n";
		core3D+="pool[s]="+temp13+";\n";
		core3D+="s=s+1;\n";


	core3D+=eti5+":\n";
	var temp88=genTemp();
	core3D+=temp88+"=s; //parte decimal\n";

	core3D+="pool[s]=0;\n";
	core3D+="s=s+1;\n";

	var temp13=genTemp();

	core3D+=temp13+"=s; //cadena convertida\n";

	var temp14=genTemp();
	core3D+=temp14+"=stack["+temp1+"];\n";

	var eti6=genEti();
	var eti7=genEti();

	core3D+="if("+temp14+"<0) goto "+eti6+"; //si en numero a convertir es negativo\n";
	core3D+="goto "+eti7+";\n";
//--------------------------------------
	core3D+=eti6+":\n";
	var temp15=genTemp();
	core3D+=temp15+"=45;\n";
	core3D+="pool[s]="+temp15+";\n";
	core3D+="s=s+1;\n";
	
	core3D+=eti7+":\n";
	core3D+=temp8+"="+temp8+"-1;\n";
	var temp16=genTemp();
	core3D+=temp16+"=pool["+temp8+"];\n";

	var eti8=genEti();
	var eti9=genEti();
	core3D+="if("+temp16+"!=0) goto "+eti8+";\n";
	core3D+="goto "+eti9+";\n";

	core3D+=eti8+":\n";
	core3D+="pool[s]="+temp16+";\n";
	core3D+="s=s+1;\n";
	core3D+="goto "+eti7+";\n";


//decimal
	core3D+=eti9+":\n";

	core3D+=temp88+"="+temp88+"-1;\n";
	var temp17=genTemp();
	core3D+=temp17+"=pool["+temp88+"];\n";

	var eti10=genEti();
	var eti11=genEti();
	core3D+="if("+temp17+"!=0) goto "+eti10+";\n";
	core3D+="goto "+eti11+";\n";

	core3D+=eti10+":\n";
	core3D+="pool[s]="+temp17+";\n";
	core3D+="s=s+1;\n";
	core3D+="goto "+eti9+";\n";

	core3D+=eti11+":\n";
	var temp18=genTemp();
	core3D+="pool[s]=0;\n";
	core3D+="s=s+1;\n";

	core3D+=temp18+"=p+0; //retorno\n";
	core3D+="stack["+temp18+"]="+temp13+";\n";

	core3D+="goto "+etiSalida+";\n";

	//si el valor a convertir es 0
	core3D+=eti13+":\n";
	temp18=genTemp();
	core3D+="pool[s]=0;\n";
	core3D+="s=s+1;\n";

	core3D+=temp18+"=p+0; //retorno\n";
	core3D+="stack["+temp18+"]="+tempExt+";\n";

	core3D+=etiSalida+":  ;\n";

	core3D+="}\n\n";

}



function coreGetStrBool(){

	core3D+="void getStrBool(){\n";

	var temp1=genTemp();
	core3D+=temp1+"=p+1;\n";
	var temp2=genTemp();
	core3D+=temp2+"=stack["+temp1+"];\n";

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	var temp3=genTemp();
	core3D+=temp3+"=s;\n";
	core3D+="if("+temp2+"==1) goto "+eti1+"; //si es true\n";
	core3D+="goto "+eti2+"; //si es false\n";

	core3D+=eti1+":\n";//si es true
	core3D+="pool[s]=116; //t\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=114; //r\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=117; //u\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=101; //e\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=0; //0\n";
	core3D+="s=s+1;\n";
	core3D+="goto "+eti3+";\n";

	core3D+=eti2+":\n";//si es false

	core3D+="pool[s]=102; //f\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=97; //a\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=108; //l\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=115; //s\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=101; //e\n";
	core3D+="s=s+1;\n";

	core3D+="pool[s]=0; //0\n";
	core3D+="s=s+1;\n";

	core3D+=eti3+":\n";

	var temp4=genTemp();
	core3D+=temp4+"=p+0; //retorno\n";
	core3D+="stack["+temp4+"]="+temp3+";\n";

	core3D+="}\n\n";

}




function coreIgualIgual(){

	core3D+="void igualIgual(){\n";

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	var temp5=genTemp();
	var temp6=genTemp();

	var temp7=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	var eti4=genEti();
	var eti5=genEti();
	var eti6=genEti();

	core3D+=temp1+"=p+1; //direccion de parametro1\n";
	core3D+=temp2+"=stack["+temp1+"]; //cadena1\n";

	core3D+=temp3+"=p+2; //direccion de parametro2\n";
	core3D+=temp4+"=stack["+temp3+"]; //cadena2\n";	

	core3D+=eti1+":\n";
	core3D+=temp5+"=pool["+temp2+"];\n";
	core3D+=temp6+"=pool["+temp4+"];\n";

	core3D+="if("+temp5+"=="+temp6+") goto "+eti2+"; //si son iguales\n";
	core3D+="goto "+eti3+"; //si no son iguales\n";

	core3D+=eti2+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp4+"="+temp4+"+1;\n";

	core3D+="if("+temp5+"!=0) goto "+eti1+"; //si es caracter de fin de cadena\n";
	core3D+="goto "+eti4+";\n";

	core3D+=eti3+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=0; //false\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti4+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=1; //true\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti5+": ;\n";

	core3D+="}\n\n";
}


function coreNoIgual(){



	core3D+="void noIgual(){\n";

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	var temp5=genTemp();
	var temp6=genTemp();

	var temp7=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	var eti4=genEti();
	var eti5=genEti();
	var eti6=genEti();

	core3D+=temp1+"=p+1; //direccion de parametro1\n";
	core3D+=temp2+"=stack["+temp1+"]; //cadena1\n";

	core3D+=temp3+"=p+2; //direccion de parametro2\n";
	core3D+=temp4+"=stack["+temp3+"]; //cadena2\n";	

	core3D+=eti1+":\n";
	core3D+=temp5+"=pool["+temp2+"];\n";
	core3D+=temp6+"=pool["+temp4+"];\n";

	core3D+="if("+temp5+"=="+temp6+") goto "+eti2+"; //si son iguales\n";
	core3D+="goto "+eti3+"; //si no son iguales\n";

	core3D+=eti2+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp4+"="+temp4+"+1;\n";

	core3D+="if("+temp5+"!=0) goto "+eti1+"; //si es caracter de fin de cadena\n";
	core3D+="goto "+eti4+";\n";

	core3D+=eti3+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=1; //no es igual\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti4+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=0; //es igual\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti5+": ;\n";

	core3D+="}\n\n";




	/*
	core3D+="void noIgual(){\n";

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	var temp5=genTemp();
	var temp6=genTemp();

	var temp7=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	var eti4=genEti();
	var eti5=genEti();
	var eti6=genEti();

	core3D+=temp1+"=p+1; //direccion de parametro1\n";
	core3D+=temp2+"=stack["+temp1+"]; //cadena1\n";

	core3D+=temp3+"=p+2; //direccion de parametro2\n";
	core3D+=temp4+"=stack["+temp3+"]; //cadena2\n";	

	core3D+=eti1+":\n";
	core3D+=temp5+"=pool["+temp2+"];\n";
	core3D+=temp6+"=pool["+temp4+"];\n";

	core3D+="if("+temp5+"!="+temp6+") goto "+eti2+"; //si son iguales\n";
	core3D+="goto "+eti3+"; //si no son iguales\n";

	core3D+=eti2+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp4+"="+temp4+"+1;\n";

	core3D+="if("+temp5+"!=0) goto "+eti1+"; //si es caracter de fin de cadena\n";
	core3D+="goto "+eti4+";\n";

	core3D+=eti3+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=0; //false\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti4+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=1; //true\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti5+": ;\n";

	core3D+="}\n\n";
	*/
}


function coreMayorIgual(){

	core3D+="void mayorIgual(){\n";

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	var temp5=genTemp();
	var temp6=genTemp();

	var temp7=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	var eti4=genEti();
	var eti5=genEti();
	var eti6=genEti();

	core3D+=temp1+"=p+1; //direccion de parametro1\n";
	core3D+=temp2+"=stack["+temp1+"]; //cadena1\n";

	core3D+=temp3+"=p+2; //direccion de parametro2\n";
	core3D+=temp4+"=stack["+temp3+"]; //cadena2\n";	

	core3D+=eti1+":\n";
	core3D+=temp5+"=pool["+temp2+"];\n";
	core3D+=temp6+"=pool["+temp4+"];\n";

	core3D+="if("+temp5+">="+temp6+") goto "+eti2+"; //si son iguales\n";
	core3D+="goto "+eti3+"; //si no son iguales\n";

	core3D+=eti2+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp4+"="+temp4+"+1;\n";

	core3D+="if("+temp5+"!=0) goto "+eti1+"; //si es caracter de fin de cadena\n";
	core3D+="goto "+eti4+";\n";

	core3D+=eti3+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=0; //false\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti4+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=1; //true\n";
	core3D+="goto "+eti5+";\n";

	core3D+=eti5+": ;\n";

	core3D+="}\n\n";
}

function coreMayor(){

	core3D+="void mayor(){\n";

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	var temp5=genTemp();
	var temp6=genTemp();

	var temp7=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	var eti4=genEti();
	var eti5=genEti();
	var eti6=genEti();

	var eti7=genEti();

	var tempRes1=genTemp();
	var tempRes2=genTemp();

	core3D+=temp1+"=p+1; //direccion de parametro1\n";
	core3D+=temp2+"=stack["+temp1+"]; //cadena1\n";

	core3D+=temp3+"=p+2; //direccion de parametro2\n";
	core3D+=temp4+"=stack["+temp3+"]; //cadena2\n";	

	core3D+=tempRes1+"=0;\n";
	core3D+=tempRes2+"=0;\n";

	core3D+=eti1+":\n";
	core3D+=temp5+"=pool["+temp2+"];\n";
	core3D+=temp6+"=pool["+temp4+"];\n";


	core3D+="if("+temp5+"==0) goto "+eti2+"; //si son iguales\n";
	core3D+="goto "+eti3+"; //si no son iguales\n";

	core3D+=eti3+":\n";//t5!=0 && t6!=0
	core3D+="if("+temp6+"==0) goto "+eti2+"; //si son iguales\n";
	core3D+="goto "+eti4+"; //si no son iguales\n";


	core3D+=eti2+":\n";
	core3D+="if("+tempRes1+">"+tempRes2+") goto "+eti5+"; //si son iguales\n";
	core3D+="goto "+eti6+"; //si no son iguales\n";
	
	core3D+=eti4+":\n";
	core3D+=tempRes1+"="+tempRes1+"+"+temp5+";\n";
	core3D+=tempRes2+"="+tempRes2+"+"+temp6+";\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp4+"="+temp4+"+1;\n";

	core3D+="if("+temp5+"!="+temp6+") goto "+eti2+"; //si son iguales\n";
	core3D+="goto "+eti1+"; //si no son iguales\n";

	core3D+=eti5+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=1; //true\n";
	core3D+="goto "+eti7+";\n";

	core3D+=eti6+":\n";
	core3D+=temp7+"=p+0;\n";
	core3D+="stack["+temp7+"]=0; //false\n";
	core3D+="goto "+eti7+";\n";


	core3D+=eti7+": ;\n";

	core3D+="}\n\n";
}



function coreOutStr(){

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	core3D+="void $$_outStr(){\n";

	core3D+=temp1+"=p+1; //referencia de la cadena a imprimir\n";
	core3D+=temp2+"=stack["+temp1+"]; //direccion del la cadena\n";

	core3D+=eti1+":\n";
	core3D+=temp3+"=pool["+temp2+"]; //caracter a imprimir\n";
	core3D+="if("+temp3+"!=0) goto "+eti2+";\n";
	core3D+="goto "+eti3+";\n";

	core3D+=eti2+":\n";
	core3D+="printf(%c,"+temp3+");\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+="goto "+eti1+";\n";

	core3D+=eti3+": ;\n";

	core3D+="}\n\n";
}



function coreOutNum(){
	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	var eti1=genEti();
	var eti2=genEti();

	var eti3=genEti();

	core3D+="void $$_outNum(){\n";

	core3D+=temp1+"=p+1; //direccion de numero a imprimir\n";
	core3D+=temp2+"=stack["+temp1+"];\n";

	core3D+=temp3+"=p+2; \n";
	core3D+=temp4+"=stack["+temp3+"]; //entero | decimal;\n";

	core3D+="if("+temp4+"==0) goto "+eti1+"; //imprimir como decimal\n";
	core3D+="goto "+eti2+";  //como entero\n"

	core3D+=eti1+":\n";
	core3D+="printf(%f,"+temp2+");\n";
	core3D+="goto "+eti3+";\n";

	core3D+=eti2+":\n";
	core3D+="printf(%d,"+temp2+");\n";

	core3D+=eti3+":   ;\n"

	core3D+="}\n\n";
}


function coreInStr(){

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	core3D+="void $$_inStr(){\n";

	core3D+=temp1+"=p+1; //direccion del parametro1\n";
	core3D+=temp2+"=stack["+temp1+"];  //variable\n";

	core3D+=temp3+"=p+2; //direccion del parametro2\n";
	core3D+=temp4+"=stack["+temp3+"]; //mensaje\n";	

	core3D+="}\n\n";
}


function coreInNum(){

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	core3D+="void $$_inNum(){\n";

	core3D+=temp1+"=p+1; //direccion del parametro1\n";
	core3D+=temp2+"=stack["+temp1+"];  //mensaje\n";

	core3D+=temp3+"=p+2; //direccion del parametro2\n";
	core3D+=temp4+"=stack["+temp3+"]; //valor por defecto\n";	

	core3D+="}\n\n";
}


function coreShow(){

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	core3D+="void $$_show(){\n";

	core3D+=temp1+"=p+1; //referencia de la cadena a imprimir\n";
	core3D+=temp2+"=stack["+temp1+"]; //direccion del la cadena\n";

	core3D+=eti1+":\n";
	core3D+=temp3+"=pool["+temp2+"]; //caracter a imprimir\n";
	core3D+="if("+temp3+"!=0) goto "+eti2+";\n";
	core3D+="goto "+eti3+";\n";

	core3D+=eti2+":\n";
	core3D+="printf(%c,"+temp3+");\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+="goto "+eti1+";\n";

	core3D+=eti3+": ;\n";

	core3D+="}\n\n";
}


function coreGetRandom(){

	core3D+="void $$_getRandom(){\n";

	core3D+="}\n\n";
}

function coreGetStrLength(){

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	var tempRes=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();

	core3D+="void $$_getStrLength(){\n";

	core3D+=temp1+"=p+1; //direccion del parametro\n";
	core3D+=temp2+"=stack["+temp1+"]; //puntero al pool de la cadena\n";

	core3D+=tempRes+"=0;\n";
	core3D+=eti1+":\n";
	core3D+=temp3+"=pool["+temp2+"]; //caracter\n";

	core3D+="if("+temp3+"!=0) goto "+eti2+";\n";
	core3D+="goto "+eti3+";\n";

	core3D+=eti2+":\n";
	core3D+=tempRes+"="+tempRes+"+1;\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+="goto "+eti1+";\n";

	core3D+=eti3+":\n";
	core3D+=temp4+"=p+0; //direccion de retorno\n";
	core3D+="stack["+temp4+"]="+tempRes+";\n";

	core3D+="}\n\n";
}



function coreGetBool(){

	var temp1=genTemp();
	var temp2=genTemp();
	var temp3=genTemp();
	var temp4=genTemp();

	var eti1=genEti();
	var eti2=genEti();
	var eti3=genEti();
	var eti4=genEti();
	var eti5=genEti();
	var eti6=genEti();

	var etiSalida=genEti();
	var tempRes=genTemp();

	core3D+="void $$_getBool(){\n";

	core3D+=temp1+"=p+1; //direccion de la cadena\n";
	core3D+=temp2+"=stack["+temp1+"];\n";

	core3D+=tempRes+"=0;\n";

	core3D+=temp3+"=pool["+temp2+"]; //t| otro caracter\n";
	core3D+="if("+temp3+"==116) goto "+eti2+";\n";
	core3D+="goto "+etiSalida+";\n";

	core3D+=eti2+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp3+"=pool["+temp2+"]; //r| otro caracter\n";
	core3D+="if("+temp3+"==114) goto "+eti3+";\n";
	core3D+="goto "+etiSalida+";\n";

	core3D+=eti3+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp3+"=pool["+temp2+"]; //u| otro caracter\n";
	core3D+="if("+temp3+"==117) goto "+eti4+";\n";
	core3D+="goto "+etiSalida+";\n";

	core3D+=eti4+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp3+"=pool["+temp2+"]; //e| otro caracter\n";
	core3D+="if("+temp3+"==101) goto "+eti5+";\n";
	core3D+="goto "+etiSalida+";\n";

	core3D+=eti5+":\n";
	core3D+=temp2+"="+temp2+"+1;\n";
	core3D+=temp3+"=pool["+temp2+"]; //0| otro caracter\n";
	core3D+="if("+temp3+"==0) goto "+eti6+";\n";
	core3D+="goto "+etiSalida+";\n";

	core3D+=eti6+":\n";
	core3D+=tempRes+"=1;\n";

	core3D+=etiSalida+":\n";

	core3D+=temp4+"=p+0; //direccion de retorno\n";
	core3D+="stack["+temp4+"]="+tempRes+";\n";

	core3D+="}\n\n";
}


function coreExit(){

	core3D+="void exit(){\n}\n\n";
}