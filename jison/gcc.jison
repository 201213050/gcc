/* lexical grammar */

//parser.yy = require("/nodo/scope");
%{

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
\"(\\.|[^"]|"@")*\" 	  return 'texto'
\'(\\.|[^']|"@")*\' 	  return 'textosimple'

//--- \'([a-zA-Z])":"(\\"(([a-zA-Z]([a-zA-Z]|[0-9]+|"_"|"-")*)|" ")+)+"."(([a-zA-Z]([a-zA-Z]|[0-9]+|"_"|"-")*))\' return 'path'


//\gcc\estructuras\estructuras\nodo.gcc

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

	}	
	|
	{
	
	}
	;


CUERPOINICIO: IMPORTAR CLASES {

	}
	| CLASES
	{


	}
	;

IMPORTAR : IMPORTAR importar '(' path ')' ';'
	{		

	}
	|
		IMPORTAR importar '(' E ')' ';'
	{		

	}	
	|importar '(' E ')' ';'{

	}		
	|importar '(' path ')' ';'{

	}
	;


CLASES	: CLASES CLASE {

		}
	| CLASE{

	}
	;


CLASE : VISIBILIDAD clase id hereda_de id '{' LISTA_INSTRUCCIONES '}'{

		}
	| VISIBILIDAD clase id hereda_de id '{'  '}'
		{

		}
	| VISIBILIDAD clase id '{' LISTA_INSTRUCCIONES '}'
		{

		}
	| VISIBILIDAD clase id '{'  '}'
	{

		} 
	| clase id hereda_de id '{' LISTA_INSTRUCCIONES '}'
		{

		}
	| clase id hereda_de id '{'  '}' 
		{

		}
	| clase id '{' LISTA_INSTRUCCIONES '}' 
		{

		}
	| clase id '{''}'
		{

		}
	;


LISTA_INSTRUCCIONES	: LISTA_INSTRUCCIONES INSTRUCCION
	{

	}
	| INSTRUCCION{

	}
	;

INSTRUCCION : PRINCIPAL
	{

	}
	| ESTRUCTURA
	{

	}
	| METODOS_ESTRUCTURAS
	{

	}
	| PUNTEROS
	{

	}
	| SI
	{

	}
	| SWITCH
	{
	}
	| CICLO
	{

	}
	| FOR
	{

	}
	| TECLADO
	{

	}
	| DECLARACION
	{

	}
	| ASIGNACION
	{

	}
	| CONSTRUCTOR
	{

	}
	| CONCATENAR
	{

	}
	| IMPRIMIR
	{

	}
	| PROCEDIMIENTO
	{

	}
	| LLAMADA ';'
	{

	}
	| romper ';'
	{

	}
	| romper E ';'
	{

	}
	| continuar ';'
	{

	}
	| retorno ';'
	{

	}
	| retorno E ';'
	{

	}
	;




PRINCIPAL	: principal '(' ')' '{'  LISTA_INSTRUCCIONES '}'
		{

		}
		|	principal '(' ')' '{' '}'
		{

		}
;

	VISIBILIDAD	: publico
	{

	} 
	| privado
	{

	}
	| protegido
	{

	}
	;

METODOS_ESTRUCTURAS	: id '.' FUNCION_ESTRUCTURAS '(' E ')' ';' 
	{

	}
	|id '.' FUNCION_ESTRUCTURAS '(' ')' ';'
	{

	} 
	;


FUNCION_ESTRUCTURAS  : insertar 
	{		

	}
	|obtener 
	{

	}
	|buscar 
	{

	}
	|apilar 
	{

	}
	|desapilar 
	{

	}
	|encolar 
	{

	}
	|desencolar 
	{

	}
	;




TIPO: entero 
	{


	}
	| decimal
	{

	}
	| booleano
	{

	}
	| cadena
	{

	}
	| caracter
	{

	}
	| vacio
	{

	}
	| funcion
	{

	}
	| lista 
	{

	}
	| pila
	{

	}
	| cola
	{

	}
	;




DECLARACION :  VISIBILIDAD TIPO id DIMENSION ASIGNAR ';' 
	{

	}
	| TIPO id DIMENSION ASIGNAR ';' 
	{

	}
	| VISIBILIDAD TIPO id ASIGNAR ';'
	{

	}
	| VISIBILIDAD id id ASIGNAR ';'
	{

	}
	| TIPO id ASIGNAR ';'
	{

	}
	| id id ASIGNAR ';'
	{

	}
	;

	
