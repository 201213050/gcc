/* lexical grammar */
%{
var codigoHash=0;
function getCodigo(){
    return "nodo"+(codigoHash++);
}
function reiniciar(){
    temp=1;
    codigoHash=0;
}
function crearNodo(etiqueta,linea,columna){
    var nodo=new Nodo(etiqueta,linea,columna+1);
    nodo.codigo=getCodigo();
    return nodo;
}
function crearHoja(etiqueta,valor,linea,columna){
    var nodo=new Nodo(etiqueta,linea,columna+1);
    nodo.valor=valor;
    nodo.codigo=getCodigo();
    return nodo;
}
class Nodo{
    constructor(etiqueta,linea,columna){
        this.etiqueta=etiqueta;
        this.valor=null;
        this.linea=linea;
        this.columna=columna;
        this.hijos=new Array();
        
        this.add=function(nodo){
            if(nodo!=null){
                this.hijos.push(nodo);
            }
        }
    }
}
	%}
%lex
%options case-insensitive

%%

\s+                   /* skip whitespace */
\n+                   /* skip whitespace */
\t+                   /* skip whitespace */
//comentarios
"/*"[^'*']*"*/"         return;
"//"[^\r\n]*[^\r\n]     return;
"/*"[^"*"]~"*/"         return;

[0-9]+"."[0-9]+	 	  return 'double'
[0-9]+				  return 'numero'

\'([a-zA-Z])(":")(\\([a-zA-Z]([a-zA-Z]|[0-9]+|"_"|"-")*|" ")+("."([a-zA-Z]([a-zA-Z]|[0-9]+|"_"|"-")*|" "))?)+\' 		%{ console.log(yytext); return 'path' %}
\"([a-zA-Z])(":")(\\([a-zA-Z]([a-zA-Z]|[0-9]+|"_"|"-")*|" ")+("."([a-zA-Z]([a-zA-Z]|[0-9]+|"_"|"-")*|" "))?)+\" 		%{ console.log(yytext); return 'path' %}


\"(\\.|[^"])*\" 	  return 'texto'
\'(\\.|[^'])*\' 	  return 'textosimple'

//AUMENTO DECREMENTO
"++"                  %{ console.log('++');return '++'; %}
"--"                  %{ console.log('--');return '--'; %}
//asignacion y Eeracion
"+="                  %{ console.log('+=');return '+='; %}
"*="                  %{ console.log('*-');return '*-'; %}
"-="                  %{ console.log('-=');return '-='; %}
"/="                  %{ console.log('/=k');return '/='; %}
//Eeradores relacionales
">="                  %{ console.log('>=');return '>='; %}
"<="                  %{ console.log('<=');return '<='; %}
"=="                  %{ console.log('==');return '=='; %}
"!="                  %{ console.log('!=');return '!='; %}

//Eeradores Logicos
"||"                  %{ console.log('||');return '||'; %}
"??"                  %{ console.log('??');return '??'; %}
"&&"                  %{ console.log('&&');return '&&'; %}
"!"                   %{ console.log('!');return '!'; %}
//Eeradores aritmeticos
"*"                   %{ console.log('*');return '*'; %}
"->"                 %{ console.log('->');return 'flecha'; %} 
"/"                   %{ console.log('/');return '/'; %}
"-"                   %{ console.log('-');return '-'; %}
"+"                   %{ console.log('+');return '+'; %}
"^"                   %{ console.log('^');return '^'; %}
"="                   %{ console.log('=');return '='; %}
//signos de agrupacion
"("                   %{ console.log('(');return '('; %}
")"                   %{ console.log(')');return ')'; %}
"{"                   %{ console.log('{');return '{'; %}
"}"                   %{ console.log('}');return '}'; %}
"["                   %{ console.log('[');return '['; %}
"]"                   %{ console.log(']');return ']'; %}
//otros signitos culeros

">"                   %{ console.log('>');return '>'; %}
"<"                   %{ console.log('<');return '<'; %}
","                   %{ console.log(',');return ','; %}
"."                   %{ console.log('.');return '.'; %}
					  
":"                   %{ console.log(':');return ':'; %}
";"                   %{ console.log(';');return ';'; %}
//PALABRAS RESERVADAS
"entero"              %{ console.log(yytext);return 'entero'; %}
"booleano"            %{ console.log(yytext);return 'booleano'; %}
"decimal"             %{ console.log(yytext);return 'decimal'; %}
"caracter"            %{ console.log(yytext);return 'caracter'; %}
"tamanio"             %{ console.log(yytext);return 'tamanio'; %}
"concatenar"          %{ console.log(yytext);return 'concatenar'; %}
"convertiracadena"    %{ console.log(yytext);return 'convertiracadena'; %}
"convertiraentero"    %{ console.log(yytext);return 'convertiraentero'; %}
"imprimir"		      %{ console.log(yytext);return 'imprimir'; %}
//CLASE
"clase"     		  %{ console.log(yytext);return 'clase'; %}
"este"			      %{ console.log(yytext);return 'este'; %}
//VISIBILIDAD
"publico"       	  %{ console.log(yytext);return 'publico'; %}
"protegido"      	  %{ console.log(yytext);return 'protegido'; %}
"privado"    		  %{ console.log(yytext);return 'privado'; %}
//HERENCIA
"hereda_de"           %{ console.log(yytext);return 'hereda_de'; %}
//FUNCIONES Y PROCEDIMIENTOS
"vacio"               %{ console.log(yytext);return 'vacio'; %}
"retorno"             %{ console.log(yytext);return 'retorno'; %}
"retornar"             %{ console.log(yytext);return 'retorno'; %}
"funcion"		      %{ console.log(yytext);return 'funcion'; %}
//SOBREESCRIBIR
"@sobrescribir"       %{ console.log(yytext);return 'sobrescribir'; %}
//PROCEDIMIENTO PRINCIPAL
"principal"           %{ console.log(yytext);return 'principal'; %}
//PUNTEROS
"crearpuntero"        %{ console.log(yytext);return 'crearPuntero'; %}
"reservarmemoria"     %{ console.log(yytext);return 'reservarMemoria'; %}
"consultartamanio"    %{ console.log(yytext);return 'consultartamanio'; %}
"destruirPuntero"     %{ console.log(yytext);return 'destruirPuntero'; %}


