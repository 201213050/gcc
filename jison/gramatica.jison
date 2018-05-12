/* lexical grammar */

%lex
%options case-insensitive
MultilineaComentario   = "/*" [^*] ~"*/" | "/*" "*"+ "/"
%%

\s+                   /* skip whitespace */
\n+                   /* skip whitespace */
\t+                   /* skip whitespace */
[0-9]+"."[0-9]+	 	  return 'numDecimal'
[0-9]+				  return 'numEntero'
\"(\\.|[^"])*\" 	  return 'cadenaDoble'
\'(\\.|[^'])*\' 	  return 'cadenaSimple'


"/*"[^'*']*"*/"         return;
"//"[^\r\n]*[^\r\n]     return;
"/*"[^"*"]~"*/"         return;



"++"                  return '++'
"--"                  return '--'
"+="                  return '+='
"-="                  return '-='
"*="                  return '*='
"/="                  return '/='
"->"                  return '->'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"("                   return '('
")"                   return ')'
">="                  return '>='
"<="                  return '<='
"=="                  return '=='
"!="                  return '!='
">"                   return '>'
"<"                   return '<'
"&&"                  return '&&'
"||"                  return '||'
"??"                  return '??'
"!"                   return '!'
"{"                   return '{'
"}"                   return '}'
","                   return ','
"."                   return '.'
":"                   return ':'
";"                   return ';'
"["                   return '['
"]"                   return ']'
"="                   return '='
"booleano"            return 'booleano'
"entero"              return 'entero'
"decimal"             return 'decimal'
"caracter"            return 'caracter'
"nada"                return 'nada'
"tamanio"             return 'tamanio'
"concatenar"          return 'concatenar'
"convertiracadena"    return 'convertiracadena'
"convertiraentero"    return 'convertiraentero'
"si"                  return 'si'
"es_verdadero"        return 'esverdadero'
"es_falso"            return 'esfalso'
"fin-si"		      return 'finsi'
"evaluar_si"          return 'evaluarsi'
"es_igual_a"          return 'esiguala'
"defecto"             return 'defecto'
"true"                return 'verdadero'
"false"               return 'falso'
"romper"              return 'romper'
"continuar"           return 'continuar'
"retorno"             return 'retorno'
"repetir_mientras"    return 'repetirmientras'
"hacer"               return 'hacer'
"mientras"            return 'mientras'
"ciclo_doble_condicion"       return 'ciclodoble'
"repetir"		      return 'repetir'
"hasta_que"		      return 'hastaque'
"hasta"               return 'hasta'
"desde"               return 'desde'
"repetir_contando"    return 'repetircontando'
"enciclar"            return 'enciclar'
"contador"            return 'contador'
"leer_teclado"        return 'leerteclado'
"vacio"               return 'vacio'
"Principal"           return 'Principal'
"insertar"            return 'insertar'
"lista"               return 'lista'
"destruirPuntero"     return 'destruirPuntero'
"reservarMemoria"     return 'reservarMemoria'
"consultarTamanio"    return 'consultarTamanio'
"obtenerDireccion"    return 'obtenerDireccion'
"crearPuntero"        return 'crearPuntero'
"estructura"          return 'estructura'
"variable"            return 'variable'
"'\0'"                return 'nulo'
"nuevo"               return 'nuevo'
"hereda_de"           return 'hereda_de'
"importar"			  return 'importar'
"@sobrescribir"       return 'sobrescribir'
"protegido"      	  return 'protegido'
"privado"    		  return 'privado'
"publico"       	  return 'publico'
"este"			      return 'este'
"clase"     		  return 'clase'
"imprimir"		      return 'imprimir'
"funcion"		      return 'funcion'
"pila"		      	  return 'pila'
"cola"		      	  return 'cola'
"apilar"		      return 'apilar'
"desapilar"		      return 'desapilar'
"encolar"		      return 'encolar'
"desencolar"	      return 'desencolar'
[a-zA-z_0-9]+		  return 'id'


<<EOF>>               return 'EOF'
.                     return 'INVALIDO'

/lex

/* operator associations and precedence */


%left '+' '-'
%left '*' '/'
%left '^'
%left '->'
%left UMINUS
%left '||' '&&' 
%left '>' '<' '>=' '<=' '==' '!='
%left '+=' '-=' '*=' '/=' 
%left '??'
%left '++' '--'