ASIGNAR	: '=' E 
	{

	}
	|'=' '{' ARRAY '}' 
	{

	}
	|'=' nuevo id '(' ')'
	{

	}
	|'=' nuevo id '(' VALOR ')'
	{

	}
	|'=' nuevo TIPO '(' ')'
	{


	}
	|'=' nuevo TIPO '(' TIPO ')'
	{

	}
	|'=' nuevo TIPO '(' id ')'
	{

	}
	|
	;

ARRAY : ARRAY ',' '{' ARRAY '}' 
	{
	}
    | ARRAY ',' E
	{

	}
    | E
	{
	}
    |'{' ARRAY '}' 
	{

	}
	;


ASIGNACION	: id ASIGNAR ';' 
	{

	}
	| id DIMENSION ASIGNAR ';'
	{

	} 
	| este '.' id ASIGNAR ';'
	{

	} 
	| este '.' id INSTANCIA ASIGNAR ';' 
	{

	}
	| este flecha id ASIGNAR ';' 
	{

	}
	| este flecha id INSTANCIA ASIGNAR ';'
	{

	} 
	| id INSTANCIA ASIGNAR ';' 
	{

	}
	| id INSTANCIA '++' ';' 
	{

	}
	| id INSTANCIA '--' ';' 
	{

	}
	| id '++' ';' 
	{

	}
	| id '--' ';' 
	{

	}
	| id ASIGNACION_EXPR E ';' 
	{
	}
	;

ASIGNACION_EXPR : '+=' 
	{

	}
    | '-=' 
	{

	}
    | '*=' 
	{

	}
    | '/=' 
	{

	}
	;


PROCEDIMIENTO : sobrescribir METODO
	{	

	}
	|METODO 
	{

	}
	;


METODO : VISIBILIDAD TIPO id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '	}'
	{

	}
	| VISIBILIDAD TIPO id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| TIPO id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| TIPO id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| VISIBILIDAD id id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| VISIBILIDAD id id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| id id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| id id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| VISIBILIDAD TIPO id DIMENSION '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| VISIBILIDAD TIPO id DIMENSION '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| TIPO id DIMENSION '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| TIPO id DIMENSION '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	;

PARAMETROS 	: PARAMETROS ',' PARAMETRO
	{

	}
	| PARAMETRO
	{

	}
	;


PARAMETRO 	: TIPO id
	{

	}
	| id id
	{

	}
	| id id DIMENSION
	{

	}
	| TIPO id DIMENSION
	{

	}
	
	;

CONSTRUCTOR : VISIBILIDAD id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| VISIBILIDAD id '(' PARAMETROS ')' '{' '}'
	{

	}
	| id '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| id '(' PARAMETROS ')' '{'  '}'
	{

	}
	| VISIBILIDAD id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| VISIBILIDAD id '(' ')' '{'  '}'
	{

	}
	| id '(' ')' '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| id '(' ')' '{'  '}'
	{

	}
	;


LLAMADA	: id '(' VALOR ')'
	{

	}
	|id '(' ')'  
	{

	}
	|este '.' LLAMADA 
	{

	}
	|este flecha LLAMADA
	{

	}
	;

VALOR 	: VALOR ',' E
		{

		}
		| E
		{

		}
		;

INSTANCIA	: INSTANCIA '.' LLAMADA
	{

	}
	| INSTANCIA flecha LLAMADA
	{

	}
	| INSTANCIA '.' id
	{

	}
	| INSTANCIA flecha	 id
	{

	}
	| INSTANCIA '.' id DIMENSION
	{

	}
	| INSTANCIA flecha id DIMENSION
	{

	}
	|'.' LLAMADA
	{

	}
	| flecha LLAMADA
	{
	
	}
	|'.' id 
	{
		
	}
	|flecha id 
	{

	}
	|'.' id DIMENSION
	{

	}
	|flecha id DIMENSION
	{

	}
	;


FUNCIONES : id '.' tamanio
	{

	}
	|convertiracadena '(' E ')'
	{

	}
	|convertiraentero '(' E ')'
	{

	}
	;

CONCATENAR : concatenar '(' E ',' E ',' E ')'
	{

	}
	| concatenar '(' E ',' E ')' 
	{

	}
	;

IMPRIMIR : imprimir '(' E ')' ';'
		{

		}
;

ESTRUCTURA : estructura id '[' LISTA_INSTRUCCIONES ']' ';'
		{

		}
		;