"obtenerDireccion"    %{ console.log(yytext);return 'obtenerDireccion'; %}
//SENTENCIAS
"importar"			  %{ console.log(yytext);return 'importar'; %}
"nuevo"               %{ console.log(yytext);return 'nuevo'; %}
"'\0'"                %{ console.log(yytext);return 'nulo'; %}
"nada"				  %{ console.log(yytext);return 'nada'; %}
//ROMPER CICLOS
"romper"              %{ console.log(yytext);return 'romper'; %}
"continuar"           %{ console.log(yytext);return 'continuar'; %}
//ESTRUCTURAS
"estructura"          %{ console.log(yytext);return 'estructura'; %}
"lista"               %{ console.log(yytext);return 'lista'; %}
"insertar"            %{ console.log(yytext);return 'insertar'; %}
"obtener"			  %{ console.log(yytext);return 'obtener'; %}
"buscar"			  %{ console.log(yytext);return 'buscar'; %}
//PILA -- COLA
"pila"		      	  %{ console.log(yytext);return 'pila'; %}
"apilar"		      %{ console.log(yytext);return 'apilar'; %}
"desapilar"		      %{ console.log(yytext);return 'desapilar'; %}
"cola"		      	  %{ console.log(yytext);return 'cola'; %}
"encolar"		      %{ console.log(yytext);return 'encolar'; %}
"desencolar"	      %{ console.log(yytext);return 'desencolar'; %}
//SENTENCIAS DE CONTROL
"si"                  %{ console.log(yytext);return 'si'; %}
"es_verdadero"        %{ console.log(yytext);return 'esverdadero'; %}
"es_falso"            %{ console.log(yytext);return 'esfalso'; %}
"fin-si"		      %{ console.log(yytext);return 'finsi'; %}
"evaluar_si"          %{ console.log(yytext);return 'evaluarsi'; %}
"es_igual_a"          %{ console.log(yytext);return 'esiguala'; %}
"repetir_mientras"    %{ console.log(yytext);return 'repetirmientras'; %}
"hacer"               %{ console.log(yytext);return 'hacer'; %}
"mientras"            %{ console.log(yytext);return 'mientras'; %}
"ciclo_doble_condicion"       %{ console.log(yytext);return 'ciclodoble'; %}
"repetir"		      %{ console.log(yytext);return 'repetir'; %}
"hasta_que"		      %{ console.log(yytext);return 'hastaque'; %}
"repetir_contando"    %{ console.log(yytext);return 'repetircontando'; %}
"variable"            %{ console.log(yytext);return 'variable'; %}
"desde"               %{ console.log(yytext);return 'desde'; %}
"hasta"               %{ console.log(yytext);return 'hasta'; %}
"enciclar"            %{ console.log(yytext);return 'enciclar'; %}
"contador"            %{ console.log(yytext);return 'contador'; %}
"defecto"             %{ console.log(yytext);return 'defecto'; %}
"true"                %{ console.log(yytext);return 'verdadero'; %}
"false"               %{ console.log(yytext);return 'falso'; %}
//ENTRADA Y LECTURA DE DATOS
"leer_teclado"        %{ console.log(yytext);return 'leerteclado'; %}
([a-zA-Z]|"_"|"$")([a-zA-Z]|[0-9]|"_"|"$")* %{ console.log(yytext);
					  return 'id'; %}

<<EOF>>               return 'EOF'
.                     return 'INVALIDO'
/lex

/* Eerator associations and precedence */


%left '+' '-'
%left '*' '/'
%left '^'
%left '(' ')'
%left '->'
%left UMINUS
%left '||' '??'
%left '=' 
%left '==' '!=' '>' '>=' '<' '<='
%left '+=' '-=' '*=' '/=' 
%left '&&'
%left '++' '--'
%right '!'


%error-verbose

%start INICIO

%% /* language grammar */


INICIO	:  CUERPO EOF{
	console.log($1+ "//Ultima linea");
	reiniciar();
	return $1; 
};

CUERPO : CUERPOINICIO{
		/*var nuevo = crearNodo("Cuerpo",1,1);
		nuevo = $1;
		$$ = nuevo;
		*/
		$$=$1;
	}	
	|
	{
		$$=crearNodo("Cuerpo",1,1);
	}
	;


CUERPOINICIO:
	 CLASES
	{
		$$ = $1;
	}
	;

IMPORTAR : 
	importar '(' E ')' ';'{
		$$=crearNodo("IMPORTAR",@1.first_line,@1.first_column);
		$$.add($3);
	}
	
	|	importar '(' path ')' ';'{
		$$=crearNodo("IMPORTAR",@1.first_line,@1.first_column);
		$$.add(crearHoja("PATH",$3,@3.first_line,@3.first_column));
	}	
	;


CLASES	: CLASES CLASE
	    {
			/*$$=crearNodo("CLASES",@1.first_line,@1.first_column);*/
			$$.add($2);
		}
	|
 	CLASES IMPORTAR
	    {
			/*$$=crearNodo("CLASES",@1.first_line,@1.first_column);*/
			$$.add($2);
		}	
	| CLASE{
			$$=crearNodo("INICIO",@1.first_line,@1.first_column);
            $$.add($1);
	}
	| IMPORTAR 
	{
			$$=crearNodo("INICIO",@1.first_line,@1.first_column);
            $$.add($1);		
	}
	;


CLASE : VISIBILIDAD clase id hereda_de id '{' LISTA_INSTRUCCIONESCUERPO '}'{
		$$=crearNodo("CLASE",@2.first_line,@2.first_column);
        var id1=crearHoja("ID",$3,@3.first_line,@3.first_column);
		var id2=crearHoja("ID",$5,@5.first_line,@5.first_column);
		$$.add($1);
		$$.add(id1);
		$$.add(id2);
		$$.add($7);
		}
	| VISIBILIDAD clase id hereda_de id '{'  '}'
		{
		$$=crearNodo("CLASE",@2.first_line,@2.first_column);
        var id1=crearHoja("ID",$3,@3.first_line,@3.first_column);
		var id2=crearHoja("ID",$5,@5.first_line,@5.first_column);
		$$.add($1);
		$$.add(id1);
		$$.add(id2);
		}
	| VISIBILIDAD clase id '{' LISTA_INSTRUCCIONESCUERPO '}'
		{
		$$=crearNodo("CLASE",@2.first_line,@2.first_column);
        var id1=crearHoja("ID",$3,@3.first_line,@3.first_column);
        $$.add($1);
		$$.add(id1);
		$$.add($5);
		}
	| VISIBILIDAD clase id '{'  '}'
	{
		$$=crearNodo("CLASE",@2.first_line,@2.first_column);
        var id1=crearHoja("ID",$3,@3.first_line,@3.first_column);
        $$.add($1);
		$$.add(id1);
		} 
	| clase id hereda_de id '{' LISTA_INSTRUCCIONESCUERPO '}'
		{
		$$=crearNodo("CLASE",@1.first_line,@1.first_column);
        var id1=crearHoja("ID",$2,@2.first_line,@2.first_column);
		var id2=crearHoja("ID",$4,@4.first_line,@4.first_column);
		$$.add(id1);
		$$.add(id2);
		$$.add($6);
		}
	| clase id hereda_de id '{'  '}' 
		{
		$$=crearNodo("CLASE",@1.first_line,@1.first_column);
		var id1=crearHoja("ID",$2,@2.first_line,@2.first_column);
		var id2=crearHoja("ID",$4,@4.first_line,@4.first_column);
		$$.add(id1);
		$$.add(id2);
		}
	| clase id '{' LISTA_INSTRUCCIONESCUERPO '}' 
		{
		$$=crearNodo("CLASE",@1.first_line,@1.first_column);
        var id1=crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(id1);
		$$.add($4);
		}
	| clase id '{''}'
		{
		$$=crearNodo("CLASE",@1.first_line,@1.first_column);
        var id1=crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(id1);
		}
	;


