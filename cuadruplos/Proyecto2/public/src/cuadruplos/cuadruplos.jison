/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive
%%
\s+                   /* skip whitespace */

//comentarios
"/*"[^'*']*"*/"         return;
"//"[^\r\n]*[^\r\n]     return;

----------------------------------------------------------


"stack"               return 'stack';
"heap"                return 'heap';

"printf"              return 'printf';
"%c"                  return '%c';
"%d"                  return '%d';
"%f"                  return '%f';


"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';

//operadores relacionales
"je"				return 'je';
"jne"				return 'jne'; 
"jg"				return 'jg';
"jge"				return 'jge';
"jl"				return 'jl';
"jle"				return 'jle';
"jmp"				return 'jmp'; 
"begin"				return 'begin'; 
"end"				return 'end';
"call"				return 'call';
"=>"				return '=>';
"<="				return '<='; 

"="                   return '=';
";"                   return ';';
":"                   return ':';
","                   return ',';
"("                   return '(';
")"                   return ')';

([a-zA-Z]|"_"|"$")([a-zA-Z]|[0-9]|"_"|"$")* return 'id';
("-")?[0-9]+("."[0-9]+)?\b  return 'num';

<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
/* %left UMINUS */

%start INICIO

%% /* language grammar */

INICIO
    : CUERPOS EOF {
            //print($1); 
            console.log("raiz " + $1);
            return $1;
        }
    ;

CUERPOS:CUERPOS CUERPO {
            $$.add($2);
        }

        |CUERPO {
            $$=crearNodo("cuerpo",0,0);
            $$.add($1);
        }
            ;

CUERPO: METODO {
            $$=$1;
        }
        | SENTENCIAS {
            $$=$1;
        } 
        ;



METODO : BEGIN SENTENCIASTAR END {
                $$=crearHoja("metodo",$1,@1.first_line,@1.first_column);
                $$.add($2);
            }
            ;

BEGIN : 'begin' ',' ',' ',' id {
                $$=$5;
            }   
            ;

END : 'end' ',' ',' ',' id
            ;

SENTENCIASTAR:LS_SENTENCIAS {
                $$=$1;
            }

            | {$$=crearNodo("sentencias",0,0);};

LS_SENTENCIAS : LS_SENTENCIAS SENTENCIAS   {
                $$.add($2);
            }
             
            | SENTENCIAS {
                $$=crearNodo("sentencias",0,0);
                $$.add($1);
            } 
            ;


SENTENCIAS : ASIGNACION     {
                $$=$1;
            }
            |CONDITION      {
                $$=$1;
            }      
            |GOTO           {
                $$=$1;
            }      
            |CALLMETODO     {
                $$=$1;
            }
            |PRINT    {
                $$=$1;
            }      
            |ETIQ ':'  {
                $$=crearNodo("etiquetaLLegada",@1.first_line,@1.first_column);
                $$.add($1);
            }
            |ETIQ ':' ';' {
                $$=crearNodo("etiquetaSalida",@1.first_line,@1.first_column);
                $$.add($1);
            }    
            ;

ASIGNACION : '+' ',' T ',' T ',' id{
                $$=crearNodo("+",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$7,@7.first_line,@7.first_column);
                    $$.add(nodo);
                    $$.add($3);
                    $$.add($5);
            }

            | '-' ',' T ',' T ',' id{
                $$=crearNodo("-",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$7,@7.first_line,@7.first_column);
                    $$.add(nodo);
                    $$.add($3);
                    $$.add($5);
            }

            | '*' ',' T ',' T ',' id{
                $$=crearNodo("*",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$7,@7.first_line,@7.first_column);
                    $$.add(nodo);
                    $$.add($3);
                    $$.add($5);
            }

            | '/' ',' T ',' T ',' id{
                $$=crearNodo("/",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$7,@7.first_line,@7.first_column);
                    $$.add(nodo);
                    $$.add($3);
                    $$.add($5);
            }

            | '=' ',' T ','  ',' id{
                $$=crearNodo("asignacion",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$6,@6.first_line,@6.first_column);
                    $$.add(nodo);
                    $$.add($3);
            }
            
            | '<=' ',' T ',' T ',' 'stack'{
                $$=crearNodo("<=Stack",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
            }

            | '<=' ',' T ',' T ',' 'heap'{
                $$=crearNodo("<=Heap",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
            }
            
            | '=>' ',' T ',' id ',' 'heap'{
                $$=crearNodo("=>Heap",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$5,@5.first_line,@5.first_column);
                    $$.add(nodo);
                    $$.add($3);
            }
            
            | '=>' ',' T ',' id ',' 'stack'{
                $$=crearNodo("=>Stack",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$5,@5.first_line,@5.first_column);
                    $$.add(nodo);
                    $$.add($3);
            }
            
            ;

CONDITION : 'je' ',' T ',' T ',' id{
                $$=crearNodo("je",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    var etiV=crearHoja("etiV",$7,@7.first_line,@7.first_column);
                    $$.add(etiV);
                    
            }

            | 'jne' ',' T ',' T ',' id{
                $$=crearNodo("jne",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    var etiV=crearHoja("etiV",$7,@7.first_line,@7.first_column);
                    $$.add(etiV);
            }

            | 'jg' ',' T ',' T ',' id{
                $$=crearNodo("jg",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    var etiV=crearHoja("etiV",$7,@7.first_line,@7.first_column);
                    $$.add(etiV);
            }

            | 'jge' ',' T ',' T ',' id{
                $$=crearNodo("jge",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    var etiV=crearHoja("etiV",$7,@7.first_line,@7.first_column);
                    $$.add(etiV);
            }

            | 'jl' ',' T ',' T ',' id{
                $$=crearNodo("jl",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    var etiV=crearHoja("etiV",$7,@7.first_line,@7.first_column);
                    $$.add(etiV);
            }

            | 'jle' ',' T ',' T ',' id{
                $$=crearNodo("jle",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    var etiV=crearHoja("etiV",$7,@7.first_line,@7.first_column);
                    $$.add(etiV);
            }
        ;

GOTO : 'jmp' ',' ',' ',' id {
               $$=crearHoja("jmp",$5,@1.first_line,@1.first_column);
            }
            ;

CALLMETODO : 'call' ',' ',' ',' id {
                    $$=crearHoja("llamada",$5,@1.first_line,@1.first_column);
            }
            ;

PRINT:'printf' '(' '%c' ',' T ')' ';' {
                     $$=crearHoja("printf",$3,@1.first_line,@1.first_column);
                    $$.add($5);
            }
                
            |'printf' '(' '%d' ',' T ')' ';' {
                   $$=crearHoja("printf",$3,@1.first_line,@1.first_column);
                    $$.add($5);
            }
                
            |'printf' '(' '%f' ',' T ')' ';' {
                $$=crearHoja("printf",$3,@1.first_line,@1.first_column);
                    $$.add($5);
            }
                ;



T: id {
        $$=crearHoja('id',$1,@1.first_line,@1.first_column);
    }
    |num{
        $$=crearHoja('num',Number($1),@1.first_line,@1.first_column);
    }
    ;


ETIQ : ETIQ ',' id{
                var nodo=crearHoja("etiqueta",$3,@1.first_line,@1.first_column);
                $$.add(nodo);
            }

            | id {
                $$=crearNodo("etiquetas",@1.first_line,@1.first_column);
                var nodo=crearHoja("etiqueta",$1,@1.first_line,@1.first_column);
                $$.add(nodo);
            }
            ;

//--------------------------------------------------------------------------------------