%right '!'
%error-verbose


%start INICIO

%% /* language grammar */


INICIO	: ENTRADA EOF{
	parser.arbol.raiz = $1;
	console.log(" * * * * * * CORRECTO * * * * * * *");
};


ENTRADA	: IMPORTAR CLASES {
		nodo  = new Nodo("ENTRADA",$1,@1,[$1,$2]);
		$$ = nodo;
	}
	| CLASES{
		nodo  = new Nodo("ENTRADA",$1,@1,[$1]);
		$$ = nodo;
	};


IMPORTAR : IMPORTAR importar '(' OP ')' ';'{ //6
		nodo1 = new Nodo('importar',$2,@2,[]);
		nodo2 = new Nodo('(',$3,@3,[]);
		nodo5 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("IMPORTAR",$1,@1,[$1,nodo1,nodo2,$4,nodo5]);
		$$ = nodo;
	}
	|importar '(' OP ')' ';'{ //6
		nodo1 = new Nodo('importar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("IMPORTAR",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


CLASES	: CLASES CLASE {
		nodo  = new Nodo("CLASES",$1,@1,[$1,$2]);
		$$ = nodo;
	}
	| CLASE{
		nodo  = new Nodo("CLASES",$1,@1,[$1]);
		$$ = nodo;
	};


CLASE : VISIBILIDAD clase id hereda_de id '{' INSTRUCCIONES '}' { //6
		nodo2 = new Nodo('clase',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('hereda_de',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("CLASE",$1,@1,[$1,nodo2,nodo3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| VISIBILIDAD clase id '{' INSTRUCCIONES '}' { //6
		nodo2 = new Nodo('clase',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('{',$4,@4,[]);
		nodo6 = new Nodo('}',$6,@6,[]);
		nodo  = new Nodo("CLASE",$1,@1,[$1,nodo2,nodo3,nodo4,$5,nodo6]);
		$$ = nodo;
	}
	| clase id hereda_de id '{' INSTRUCCIONES '}' { //6
		nodo1 = new Nodo('clase',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('hereda_de',$3,@3,[]);
		nodo4 = new Nodo('id',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CLASE",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo4,$6,nodo7]);
		$$ = nodo;
	}
	|clase id '{' INSTRUCCIONES '}' { //6
		nodo1 = new Nodo('clase',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('{',$3,@3,[]);
		nodo5 = new Nodo('}',$5,@5,[]);
		nodo  = new Nodo("CLASE",$1,@1,[nodo1,nodo2,nodo3,$4,nodo5]);
		$$ = nodo;
	};


INSTRUCCIONES	: INSTRUCCIONES INSTRUCCION {
		nodo  = new Nodo("INSTRUCCIONES",$1,@1,[$1,$2]);
		$$ = nodo;
	}
	| INSTRUCCION{
		nodo  = new Nodo("INSTRUCCIONES",$1,@1,[$1]);
		$$ = nodo;
	};

		
INSTRUCCION : VARIABLE{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| ASIGNACION{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| CONSTRUCTOR{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| CONCATENAR{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| IMPRIMIR{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| PROCEDIMIENTO{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| PRINCIPAL{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| ESTRUCTURA{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| PUNTEROS{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| FUNCION_EDD{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| SI{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| SWITCH{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| CICLO{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| FOR{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| TECLADO{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| id INSTANCIA {
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo	= new Nodo("INSTRUCCION",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	| LLAMADA ';'{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| romper ';'{
		nodo1 = new Nodo('romper',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| romper OP ';'{
		nodo1 = new Nodo('romper',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	| continuar ';'{
		nodo1 = new Nodo('continuar',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| retorno ';'{
		nodo1 = new Nodo('retorno',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| retorno OP ';'{
		nodo1 = new Nodo('retorno',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1,$2]);
		$$ = nodo;
	};


VISIBILIDAD	: publico { //1
		nodo1 = new Nodo('publico',$1,@1,[]);
		nodo  = new Nodo("VISIBILIDAD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| privado{ //1
		nodo1 = new Nodo('privado',$1,@1,[]);
		nodo  = new Nodo("VISIBILIDAD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| protegido{ //1
		nodo1 = new Nodo('protegido',$1,@1,[]);
		nodo  = new Nodo("VISIBILIDAD",$1,@1,[nodo1]);
		$$ = nodo;
	};


TIPO	: entero { //1
		nodo1 = new Nodo('entero',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| decimal{ //1
		nodo1 = new Nodo('decimal',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| booleano{ //1
		nodo1 = new Nodo('booleano',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| caracter{ //1
		nodo1 = new Nodo('caracter',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| vacio{ //1
		nodo1 = new Nodo('vacio',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| funcion{ //1
		nodo1 = new Nodo('funcion',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|lista {
		nodo1 = new Nodo('lista',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| pila {
		nodo1 = new Nodo('pila',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| cola {
		nodo1 = new Nodo('cola',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	};


VARIABLE :  VISIBILIDAD TIPO id DIMENSION ASIGNAR ';' { //5
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,$2,nodo3,$4,$5]);
		$$ = nodo;
	}
	| TIPO id DIMENSION ASIGNAR ';' { //4
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,nodo2,$3,$4]);
		$$ = nodo;
	}
	|VISIBILIDAD TIPO id ASIGNAR ';'{ //4
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,$2,nodo3,$4]);
		$$ = nodo;
	}
	|VISIBILIDAD id id ASIGNAR ';'{ //4
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,nodo2,nodo3,$4]);
		$$ = nodo;
	}
	| TIPO id ASIGNAR ';'{ //3
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,nodo2,$3]);
		$$ = nodo;
	}
	| id id ASIGNAR ';'{ //3
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[nodo1,nodo2,$3]);
		$$ = nodo;
	};


DIMENSION	: DIMENSION '[' OP ']'{ //4
		nodo1 = new Nodo('[',$2,@2,[]);
		nodo2 = new Nodo(']',$4,@4,[]);
		nodo  = new Nodo("DIMENSION",$1,@1,[$1,nodo1,$3,nodo2]);
		$$ = nodo;
	}
	| '[' OP ']' { //3
		nodo1 = new Nodo('[',$1,@1,[]);
		nodo2 = new Nodo(']',$3,@3,[]);
		nodo  = new Nodo("DIMENSION",$1,@1,[nodo1,$2,nodo2]);
		$$ = nodo;
	};


ASIGNAR	: '=' OP{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	|'=' '{' LARREGLO '}' { //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	}
	|'=' nuevo id '(' ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo5 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5]);
		$$ = nodo;
	}
	|'=' nuevo id '(' VALOR ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo5 = new Nodo('(',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,nodo3,nodo5,$5,nodo6]);
		$$ = nodo;
	}
	|'=' nuevo TIPO '(' ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo5 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5]);
		$$ = nodo;
	}
	|'=' nuevo TIPO '(' TIPO ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,$3,nodo4,$5,nodo6]);
		$$ = nodo;
	}
	|'=' nuevo TIPO '(' id ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6]);
		$$ = nodo;
	}
	|{ //1
		nodo1 = new Nodo('nulo',$1,@1,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1]);
		$$ = nodo;
	};

LARREGLO :  LARREGLO ',' ARREGLO{ //2
		nodo2 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("LARREGLO",$1,@1,[$1,nodo2,$3]);
		$$ = nodo;
	}
    | ARREGLO{ //2
		nodo  = new Nodo("LARREGLO",$1,@1,[$1]);
		$$ = nodo;
	};
		
ARREGLO : OP {
		nodo  = new Nodo("ARREGLO",$1,@1,[$1]);
		$$ = nodo;
	}
    |'{' LARREGLO '}' { //2
		nodo1 = new Nodo('{',$1,@1,[]);
		nodo3 = new Nodo('}',$3,@3,[]);
		nodo  = new Nodo("ARREGLO",$1,@1,[nodo1,$2,nodo3]);
		$$ = nodo;
	};

ARREGLOB : ARREGLO ',' '{' ARREGLO '}' { //2
		nodo2 = new Nodo(',',$2,@2,[]);
		nodo3 = new Nodo('{',$3,@3,[]);
		nodo5 = new Nodo('}',$5,@5,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[$1,nodo2,nodo3,$4,nodo5]);
		$$ = nodo;
	}
    | ARREGLO ',' OP{ //2
		nodo2 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[$1,nodo2,$3]);
		$$ = nodo;
	}
    | OP{ //2
		nodo  = new Nodo("ASIGNAR",$1,@1,[$1]);
		$$ = nodo;
	}
    |'{' ARREGLO '}' { //2
		nodo1 = new Nodo('{',$1,@1,[]);
		nodo3 = new Nodo('}',$3,@3,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,$2,nodo3]);
		$$ = nodo;
	};


ASIGNACION	: id ASIGNAR ';'{ 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	| id DIMENSION ASIGNAR ';'{ 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,$3]);
		$$ = nodo;
	}
	| este '.' id ASIGNAR ';'{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2,nodo3,$4]);
		$$ = nodo;
	}
	| este '.' id INSTANCIA ASIGNAR ';'{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2,nodo3,$4,$5]);
		$$ = nodo;
	}
	| id INSTANCIA ASIGNAR ';'{ 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,$3]);
		$$ = nodo;
	}
	| id INSTANCIA '++' ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo3 = new Nodo('++',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,nodo3]);
		$$ = nodo;
	}
	| id INSTANCIA '--' ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo3 = new Nodo('--',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,nodo3]);
		$$ = nodo;
	}
	| id '++' ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('++',$2,@2,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	}
	| id '--' ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('--',$2,@2,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	} 
	| id OP_ASIGNACION OP ';' {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,$3]);
		$$ = nodo;
	} 	
	| este '.' id '++' ';'{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('++',$4,@4,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	}
	| este '.' id '--' ';'{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('--',$4,@4,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	};

OP_ASIGNACION : '+=' {
		nodo1 = new Nodo('+',$1,@1,[]);
		//nodo  = new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo1;
	}
    | '-=' {
		nodo1 = new Nodo('-',$1,@1,[]);
		//nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo1;
	}
    | '*=' {
		nodo1 = new Nodo('*',$1,@1,[]);
		//nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo1;
	}
    | '/=' {
		nodo1 = new Nodo('/',$1,@1,[]);
		//nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo1;
	};

PRINCIPAL	: Principal '(' ')' '{'  INSTRUCCIONES '}'{
		nodo1 = new Nodo('Principal',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$3,@3,[]);
		nodo4 = new Nodo('{',$4,@4,[]);
		nodo6 = new Nodo('{',$6,@6,[]);
		nodo  = new Nodo("PRINCIPAL",$1,@1,[nodo1,nodo2,nodo3,nodo4,$5,nodo6]);
		$$ = nodo;
	};


PROCEDIMIENTO : sobrescribir METODO {
		nodo1 = new Nodo('sobrescribir',$1,@1,[]);
		nodo  = new Nodo("PROCEDIMIENTO",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	|METODO {
		nodo  = new Nodo("PROCEDIMIENTO",$1,@1,[$1]);
		$$ = nodo;
	};


METODO : VISIBILIDAD TIPO id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo6 = new Nodo(')',$6,@6,[]); nodo7 = new Nodo('{',$7,@7,[]);
		nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,$2,nodo3,nodo4,$5,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	|VISIBILIDAD TIPO id '(' ')' '{' INSTRUCCIONES '}'{ //8
		nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo6 = new Nodo(')',$5,@5,[]); nodo7 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,$2,nodo3,nodo4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	}
	| TIPO id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //8
		nodo3 = new Nodo('id',$2,@2,[]); nodo4 = new Nodo('(',$3,@3,[]); nodo6 = new Nodo(')',$5,@5,[]); nodo7 = new Nodo('{',$6,@6,[]); 
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo3,nodo4,$4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	}
	| TIPO id '(' ')' '{' INSTRUCCIONES '}'{ //7
		nodo3 = new Nodo('id',$2,@2,[]); nodo4 = new Nodo('(',$3,@3,[]); nodo4 = new Nodo(')',$4,@4,[]); nodo5 = new Nodo('{',$5,@5,[]); 
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo3,nodo4,nodo6,nodo7,$6,nodo7]);
		$$ = nodo;
	}
	| VISIBILIDAD id id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo6 = new Nodo(')',$6,@6,[]);
		nodo7 = new Nodo('{',$7,@7,[]); nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo2,nodo3,nodo4,$5,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	| VISIBILIDAD id id '(' ')' '{' INSTRUCCIONES '}'{ //8
		nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo5 = new Nodo(')',$5,@5,[]); nodo6 = new Nodo('{',$6,@6,[]); nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo2,nodo3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| id id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ 
		nodo1 = new Nodo('id',$1,@1,[]); nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('(',$3,@3,[]); nodo6 = new Nodo(')',$5,@5,[]);
		nodo7 = new Nodo('{',$6,@6,[]); nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[nodo1,nodo2,nodo3,$4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	}
	| id id '(' ')' '{' INSTRUCCIONES '}'{ 
		nodo1 = new Nodo('id',$1,@1,[]); nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('(',$3,@3,[]); nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]); nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("METODO",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	|VISIBILIDAD TIPO id DIMENSION '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$5,@5,[]); nodo6 = new Nodo(')',$7,@7,[]); nodo7 = new Nodo('{',$8,@8,[]);
		nodo10 = new Nodo('}',$10,@10,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,$2,nodo3,$4, nodo4,$6,nodo6,nodo7,$9,nodo10]);
		$$ = nodo;
	}
	|VISIBILIDAD TIPO id DIMENSION '(' ')' '{' INSTRUCCIONES '}'{ //8
		nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$5,@5,[]); nodo6 = new Nodo(')',$6,@6,[]); nodo7 = new Nodo('{',$7,@7,[]);
		nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,$2,nodo3,$4,nodo4,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	| TIPO id DIMENSION '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo3 = new Nodo('id',$2,@2,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo6 = new Nodo(')',$6,@6,[]); nodo7 = new Nodo('{',$7,@7,[]); 
		nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo3,$4,nodo4,$5,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	| TIPO id DIMENSION '(' ')' '{' INSTRUCCIONES '}'{ //7
		nodo3 = new Nodo('id',$2,@2,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo4 = new Nodo(')',$5,@5,[]); nodo5 = new Nodo('{',$6,@6,[]); 
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo3,$3, nodo4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	};


PARAMETRO 	: PARAMETRO ',' PARAM{
		nodo1 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("PARAMETRO",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| PARAM{
		nodo  = new Nodo("PARAMETRO",$1,@1,[$1]);
		$$ = nodo;
	};


PARAM 	: TIPO id{
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAM",$1,@1,[$1,nodo2]);
		$$ = nodo;
	}
	| TIPO id DIMENSION{
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAM",$1,@1,[$1,nodo2,$3]);
		$$ = nodo;
	}
	| id id{
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAM",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	}
	| id id DIMENSION{
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAM",$1,@1,[nodo1,nodo2,$3]);
		$$ = nodo;
	};


CONSTRUCTOR : VISIBILIDAD id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo3 = new Nodo('id',$2,@2,[]);
		nodo4 = new Nodo('(',$3,@3,[]);
		nodo6 = new Nodo(')',$5,@5,[]);
		nodo7 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("CONSTRUCTOR",$1,@1,[$1,nodo3,nodo4,$4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	}
	| id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CONSTRUCTOR",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	|VISIBILIDAD id '(' ')' '{' INSTRUCCIONES '}'{ //9
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('(',$3,@3,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CONSTRUCTOR",$1,@1,[$1,nodo2,nodo3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| id '(' ')' '{' INSTRUCCIONES '}'{ //9
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$3,@3,[]);
		nodo4 = new Nodo('{',$4,@4,[]);
		nodo6 = new Nodo('}',$6,@6,[]);
		nodo  = new Nodo("CONSTRUCTOR",$1,@1,[nodo1,nodo2,nodo3,nodo4,$5,nodo6]);
		$$ = nodo;
	};


LLAMADA	: id '(' VALOR ')' {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("LLAMADA",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	}
	|id '(' ')' {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$3,@3,[]);
		nodo  = new Nodo("LLAMADA",$1,@1,[nodo1,nodo2,nodo3]);
		$$ = nodo;
	} 
	|este '.' LLAMADA {
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo  = new Nodo("LLAMADA",$1,@1,[nodo1,$2]);
		$$ = nodo;
	};
			
			
VALOR 	: VALOR ',' OP{
		nodo1 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("VALOR",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
		| OP{
		nodo  = new Nodo("VALOR",$1,@1,[$1]);
		$$ = nodo;
	};

				
INSTANCIA	: INSTANCIA '.' LLAMADA{
		nodo1 = new Nodo('.',$2,@2,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| INSTANCIA '.' id{
		nodo1 = new Nodo('.',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[$1,nodo1,nodo2]);
		$$ = nodo;
	}
	| INSTANCIA '->' id{
		nodo1 = new Nodo('->',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[$1,nodo1,nodo2]);
		$$ = nodo;
	}
	| INSTANCIA '.' id DIMENSION{
		nodo1 = new Nodo('.',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[$1,nodo1,nodo2,$3]);
		$$ = nodo;
	}
	|'.' LLAMADA{
		nodo1 = new Nodo('.',$1,@1,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	|'.' id{
		nodo1 = new Nodo('.',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	}
	| '->' id{
		nodo1 = new Nodo('->',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	}
	| '.' id DIMENSION{
		nodo1 = new Nodo('.',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[nodo1,nodo2,$3]);
		$$ = nodo;
	};



FUNCIONES : id '.' tamanio { //3
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('=',$2,@2,[]);
		nodo3 = new Nodo('tamanio',$3,@3,[]);
		nodo  = new Nodo("FUNCIONES",$1,@1,[nodo1,nodo2,nodo3]);
		$$ = nodo;
	}
	|convertiracadena '(' OP ')'{ //3
		nodo1 = new Nodo('convertiracadena',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("FUNCIONES",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	}
	|convertiraentero '(' OP ')'{ //3
		nodo1 = new Nodo('convertiraentero',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("FUNCIONES",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


CONCATENAR : concatenar '(' id ',' OP ',' OP ')' ';'{ //6
		nodo1 = new Nodo('concatenar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo6 = new Nodo(',',$6,@6,[]);
		nodo8 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CONCATENAR",$1,@1,[nodo1,nodo2,nodo3,nodo4,$5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	|concatenar '(' OP ',' OP ')' ';'{ //6
		nodo1 = new Nodo('concatenar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("CONCATENAR",$1,@1,[nodo1,nodo2,nodo3,nodo4,$5,nodo6]);
		$$ = nodo;
	};


IMPRIMIR : imprimir '(' OP ')' ';'{ //6
		nodo1 = new Nodo('imprimir',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("IMPRIMIR",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


ESTRUCTURA : estructura id '[' INSTRUCCIONES ']' ';'{ //6
		nodo1 = new Nodo('estructura',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('[',$3,@3,[]);
		nodo5 = new Nodo(']',$5,@5,[]);
		nodo  = new Nodo("ESTRUCTURA",$1,@1,[nodo1,nodo2,nodo3,$4,nodo5]);
		$$ = nodo;
	};


PUNTEROS : crearPuntero '(' TIPO ',' id ')' ASIGNAR ';'{ //6
		nodo1 = new Nodo('crearPuntero',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("PUNTEROS",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6,$7]);
		$$ = nodo;
	}
	|crearPuntero '(' id ',' id ')' ASIGNAR ';'{ //6
		nodo1 = new Nodo('crearPuntero',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("PUNTEROS",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6,$7]);
		$$ = nodo;
	}
	|destruirPuntero '(' id ')' ';'{ //6
		nodo1 = new Nodo('crearPuntero',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("PUNTEROS",$1,@1,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	};


MEMORIA : obtenerDireccion '(' id ')' { //6
		nodo1 = new Nodo('obtenerDireccion',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("MEMORIA",$1,@1,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	}
	|reservarMemoria '(' OP ')' { //6
		nodo1 = new Nodo('reservarMemoria',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("MEMORIA",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	}
	|consultarTamanio '(' OP ')' { //6
		nodo1 = new Nodo('consultarTamanio',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("MEMORIA",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


FUNCION_EDD	: id '.' OPCION_EDD '(' OP ')' ';' { //2
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("FUNCION_EDD",$1,@1,[nodo1,nodo2,$3,nodo4,$5,nodo6]);
		$$ = nodo;
	}
	|id '.' OPCION_EDD '(' ')' ';' { //2
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('insertar',$3,@3,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo5 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("FUNCION_EDD",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5]);
		$$ = nodo;
	};


OPCION_EDD  : insertar {
		nodo1 = new Nodo('insertar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|obtener {
		nodo1 = new Nodo('obtener',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|buscar {
		nodo1 = new Nodo('buscar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|apilar {
		nodo1 = new Nodo('apilar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|desapilar {
		nodo1 = new Nodo('desapilar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|encolar {
		nodo1 = new Nodo('encolar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|desencolar {
		nodo1 = new Nodo('desencolar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	};


SI	: si '(' OP ')' OPCION_SI finsi { //8
		nodo1 = new Nodo('si',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("SI",$1,@1,[nodo1,nodo2,$3,nodo3,$5,nodo6]);
		$$ = nodo;
	};


OPCION_SI : esverdadero '{' INSTRUCCIONES '}' esfalso '{' INSTRUCCIONES '}' { //8
		nodo1 = new Nodo('esverdadero',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo5 = new Nodo('esfalso',$5,@5,[]);
		nodo6 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("OPCION_SI",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| esfalso '{' INSTRUCCIONES '}' esverdadero '{' INSTRUCCIONES '}' { //8
		nodo1 = new Nodo('esfalso',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo5 = new Nodo('esverdadero',$5,@5,[]);
		nodo6 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("OPCION_SI",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| esverdadero '{' INSTRUCCIONES '}' { //8
		nodo1 = new Nodo('esverdadero',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo  = new Nodo("OPCION_SI",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


SWITCH	: evaluarsi '(' OP ')' '{' CASO '}'{
		nodo1 = new Nodo('evaluarsi',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("SWITCH",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| evaluarsi '(' OP ')' '{' DEFECTO '}'{
		nodo1 = new Nodo('evaluarsi',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("SWITCH",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| evaluarsi '(' OP ')' '{' CASO DEFECTO '}'{
		nodo1 = new Nodo('evaluarsi',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("SWITCH",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,$7,nodo8]);
		$$ = nodo;
	};


CASO 	: CASO esiguala OP ':' INSTRUCCIONES{
		nodo1 = new Nodo('esiguala',$2,@2,[]);
		nodo4 = new Nodo(':',$4,@4,[]);
		nodo  = new Nodo("CASO",$1,@1,[$1,nodo1,$3,nodo4,$5]);
		$$ = nodo;
	}
	| esiguala OP ':' INSTRUCCIONES{
		nodo1 = new Nodo('esiguala',$1,@1,[]);
		nodo4 = new Nodo(':',$3,@3,[]);
		nodo  = new Nodo("CASO",$1,@1,[nodo1,$2,nodo4,$4]);
		$$ = nodo;
	};
		

DEFECTO	: defecto ':' INSTRUCCIONES{
		nodo1 = new Nodo('defecto',$1,@1,[]);
		nodo2 = new Nodo(':',$2,@2,[]);
		nodo  = new Nodo("DEFECTO",$1,@1,[nodo1,nodo2,$3]);
		$$ = nodo;
	};


CICLO 	: repetirmientras '(' OP ')' '{' INSTRUCCIONES'}'{ //7
		nodo1 = new Nodo('repetirmientras',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| hacer '{' INSTRUCCIONES'}' mientras '(' OP ')' ';'{ //8
		nodo1 = new Nodo('hacer',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo3 = new Nodo('}',$4,@4,[]);
		nodo4 = new Nodo('mientras',$5,@5,[]);
		nodo5 = new Nodo('(',$6,@6,[]);
		nodo8 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo3,nodo4,nodo5,$7,nodo8]);
		$$ = nodo;
	}
	| repetir '{' INSTRUCCIONES'}' hastaque '(' OP ')' ';'{ //9
		nodo1 = new Nodo('repetir',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo3 = new Nodo('}',$4,@4,[]);
		nodo4 = new Nodo('hastaque',$5,@5,[]);
		nodo5 = new Nodo('(',$6,@6,[]);
		nodo8 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo3,nodo4,nodo5,$7,nodo8]);
		$$ = nodo;
	}
	| ciclodoble '(' OP "," OP ')' '{' INSTRUCCIONES '}'{ //10
		nodo1 = new Nodo('ciclodoble',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo7 = new Nodo('{',$7,@7,[]);
		nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo3,$5,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	| enciclar id '{' INSTRUCCIONES '}'{ //5
		nodo1 = new Nodo('enciclar',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('{',$3,@3,[]);
		nodo4 = new Nodo('}',$5,@5,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,nodo3,$4,nodo4]);
		$$ = nodo;
	};


FOR 	: repetircontando '(' variable ':' id ';' desde ':' OP ';' hasta ':' OP ')' '{' INSTRUCCIONES'}'{ //5//9//13//16
		nodo1 = new Nodo('repetircontando',$1,@1,[]); nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('variable',$3,@3,[]); nodo4 = new Nodo('id',$5,@5,[]);
		nodo5 = new Nodo(';',$5,@5,[]); nodo6 = new Nodo('desde',$6,@6,[]);
		nodo8 = new Nodo(';',$8,@8,[]); nodo9 = new Nodo('hasta',$9,@9,[]);
		nodo11 = new Nodo(')',$11,@11,[]);
		nodo  = new Nodo("FOR",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6, $9,nodo8,nodo9,$13,nodo11,$16]);
		$$ = nodo;
	}
	| contador '(' OP ')' '{' INSTRUCCIONES'}'{//7
		nodo1 = new Nodo('contador',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo6 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("FOR",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo6]);
		$$ = nodo;
	};


TECLADO : leerteclado '(' OP "," id ')' ';'{ //10
		nodo1 = new Nodo('ciclodoble',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo3,nodo5,nodo6,$7,nodo6]);
		$$ = nodo;
	};








OP: E { 
		nodo  = new Nodo("OP",$1,@1,[$1]);
		$$ = nodo;
		//console.log("Expresion"); 
	};


E   : '(' E ')'{
		nodo1 = new Nodo('(',$1,@1,[]);
		nodo2 = new Nodo(')',$3,@3,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,$2,nodo2]);
		$$ = nodo;
	}
    | E '+' E{
		nodo1 = new Nodo('+',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '-' E{
		nodo1 = new Nodo('-',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '*' E{
		nodo1 = new Nodo('*',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '/' E{
		nodo1 = new Nodo('/',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '^' E{
		nodo1 = new Nodo('^',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '!'{
		nodo1 = new Nodo('!',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1]);
		$$ = nodo;
	}
    | '-' E %prec UMINUS{
		nodo1 = new Nodo('-',$1,@1,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,$2]);
		$$ = nodo;
	} 
    | E '>=' E{
		nodo1 = new Nodo('>=',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '<=' E{
		nodo1 = new Nodo('<=',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '==' E{
		nodo1 = new Nodo('==',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '!=' E{
		nodo1 = new Nodo('!=',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '>' E{
		nodo1 = new Nodo('>',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '<' E{
		nodo1 = new Nodo('<',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '||' E{
		nodo1 = new Nodo('||',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '&&' E{
		nodo1 = new Nodo('&&',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '??' E{
		nodo1 = new Nodo('??',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| verdadero{
		nodo1 = new Nodo("verdadero",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
	| falso{
		nodo1 = new Nodo("falso",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
	| E '++'{
		nodo1 = new Nodo('++',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1]);
		$$ = nodo;
	}
	| E '--'{
		nodo1 = new Nodo('--',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1]);
		$$ = nodo;
	}
    | numEntero{
		nodo1 = new Nodo("entero",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
	| numDecimal{
		nodo1 = new Nodo("decimal",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}
    | id {
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
    | cadenaDoble{
		nodo1 = new Nodo("cadenaDoble",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
    | cadenaSimple{
		nodo1 = new Nodo("cadenaSimple",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| nada{
		nodo1 = new Nodo("nada",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| nulo{
		nodo1 = new Nodo("nulo",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| este '.' id { //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,nodo2,nodo3,nodo1]);
		$$ = nodo;
	}
	| este '.' id INSTANCIA{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,nodo2,nodo3,$4]);
		$$ = nodo;
	}
 	| FUNCIONES {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	| LLAMADA {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	| CONCATENAR {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	| MEMORIA {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	|FUNCION_EDD {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	| id INSTANCIA {
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}	
	| id DIMENSION { 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,$2]);
		$$ = nodo;
	};


			
%%
function Nodo(nombre, token, posicion, hijos){
	this.nombre = nombre;
	this.token = token;
	this.posicion = posicion;
	this.hijos = hijos;	
}
parser.arbol = {
	raiz:null
};