LISTA_INSTRUCCIONES	: LISTA_INSTRUCCIONES INSTRUCCION
	{		
		$1.add($2);
		$$ = $1;		
	}
	| INSTRUCCION{	
		$$ = crearNodo("INSTRUCCIONES",@1.first_line,@1.first_column);
		$$.add($1);						
	}
	;

LISTA_INSTRUCCIONESCUERPO	: LISTA_INSTRUCCIONESCUERPO INSTRUCCIONC
	{		
		$1.add($2);
		$$ = $1;		
	}
	| INSTRUCCIONC{	
		$$ = crearNodo("INSTRUCCIONESCUERPO",@1.first_line,@1.first_column);
		$$.add($1);						
	}
	;	


INSTRUCCIONC : PRINCIPAL
	{
		$$ = $1;
	}
	| ESTRUCTURA
	{
		$$ = $1;
	}
	| DECLARACION
	{
		$$ = $1;
	}
	| ASIGNACION
	{
		$$ = $1;
	}
	| CONSTRUCTOR
	{
		$$ = $1;
	}
	| PROCEDIMIENTO 
	{
		$$ = $1;
	}
	;


INSTRUCCION : 
	ESTRUCTURA
	{
		$$ = $1;
	}
	| METODOS_ESTRUCTURAS
	{
		$$ = $1;
	}
	| PUNTEROS
	{
		$$ = $1;
	}
	| SI
	{
		$$ = $1;
	}
	| SWITCH
	{
		$$ = $1;
	}
	| CICLO
	{
		$$ = $1;
	}
	| FOR
	{
		$$ = $1;
	}
	| TECLADO
	{
		$$ = $1;
	}
	| DECLARACION
	{
		$$ = $1;
	}
	| ASIGNACION
	{
		$$ = $1;
	}
	| CONCATENAR ';'
	{
		$$ = $1;
	}
	| IMPRIMIR 
	{
		$$ = $1;
	}
	| LLAMADA ';'
	{
		$$ = $1;
	}
	| romper ';'
	{
		$$ = crearNodo("ROMPER",@1.first_line,@1.first_column);
	}
	/*
	| romper E ';'
	{
		$$ = crearNodo("ROMPER",@1.first_line,@1.first_column);
	}*/
	| continuar ';'
	{
		$$ = crearNodo("CONTINUAR",@1.first_line,@1.first_column);
	}
	| retorno ';'
	{
		$$ = crearNodo("RETORNO",@1.first_line,@1.first_column);		
	}
	| retorno E ';'
	{
		$$ = crearNodo("RETORNO",@1.first_line,@1.first_column);			
		$$.add($2);
	}
	;




PRINCIPAL	: principal '(' ')' '{'  LISTA_INSTRUCCIONES '}'
		{
			$$=crearHoja("MET_PRINCIPAL",$1,@1.first_line,@1.first_column);
			$$.add($5);
		}
		|	principal '(' ')' '{' '}'
		{
			$$=crearHoja("MET_PRINCIPAL",$1,@1.first_line,@1.first_column);
		}
;

	VISIBILIDAD	: publico
	{
		$$= crearHoja("VISIBILIDAD",$1,@1.first_line,@1.first_column);
		/*
		hojita = crearNodo("Publico",@1.first_line,@1.first_column);
		$$.add(hojita);
		*/
	} 
	| privado
	{
		$$= crearHoja("VISIBILIDAD",$1,@1.first_line,@1.first_column);
		/*
		hojita = crearNodo("Privado",@1.first_line,@1.first_column);
		$$.add(hojita);
		*/
	}
	| protegido
	{
		$$= crearHoja("VISIBILIDAD",$1,@1.first_line,@1.first_column);
		/*
		hojita = crearNodo("Protegido",@1.first_line,@1.first_column);
		$$.add(hojita);
		*/
	}
	;

METODOS_ESTRUCTURAS	: id '.' FUNCION_ESTRUCTURAS ';' 
	{
		$$= crearNodo("ESTRUCT_PRIM",@1.first_line,@1.first_column);
		var ident = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(ident);
		$$.add($3);
	}
	;


FUNCION_ESTRUCTURAS  : insertar '(' E ')' 
	{
		$$= crearNodo("INSERTAR",@1.first_line,@1.first_column);
		$$.add($3);
	}
	|obtener '(' E ')'
	{
		$$= crearNodo("OBTENER",@1.first_line,@1.first_column);
		$$.add($3);
	}
	|buscar '(' E ')'
	{
		$$= crearNodo("BUSCAR",@1.first_line,@1.first_column);
		$$.add($3);
	}
	|apilar '(' E ')'
	{
		$$= crearNodo("APILAR",@1.first_line,@1.first_column);
		$$.add($3);
	}
	|desapilar  '(' ')'
	{
		$$= crearNodo("DESAPILAR",@1.first_line,@1.first_column);
	}
	|encolar '(' E ')'
	{
		$$= crearNodo("ENCOLAR",@1.first_line,@1.first_column);
		$$.add($3);
	}
	|desencolar '(' ')'
	{
		$$= crearNodo("DESENCOLAR",@1.first_line,@1.first_column);
	}
	;




TIPO: entero 
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	| decimal
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	| booleano
	{
		$$=crearHoja("BOOLEANO",$1,@1.first_line,@1.first_column);
	}
	| cadena
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	| caracter
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	| vacio
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	| funcion
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	| lista 
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	| pila
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	| cola
	{
		$$=crearHoja("TIPO",$1,@1.first_line,@1.first_column);
	}
	;