PUNTEROS : crearPuntero '(' TIPO ',' id ')' ASIGNAR ';'
	{

	}
	|crearPuntero '(' id ',' id ')' ASIGNAR ';'
	{

	}
	|destruirPuntero '(' id ')' ';'
	{

	}
	;

MEMORIA : obtenerDireccion '(' id ')' 
	{
	
	}
	|reservarMemoria '(' E ')'
	{
	
	} 
	|consultarTamanio '(' E ')' 
	{

	}	
	;


SI	: si '(' E ')' CUERPO_IF finsi 
	{

	}
	;

CUERPO_IF : esverdadero '{' LISTA_INSTRUCCIONES '}' esfalso '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| esverdadero '{'  '}' esfalso '{'  '}'
	{

	}
	| esfalso '{' LISTA_INSTRUCCIONES '}' esverdadero '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| esfalso '{'  '}' esverdadero '{'  '}' 
	{

	}
	| esverdadero '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| esverdadero '{'  '}'
	{

	}
	 ;

SWITCH	: evaluarsi '(' E ')' '{' CASO '}'
	{

	}
	| evaluarsi '(' E ')' '{' DEFECTO '}'

	}
	| evaluarsi '(' E ')' '{' CASO DEFECTO '}'
	{

	}
	;


CASO 	: CASO esiguala E ':' LISTA_INSTRUCCIONES
	{

	}
	| CASO esiguala E ':' 
	{

	}
	| esiguala E ':' LISTA_INSTRUCCIONES
	{

	}
	| esiguala E ':' 
	{

	}
	;

DEFECTO	: defecto ':' LISTA_INSTRUCCIONES
	{

	}
	;

CICLO 	: repetirmientras '(' E ')' '{' LISTA_INSTRUCCIONES'}'
	{


	
	}
	| repetirmientras '(' E ')' '{' '}'
	{


	
	}
	| hacer '{' LISTA_INSTRUCCIONES'}' mientras '(' E ')' ';'
	{


	
	}
	| hacer '{' '}' mientras '(' E ')' ';'
	{


	
	}
	| repetir '{' LISTA_INSTRUCCIONES'}' hastaque '(' E ')' ';'
	{


	}
	| repetir '{' '}' hastaque '(' E ')' ';'
	{


	}
	| ciclodoble '(' E "," E ')' '{' LISTA_INSTRUCCIONES'}'
	{


	}
	| ciclodoble '(' E "," E ')' '{' '}'
	{

	}
	| enciclar id '{' LISTA_INSTRUCCIONES '}'
	{

	}
	| enciclar id '{'  '}'
	{

	}
	;



FOR 	: repetircontando '(' variable ':' id ';' desde ':' E ';' hasta ':' E ')' '{' LISTA_INSTRUCCIONES'}'
	{

	}
	| repetircontando '(' variable ':' id ';' desde ':' E ';' hasta ':' E ')' '{' '}'
	{

	}
	| contador '(' E ')' '{' LISTA_INSTRUCCIONES'}'
	{

	}
	| contador '(' E ')' '{' '}'
	{

	}
	;


TECLADO : leerteclado '(' E "," id ')' ';'
	{

	}
;

E   : '(' E ')'
	{

	}
    | E '+' E
	{

	}
    | E '-' E
	{

	}
    | E '*' E
	{

	}
    | E '/' E
	{

	}
    | E '^' E
	{

	}
    | E '!'
	{

	}
    | '-' E %prec UMINUS
	{
	}
    | E '>=' E
	{

	}
    | E '<=' E
	{

	}
    | E '==' E
	{

	}
    | E '!=' E
	{

	}
    | E '>' E
	{

	}
    | E '<' E
	{

	}
    | E '||' E
	{

	}
    | E '&&' E
	{

	}
    | E '??' E
	{
	}
	| verdadero
	{
		
	}
	| falso
	{
		
	}
	| E '++'
	{

	}
	| E '--'
	{

	}
    | numero
	{
		
	}	
	| double
	{
		
	}
    | id 
    {
		
	}
	| texto
	{
	
	}
    | textosimple
	{
		
	}
	| nada
	{
		
	}
	| nulo
	{

	}
	| este '.' id 
	{

	}
	| este '.' id INSTANCIA
 	{

	}
	| FUNCIONES
	{

	}
	| LLAMADA 
	{

	}
	| CONCATENAR
	{

	}
	| MEMORIA 
	{

	}
	| METODOS_ESTRUCTURAS 
	{

	}
	| id INSTANCIA 
	{

	}
	;

DIMENSION	: DIMENSION '[' E ']'
	{	

	}
	| '[' E ']'
	{

	}	
	;