DECLARACION :  
	VISIBILIDAD TIPO id  DIMENSION ASIGNAR ';' 
	{
		$$= crearNodo("DECLARACION_VECTOR",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
		var nodo =  crearNodo("LISTAID",@3.first_line,@3.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));		
		$$.add(nodo);
		$$.add($4);
		$$.add($5);		
	}
	| TIPO id  DIMENSION ASIGNAR ';' 
	{
		$$= crearNodo("DECLARACION_VECTOR",@1.first_line,@1.first_column);
		$$.add($1);
		var nodo =  crearNodo("LISTAID",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));		
		nodo.add($3);
		$$.add(nodo);
		$$.add($4);		
	}
	| VISIBILIDAD TIPO id  ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_VAR",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
		var nodo =  crearNodo("LISTAID",@3.first_line,@3.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		$$.add(nodo);
		$$.add($4);		
	}
	| VISIBILIDAD id id  ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_OBJETO",@1.first_line,@1.first_column);
		$$.add($1);	
		$$.add(crearNodo("TIPO",$2,@2.first_line,@2.first_column));	
		var nodo =  crearNodo("LISTAID",@3.first_line,@3.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));		
		$$.add(nodo);
		$$.add($4);
	}
	| VISIBILIDAD id id DIMENSION ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_OBJETO",@1.first_line,@1.first_column);
		$$.add($1);	
		$$.add(crearNodo("TIPO",$2,@2.first_line,@2.first_column));	
		var nodo =  crearNodo("LISTAID",@3.first_line,@3.first_column);
		var id = crearNodo("ID",@3.first_line,@3.first_column);	
		id.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		id.add($4);
		nodo.add(id);
		$$.add(nodo);
		$$.add($4);
	}	
	
	| TIPO id  ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_VAR",@1.first_line,@1.first_column);
		$$.add($1);
		var nodo =  crearNodo("LISTAID",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
		$$.add(nodo);
		$$.add($3);
	}
	| id id  ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_OBJETO",@1.first_line,@1.first_column);
		$$.add(crearHoja("TIPO",$1,@1.first_line,@1.first_column));
		var nodo =  crearNodo("LISTAID",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));		
		$$.add(nodo);
		$$.add($3);
	}
	| id id DIMENSION ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_OBJETO",@1.first_line,@1.first_column);
		$$.add(crearHoja("TIPO",$1,@1.first_line,@1.first_column));
		var nodo =  crearNodo("LISTAID",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));		
		nodo.add($4);
		$$.add(nodo);
		$$.add($3);
	}	
	/*LISTA SIN DIMENSION EL PRIMERO*/
	|	
	VISIBILIDAD TIPO id LISTAID  ASIGNAR ';' 
	{
		$$= crearNodo("DECLARACION_VECTOR",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
		nodo = crearNodo("VAR",@3.first_line,@3.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));			
		$4.add(nodo);
		$$.add($4);
		$$.add($5);
	}	 
	| 
	VISIBILIDAD id id LISTAID ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_OBJETO",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add(crearHoja("TIPO",$2,@2.first_line,@2.first_column));
		nodo = crearNodo("VAR",@3.first_line,@3.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));		
		$4.add(nodo);
		$$.add($4);
		$$.add($5);
	}
	|	
	TIPO id LISTAID  ASIGNAR ';' 
	{
		$$= crearNodo("DECLARACION_VECTOR",@1.first_line,@1.first_column);
		$$.add($1);		
		nodo = crearNodo("VAR",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));		
		$3.add(nodo);
		$$.add($3);
		$$.add($4);
	}
	| 
	id id LISTAID ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_OBJETO",@1.first_line,@1.first_column);
		$$.add(crearHoja("TIPO",$1,@1.first_line,@1.first_column));	
		nodo = crearNodo("VAR",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
		$3.add(nodo);
		$$.add($3);
		$$.add($4);
	}		
	/*DIMENSION EN EL PRIMER ELEMENTO*/
	|	
	VISIBILIDAD TIPO id DIMENSION LISTAID  ASIGNAR ';' 
	{
		$$= crearNodo("DECLARACION_VECTOR",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
		nodo = crearNodo("VAR",@3.first_line,@3.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		nodo.add($4);//dimension
		$5.add(nodo);
		$$.add($5);		
		$$.add($6);
	}	 
	| 
	VISIBILIDAD id id DIMENSION LISTAID ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_OBJETO",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add(crearHoja("TIPO",$2,@2.first_line,@2.first_column));	
		nodo = crearNodo("VAR",@3.first_line,@3.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		nodo.add($4);
		$5.add(nodo);
		$$.add($5);
		$$.add($6);
	}
	|	
	TIPO id DIMENSION LISTAID  ASIGNAR ';' 
	{
		$$= crearNodo("DECLARACION_VECTOR",@1.first_line,@1.first_column);
		$$.add($1);		
		nodo = crearNodo("VAR",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
		nodo.add($3);
		$4.add(nodo);
		$$.add($4);
		$$.add($5);		
	}
	| 
	id id DIMENSION LISTAID ASIGNAR ';'
	{
		$$= crearNodo("DECLARACION_OBJETO",@1.first_line,@1.first_column);
		$$.add(crearHoja("TIPO",$1,@1.first_line,@1.first_column));		
		nodo = crearNodo("VAR",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
		nodo.add($3);
		$4.add(nodo);
		$$.add($4);
		$$.add($5);
	}		
	;

LISTAID : 
 		LISTAID ',' id DIMENSION
		{
			$$ = $1;
			var nodo = crearNodo("VAR",@3.first_line,@3.first_column);
			nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
			nodo.add($4);			
			$$.add(nodo);
		}
		|
 		LISTAID ',' id 
		{
			$$ = $1;
			nodo = crearNodo("VAR",@3.first_line,@3.first_column);
			nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
			$$.add(nodo);
		}
		|
		',' id DIMENSION
		{	
			$$ = crearNodo("LISTAID",@1.first_line,@1.first_column);
			var nodo = crearNodo("VAR",@2.first_line,@2.first_column);
			nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
			nodo.add($3);
			$$.add(nodo);
		}		
		|
		',' id
		{	
			$$ = crearNodo("LISTAID",@1.first_line,@1.first_column);
			nodo = crearNodo("VAR",@2.first_line,@2.first_column);
			nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
			$$.add(nodo);
		};

	
ASIGNAR	: '=' E 
	{
		$$ = $2;
	}
	|'=' '{' ARRAY '}' 
	{
		$$ = crearNodo("ARRAY",@1.first_line,@1.first_column);
		$$.add($3);
	}
	|'=' nuevo id '(' ')'
	{
		$$ = crearNodo("FUNCION",null,null);
		nuevito = crearNodo("NUEVO",@2.first_line,@2.first_column );
		ident2 = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(nuevito);
		$$.add(ident2);
	}
	|'=' nuevo id '(' VALOR ')'
	{
		$$ = crearNodo("FUNCION",null,null);
		nuevito = crearNodo("NUEVO",@2.first_line,@2.first_column );
		ident2 = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(nuevito);
		$$.add(ident2);
		$$.add($5);
		
	}
	|'=' nuevo TIPO '(' ')'
	{
		$$ = crearNodo("FUNCION",null,null);
		nuevito = crearNodo("NUEVOESTRUCTURA",@2.first_line,@2.first_column );
		$$.add(nuevito);
		$$.add($3);
	}
	|'=' nuevo TIPO '(' TIPO ')'
	{
		$$ = crearNodo("FUNCION",null,null);
		nuevito = crearNodo("NUEVOESTRUCTURA",@2.first_line,@2.first_column );
		$$.add($3);
		$$.add($5);
	}
	|'=' nuevo TIPO '(' id ')'
	{
		$$ = crearNodo("FUNCION",null,null);
		nuevito = crearNodo("NUEVOESTRUCTURA",@2.first_line,@2.first_column );
		ident2 = crearHoja("TIPO",$5,@5.first_line,@5.first_column);
		$$.add(nuevito);
		$$.add($3);
		$$.add(ident2);
	}
	| {$$ =  crearNodo("NIMIERDA",null,null);}
	;

ARRAY : ARRAY ',' '{' ARRAY '}' 
	{
		$$ = $1;
		$$.add($4);
	}
    |'{' ARRAY '}' 
	{
		$$ = crearNodo("ARREGLO",null,null);
		$$.add($2);
	}
    | ARRAY ',' E
	{
		$$ = $1;
		$$.add($3);
	}	
    | E
	{
		$$ = crearNodo("ARREGLO",null,null);
		$$.add($1);
	}	
	;


ASIGNACION	: id ASIGNAR ';' 
	{
		$$ = crearNodo("ASIGNACION",null,null);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
		$$.add($2);
		
	}
	| id DIMENSION ASIGNAR ';'
	{
		$$ = crearNodo("ASIGNACION",null,null);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
		$$.add($2);
		$$.add($3);
	} 
	| este '.' id ASIGNAR ';'
	{
		$$ = crearNodo("ASIGNACION",null,null);
		este = crearNodo("este",@1.first_line,@1.first_column);
		identificador = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(este);
		$$.add(identificador);
		$$.add($4);
	} 
	| este '.' id INSTANCIA ASIGNAR ';' 
	{
		$$ = crearNodo("ASIGNACION",null,null);
		este = crearNodo("este",@1.first_line,@1.first_column);
		identificador = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(este);
		$$.add(identificador);
		$$.add($4);
		$$.add($5);
	}
	| este flecha id ASIGNAR ';' 
	{
		$$ = crearNodo("ASIGNACION",null,null);
		este = crearNodo("este",@1.first_line,@1.first_column);
		identificador = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(este);
		$$.add(identificador);
		$$.add($4);
	}
	| este flecha id INSTANCIA ASIGNAR ';'
	{
		$$ = crearNodo("ASIGNACION",null,null);
		este = crearNodo("este",@1.first_line,@1.first_column);
		identificador = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(este);
		$$.add(identificador);
		$$.add($4);
		$$.add($5);
	} 
	| id INSTANCIA ASIGNAR ';' 
	{
		$$ = crearNodo("ASIGNACION",@1.first_line,@1.first_column);
		var nodo = crearNodo("INSTANCIA",@1.first_line,@1.first_column);
		nodo.add(crearHoja("ID",$1,@1.first_line,@1.first_column));
		nodo.add($2);
		$$.add(nodo);
		$$.add($3);
	}
	| id INSTANCIA '++' ';' 
	{
		$$ = crearNodo("ASIGNACIONINC",@1.first_line,@1.first_column);
		var nodo = crearNodo("INSTANCIA",@1.first_line,@1.first_column);
		nodo.add(crearHoja("ID",$1,@1.first_line,@1.first_column));
		nodo.add($2);
		$$.add(nodo);		
	}
	| id INSTANCIA '--' ';' 
	{
		$$ = crearNodo("ASIGNACIONDEC",@1.first_line,@1.first_column);
		var nodo = crearNodo("INSTANCIA",@1.first_line,@1.first_column);
		nodo.add(crearHoja("ID",$1,@1.first_line,@1.first_column));
		nodo.add($2);
		$$.add(nodo);	
	}
	| id '++' ';' 
	{
		$$ = crearNodo("ASIGNACIONINC",null,null);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
	}
	| id '--' ';' 
	{
		$$ = crearNodo("ASIGNACIONDEC",null,null);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
	}
	| id ASIGNACION_EXPR E ';' 
	{
		$$ = crearNodo("ASIGNACIONOPERACION",@1.first_line,@1.first_column);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
		$$.add($2);
		$$.add($3);
	}
	;

ASIGNACION_EXPR : '+=' 
	{
		$$ = crearHoja("+=",$1,@1.first_line,@1.first_column);
	}
    | '-=' 
	{
		$$ = crearHoja("-=",$1,@1.first_line,@1.first_column);
	}
    | '*=' 
	{
		$$ = crearHoja("*=",$1,@1.first_line,@1.first_column);
	}
    | '/=' 
	{
		$$ = crearHoja("/=",$1,@1.first_line,@1.first_column);
	}
	;


PROCEDIMIENTO : sobrescribir METODO
	{	
		nodoSobreEs = crearNodo("SobreEscribir",@1.first_line,@1.first_column);
		$$.add(nodoSobreEs);
		$$.add($2);
	}
	|METODO 
	{
		$$ = $1;
	}
	;


METODO : VISIBILIDAD TIPO id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '	}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
		identificador = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(identificador);
		$$.add($5);
		$$.add($8);
	}
	| VISIBILIDAD TIPO id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
		identificador = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(identificador);
		$$.add($7);
	}
	| TIPO id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add($4);
		$$.add($7);
	}
	| TIPO id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add($6);
	}
	| VISIBILIDAD id id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		identificador2 = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(identificador);
		$$.add(identificador2);
		$$.add($5);
		$$.add($8);
	}
	| VISIBILIDAD id id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		identificador2 = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(identificador);
		$$.add(identificador2);
		$$.add($5);
		$$.add($8);
	}
	| id id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		identificador2 = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add(identificador2);
		$$.add($4);
		$$.add($7);
	}
	| id id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		identificador2 = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add(identificador2);
		$$.add($6);
	}
	| VISIBILIDAD TIPO id DIMENSION '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
		identificador = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(identificador);
		$$.add($4);
		$$.add($6);
		$$.add($9);
	}
	| VISIBILIDAD TIPO id DIMENSION '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
		identificador = crearHoja("ID",$3,@3.first_line,@3.first_column);
		$$.add(identificador);
		$$.add($4);
		$$.add($8);
	}
	| TIPO id DIMENSION '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add($3);
		$$.add($5);
		$$.add($8);
	}
	| TIPO id DIMENSION '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("METODO",@1.first_line,@1.first_column);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add($3);
		$$.add($7);
	}
	;

PARAMETROS 	: PARAMETROS ',' PARAMETRO
	{
		$$ = $1;		
		$$.add($3);
	}
	| PARAMETRO
	{
		$$ = crearNodo("PARAMETROS",@1.first_line-1,@1.first_column-1);
		$$.add($1);
	}
	;


PARAMETRO 	: TIPO id
	{
		$$ = crearNodo("PARAMETRO",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
	}
	| id id
	{
		$$ = crearNodo("PARAMETRO",@1.first_line-1,@1.first_column-1);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		identificador2 = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add(identificador2);
	}
	| id id DIMENSION
	{
		$$ = crearNodo("PARAMETRO",@1.first_line-1,@1.first_column-1);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		identificador2 = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add(identificador2);
		$$.add($3);
	}
	| TIPO id DIMENSION
	{
		$$ = crearNodo("PARAMETRO",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add($3);
	}
	
	;

CONSTRUCTOR : VISIBILIDAD id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("CONSTRUCTOR",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add($4);
		$$.add($7);
	}
	| VISIBILIDAD id '(' PARAMETROS ')' '{' '}'
	{
		$$ = crearNodo("CONSTRUCTOR",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add($4);
	}
	| id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("CONSTRUCTOR",@1.first_line-1,@1.first_column-1);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
		$$.add($3);
		$$.add($6);
	}
	| id '(' PARAMETROS ')' '{'  '}'
	{
		$$ = crearNodo("CONSTRUCTOR",@1.first_line-1,@1.first_column-1);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
		$$.add($3);
	}
	| VISIBILIDAD id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("CONSTRUCTOR",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
		$$.add($6);
	}
	| VISIBILIDAD id '(' ')' '{'  '}'
	{
		$$ = crearNodo("CONSTRUCTOR",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		identificador = crearHoja("ID",$2,@2.first_line,@2.first_column);
		$$.add(identificador);
	}
	| id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("CONSTRUCTOR",@1.first_line-1,@1.first_column-1);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
		$$.add($5);
	}
	| id '(' ')' '{'  '}'
	{
		$$ = crearNodo("CONSTRUCTOR",@1.first_line-1,@1.first_column-1);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
	}
	;


LLAMADA	: id '(' VALOR ')'
	{
		$$ = crearNodo("LLAMADA",@1.first_line-1,@1.first_column-1);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
		$$.add($3);
	}
	|id '(' ')'  
	{
		$$ = crearNodo("LLAMADA",@1.first_line-1,@1.first_column-1);
		identificador = crearHoja("ID",$1,@1.first_line,@1.first_column);
		$$.add(identificador);
	}
	|este '.' LLAMADA 
	{
		$$ = crearNodo("LLAMADA",@1.first_line-1,@1.first_column-1);
		ESTEE = crearNodo("este",@1.first_line,@1.first_column);
		$$.add(ESTEE);
		$$.add($3);
	}
	|este flecha LLAMADA
	{
		$$ = crearNodo("LLAMADA",@1.first_line-1,@1.first_column-1);
		ESTEE = crearNodo("este",@1.first_line,@1.first_column);
		$$.add(ESTEE);
		$$.add($3);
	}
	;

VALOR 	: VALOR ',' E
		{
			$1.add($3);
			$$ = $1;
		}
		| E
		{
			$$ = crearNodo("VALOR",@1.first_line-1,@1.first_column-1);
			$$.add($1);
		}
		;

INSTANCIA	: INSTANCIA '.' LLAMADA
	{
		$$ = $1;
		var nodo = crearNodo("INSTANCIAP",@2.first_line-1,@2.first_column-1);
		nodo.add($3);				
		$$.add(nodo);
	}
	| INSTANCIA flecha LLAMADA
	{
		$$ = $1;
		var nodo = crearNodo("INSTANCIAF",@2.first_line-1,@2.first_column-1);
		nodo.add($3);				
		$$.add(nodo);
	}
	| INSTANCIA '.' id
	{
		$$ = $1 ;		
		var nodo = crearNodo("INSTANCIAP",@2.first_line-1,@2.first_column-1);
		nodo.add(crearHoja("ACCESOVAR",$3,@3.first_line-1,@3.first_column-1));
		$$.add(nodo);
	}
	| INSTANCIA flecha	 id
	{
		$$ = $1 ;		
		var nodo = crearNodo("INSTANCIAF",@2.first_line-1,@2.first_column-1);
		nodo.add(crearHoja("ACCESOVAR",$3,@3.first_line-1,@3.first_column-1));
		$$.add(nodo);
	}
	| INSTANCIA '.' id DIMENSION
	{
		$$ = $1 ;		
		var nodo = crearNodo("INSTANCIAP",@2.first_line-1,@2.first_column-1);
		var vector = crearNodo("ACCESOVECTOR",@3.first_line-1,@3.first_column-1);
		vector.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		vector.add($4);
		nodo.add(vector);	
		$$.add(nodo);
	}
	| INSTANCIA flecha id DIMENSION
	{
		$$ = $1 ;		
		var nodo = crearNodo("INSTANCIAF",@2.first_line-1,@2.first_column-1);
		var vector = crearNodo("ACCESOVECTOR",@3.first_line-1,@3.first_column-1);
		vector.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		vector.add($4);
		nodo.add(vector);	
		$$.add(nodo);
		
	}
	| '.' LLAMADA
	{
		$$ = crearNodo("INSTANCIAP",@1.first_line-1,@1.first_column-1);		
		$$.add($2);	
	}
	|  flecha LLAMADA
	{
		$$ = crearNodo("INSTANCIAF",@1.first_line-1,@1.first_column-1);		
		$$.add($2);		
	}
	|  '.' id 
	{
		$$ = crearNodo("INSTANCIAP",@1.first_line-1,@1.first_column-1);		
		var nodo = crearNodo("ACCESOVAR",@1.first_line,@1.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
		$$.add(nodo);
		
	}
	| flecha id 
	{
		$$ = crearNodo("INSTANCIAF",@1.first_line-1,@1.first_column-1);
		
		var nodo = crearNodo("ACCESOVAR",@1.first_line,@1.first_column);
		nodo.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
		$$.add(nodo);
	}
	|'.' id DIMENSION
	{
		$$ = crearNodo("INSTANCIAP",@1.first_line-1,@1.first_column-1);
				
		var vector = crearNodo("ACCESOVECTOR",@3.first_line-1,@3.first_column-1);
		vector.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
		vector.add($3);
		$$.add(vector);
	}
	|  flecha id DIMENSION
	{
		$$ = crearNodo("INSTANCIAF",@1.first_line-1,@1.first_column-1);
				
		var vector = crearNodo("ACCESOVECTOR",@3.first_line-1,@3.first_column-1);
		vector.add(crearHoja("ID",$2,@2.first_line,@2.first_column));
		vector.add($3);
		$$.add(vector);
	}
	;


FUNCIONES : id '.' tamanio
	{
		$$ = crearNodo("FUNCION",@1.first_line-1,@1.first_column-1);
		$$.add(crearHoja("ID",$1,@1.first_line,@1.first_column));
		$$.add(crearHoja("TAMANO",$3,@3.first_line,@3.first_column));				
	}
	|convertiracadena '(' E ')'
	{
		$$ = crearNodo("FUNCION",@1.first_line-1,@1.first_column-1);
		$$.add(crearHoja("CONVERTIRCADENA",$1,@1.first_line,@1.first_column));
		$$.add($3);
		
	}
	|convertiraentero '(' E ')'
	{
		$$ = crearNodo("FUNCION",@1.first_line-1,@1.first_column-1);
		$$.add(crearHoja("CONVERTIRENTERO",$1,@1.first_line,@1.first_column));
		$$.add($3);
	}
	;

CONCATENAR : concatenar '(' E ',' E ',' E ')'
	{

		$$ = crearNodo("CONCATENAR",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($5);
		$$.add($7);
	}
	| concatenar '(' E ',' E ')' 
	{

		$$ = crearNodo("CONCATENAR",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($5);
	}
	;

IMPRIMIR : imprimir '(' E ')' ';'
		{
			$$ = crearNodo("IMPRIMIR",@1.first_line-1,@1.first_column-1);
			$$.add($3);
		}
;

ESTRUCTURA : estructura id '[' LISTA_INSTRUCCIONES ']' ';'
		{
			$$ = crearNodo("ESTRUCTURA",@1.first_line-1,@1.first_column-1);
			identificador = crearHoja("ID", $2, @2.first_line, @2.first_column);
			$$.add(identificador);
			$$.add($4);
		}
		;

PUNTEROS : crearPuntero '(' TIPO ',' id ')' ASIGNAR ';'
	{
		$$ = crearNodo("CREARPUNTERO",@1.first_line,@1.first_column);
		$$.add($3);
		$$.add(crearHoja("ID",$5,@5.first_line,@5.first_column));
		$$.add($7);
	}
	|crearPuntero '(' id ',' id ')' ASIGNAR ';'
	{
		$$ = crearNodo("CREARPUNTERO",@1.first_line,@1.first_column);
		$$.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		$$.add(crearHoja("ID",$5,@5.first_line,@5.first_column));
		$$.add($7);
	}
	|destruirPuntero '(' id ')' ';'
	{
		$$ = crearNodo("DESTRUIRPUNTERO",@1.first_line,@1.first_column)
		$$.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
	}
	;

MEMORIA : obtenerDireccion '(' id ')' 
	{
		$$ = crearNodo("OBTENERDIRECCION",@1.first_line-1,@1.first_column-1);
		$$.add(crearHoja("ID",$3,@3.first_line,@3.first_column));

	}
	|reservarMemoria '(' E ')'
	{
		$$ = crearNodo("RESERVARMEMORIA",@1.first_line-1,@1.first_column-1);
		$$.add($3);
	
	} 
	|consultartamanio '(' E ')' 
	{
		$$ = crearNodo("CONSULTARTAMANO",@1.first_line-1,@1.first_column-1);
		$$.add($3);
	}	
	;


SI	: si '(' E ')' CUERPO_IF finsi 
	{
		$$ = crearNodo("SI",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($5);
	}
	;

CUERPO_IF : esverdadero '{' LISTA_INSTRUCCIONES '}' esfalso '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("CUERPO_IF",@1.first_line-1,@1.first_column-1);
		verdadero = crearNodo("VERDADERO",@3.first_line,@3.first_column);
		verdadero.add($3);
		falso = crearNodo("FALSO",@3.first_line,@3.first_column);
		falso.add($7);
		$$.add(verdadero);
		$$.add(falso);

	}
	| esverdadero '{'  '}' esfalso '{'  '}'
	{
		$$ = crearNodo("CUERPO_IF",@1.first_line-1,@1.first_column-1);

		verdadero = crearNodo("VERDADERO",@1.first_line,@1.first_column);	
		falso = crearNodo("FALSO",@3.first_line,@3.first_column);		

		$$.add(verdadero);
		$$.add(falso);
	}
	| esfalso '{' LISTA_INSTRUCCIONES '}' esverdadero '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("CUERPO_IF",@1.first_line-1,@1.first_column-1);
		verdadero = crearNodo("VERDADERO",@5.first_line,@5.first_column);
		verdadero.add($7);

		falso = crearNodo("FALSO",@1.first_line,@1.first_column);
		falso.add($3);		
		$$.add(verdadero);
		$$.add(falso);		
	}
	| esfalso '{'  '}' esverdadero '{'  '}' 
	{
		$$ = crearNodo("CUERPO_IF",@1.first_line-1,@1.first_column-1);

		verdadero = crearNodo("VERDADERO",@1.first_line,@1.first_column);	
		falso = crearNodo("FALSO",@3.first_line,@3.first_column);		

		$$.add(verdadero);
		$$.add(falso);					
	}
	| esverdadero '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("VERDADERO",@1.first_line-1,@1.first_column-1);
		$$.add($3);
	}
	| esverdadero '{'  '}'
	{
		$$ = crearNodo("VERDADERO",@1.first_line-1,@1.first_column-1);
	}
	 ;

SWITCH	: evaluarsi '(' E ')' '{' CASOS '}'
	{
		$$ = crearNodo("SWITCH",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($6);
	}
	| evaluarsi '(' E ')' '{' DEFECTO '}'
	{
		$$ = crearNodo("SWITCH",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($6);
	}
	| evaluarsi '(' E ')' '{' CASOS DEFECTO '}'
	{
		$$ = crearNodo("SWITCH",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($6);
		$$.add($7);
	}
	;

CASOS : 
	CASOS CASO
	{
		$$ =$1;
		$$.add($2);
	}
	| CASO
	{
		$$ = crearNodo("CASOS",@1.first_line,@1.first_column);
		$$.add($1);
	};



CASO 	:
	  esiguala E ':' LISTA_INSTRUCCIONES
	{
		$$ = crearNodo("CASO",@1.first_line-1,@1.first_column-1);
		$$.add($2);
		$$.add($4);
	}
	| esiguala E ':' 
	{
		$$ = crearNodo("CASO",@1.first_line-1,@1.first_column-1);
		$$.add($2);
	}
	;

DEFECTO	: defecto ':' LISTA_INSTRUCCIONES
	{
		{
		$$ = crearNodo("DEFECTO",@1.first_line-1,@1.first_column-1);
		$$.add($3);
	}
	}
	;

CICLO 	: repetirmientras '(' E ')' '{' LISTA_INSTRUCCIONES'}'
	{
		
		$$ = crearNodo("WHILE",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($6);
	
	}
	| repetirmientras '(' E ')' '{' '}'
	{
		$$ = crearNodo("WHILE",@1.first_line-1,@1.first_column-1);
		$$.add($3);		
	
	}
	| hacer '{' LISTA_INSTRUCCIONES'}' mientras '(' E ')' ';'
	{
		$$ = crearNodo("DOWHILE",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($7);
	}
	| hacer '{' '}' mientras '(' E ')' ';'
	{
		$$ = crearNodo("DOWHILE",@1.first_line-1,@1.first_column-1);		
		$$.add($6);
	
	}
	| repetir '{' LISTA_INSTRUCCIONES'}' hastaque '(' E ')' ';'
	{
		$$ = crearNodo("REPETIR",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($7);
	}
	| repetir '{' '}' hastaque '(' E ')' ';'
	{
		$$ = crearNodo("REPETIR",@1.first_line-1,@1.first_column-1);
		$$.add($6);
	}
	| ciclodoble '(' E "," E ')' '{' LISTA_INSTRUCCIONES'}'
	{
		$$ = crearNodo("CICLOX",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($5);
		$$.add($8);
	}
	| ciclodoble '(' E "," E ')' '{' '}'
	{
		$$ = crearNodo("CICLOX",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		$$.add($5);		
	}
	| enciclar id '{' LISTA_INSTRUCCIONES '}'
	{
		$$ = crearNodo("ENCICLAR",@1.first_line-1,@1.first_column-1);
		$$.add ( crearHoja("ID",$2,@2.first_line,@2.first_column));		
		$$.add($4);
	}
	| enciclar id '{'  '}'
	{
		$$ = crearNodo("ENCICLAR",@1.first_line-1,@1.first_column-1);
		$$.add ( crearHoja("ID",$2,@2.first_line,@2.first_column));				
	}
	;



FOR 	: repetircontando '(' variable ':' id ';' desde ':' E ';' hasta ':' E ')' '{' LISTA_INSTRUCCIONES'}'
	{
		$$ = crearNodo("FOR",@1.first_line-1,@1.first_column-1);
		$$.add(crearHoja("ID",$5,@5.first_line,@5.first_column));
		$$.add($9);
		$$.add($13);
		$$.add($16);
	}
	| repetircontando '(' variable ':' id ';' desde ':' E ';' hasta ':' E ')' '{' '}'
	{
		$$ = crearNodo("FOR",@1.first_line-1,@1.first_column-1);
		$$.add(crearHoja("ID",$5,@5.first_line,@5.first_column));
		$$.add($9);
		$$.add($13);		
	}
	| contador '(' E ')' '{' LISTA_INSTRUCCIONES'}'
	{
		
		$$ = crearNodo("CONTADOR",@1.first_line-1,@1.first_column-1);		
		$$.add($3);
		$$.add($6);
	}
	| contador '(' E ')' '{' '}'
	{
		$$ = crearNodo("CONTADOR",@1.first_line-1,@1.first_column-1);		
		$$.add($3);		
	}
	;


TECLADO : leerteclado '(' E "," id ')' ';'
	{
		$$ = crearNodo("LEER_TECLADO",@1.first_line-1,@1.first_column-1);
		$$.add($3);
		nodito2 = crearHoja("ID", $5, @5.first_linem, @5.first_column);
		$$.add(nodito2);
	}
;

E   : '(' E ')'
	{
		$$ = $2;
	}
    | E '+' E
	{
		$$ = crearNodo("+",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '-' E
	{
		$$ = crearNodo("-",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '*' E
	{
		$$ = crearNodo("*",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '/' E
	{
		$$ = crearNodo("/",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '^' E
	{
		$$ = crearNodo("^",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '!'
	{
		$$ = crearNodo("!",@2.first_line-1,@2.first_column-1);
		$$.add($1);
	}
    | '-' E %prec UMINUS
	{
		$$ = crearNodo("-",@1.first_line-1,@1.first_column-1);
		$$.add($1);
	}
    | E '>=' E
	{
		$$ = crearNodo(">=",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '<=' E
	{
		$$ = crearNodo("<=",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '==' E
	{
		$$ = crearNodo("==",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '!=' E
	{
		$$ = crearNodo("!=",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '>' E
	{
		$$ = crearNodo(">",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '<' E
	{
		$$ = crearNodo("<",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '||' E
	{
		$$ = crearNodo("||",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '&&' E
	{
		$$ = crearNodo("&&",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
    | E '??' E
	{
		$$ = crearNodo("??",@1.first_line-1,@1.first_column-1);
		$$.add($1);
		$$.add($3);
	}
	| verdadero
	{
		$$ = crearNodo("Verdadero",@1.first_line,@1.first_column);
	}
	| falso
	{
		$$ = crearNodo("Falso",@1.first_line,@1.first_column);
	}
	| E '++'
	{
		$$ = crearNodo("INCREMENTO",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
	}
	| E '--'
	{
		$$ = crearNodo("DECREMENTO",@1.first_line,@1.first_column);
		$$.add($1);
		$$.add($2);
	}
    | numero
	{
		//alert('número');
		$$ = crearHoja("ENTERO",$1,@1.first_line,@1.first_column);
	}	
	| double
	{
		$$ = crearHoja("DOUBLE",$1,@1.first_line,@1.first_column);
	}
	| id INSTANCIA 
	{
		$$ = crearNodo("INSTANCIA",@1.first_line,@1.first_column);
		$$.add(crearHoja("ID",$1,@1.first_line,@1.first_column));	
		$$.add($2);
	}	
    | id 
    {
		//alert($1);
		$$ = crearHoja("ID",$1,@1.first_line,@1.first_column);
	}
	| texto
	{
		$$ = crearHoja("CADENA",$1,@1.first_line,@1.first_column);
		
	}
    | textosimple
	{
		$$ = crearHoja("TXTSIMPLE",$1,@1.first_line,@1.first_column);
	}
	| nada
	{
		$$ = crearHoja("NADA",$1,@1.first_line,@1.first_column);
	}
	| nulo
	{
		$$ = crearHoja("NULO",$1,@1.first_line,@1.first_column);
	}
	| este '.' id 
	{
		$$ = crearNodo("INTANCIA",@1.first_line,@1.first_column);
		$$.add(crearHoja("THIS",$1,@1.first_line,@1.first_column));
		var nodo = crearNodo("INTANCIAP",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		$$.add(nodo);		
	}
	| este '.' id INSTANCIA
 	{
		$$ = crearNodo("INTANCIA",@1.first_line,@1.first_column);
		$$.add(crearHoja("THIS",$1,@1.first_line,@1.first_column));
		var nodo = crearNodo("INTANCIAP",@2.first_line,@2.first_column);
		nodo.add(crearHoja("ID",$3,@3.first_line,@3.first_column));
		nodo.add($4);
		$$.add(nodo);	
		
	}
	| FUNCIONES
	{
		$$ =$1;
	}
	| LLAMADA 
	{
		$$ =$1;
	}
	| CONCATENAR
	{
		$$ =$1;

	}
	| MEMORIA 
	{
		$$ =$1;
	}
	| METODOS_ESTRUCTURAS
	{
		$$ =$1;
	}
	;

DIMENSION	: DIMENSION '[' E ']'
	{
		$$ = $1;	
		$$.add($3);
	}
	| '[' E ']'
	{
		$$ = crearNodo("Dimension",@1.first_line,@1.first_column);
		$$.add($2);
	}	
	;