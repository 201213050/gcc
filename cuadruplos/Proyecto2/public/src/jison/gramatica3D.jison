/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */

//comentarios
"/*"[^'*']*"*/"         return;
"//"[^\r\n]*[^\r\n]     return;

"stack"               return 'stack';
"heap"                return 'heap';
"pool"                return 'pool';

"printf"              return 'printf';
"%c"                  return '%c';
"%d"                  return '%d';
"%f"                  return '%f';

"if"                  return 'if';
"goto"                return 'goto';
"void"                return 'void';


"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"^"                   return '^';
"%"                   return '%';

//operadores relacionales
"=="                  return '==';
">="                  return '>=';
"<="                  return '<=';
">"                   return '>';
"<"                   return '<';
"!="                  return '!=';

"="                   return '=';
";"                   return ';';
","                   return ',';
"["                   return '[';
"]"                   return ']';
":"                   return ':';

"("                   return '(';
")"                   return ')';
"{"                   return '{';
"}"                   return '}';

([a-zA-Z]|"_"|"$")([a-zA-Z]|[0-9]|"_"|"$")* return 'id';
[0-9]+("."[0-9]+)?\b  return 'num';

<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/' '%'
%left '^'
%left UMINUS

%start INICIO

%% /* language grammar */

INICIO
    : CUERPOS EOF
        {
            //print($1); 
            return $1;
        }
    ;


EXPA:DATO '+' DATO 
        {
            $$=crearNodo("+",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '-' DATO
        {
            $$=crearNodo("-",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '*' DATO
        {
            $$=crearNodo("*",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '/' DATO
        {
            $$=crearNodo("/",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '%' DATO
        {
            $$=crearNodo("%",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '^' DATO
        {
            $$=crearNodo("^",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |'-' DATO 
        {
            $$=crearNodo("unario",@1.first_line,@1.first_column);
            $$.add($2);
        }
    |DATO 
        {
            $$=$1;
        };


//expresiones relacionales
EXPR: DATO '==' DATO
        {
            $$=crearNodo("==",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '!=' DATO
        {
            $$=crearNodo("!=",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '>' DATO
        {
            $$=crearNodo(">",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO'>=' DATO
        {
            $$=crearNodo(">=",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '<' DATO
        {
            $$=crearNodo("<",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO '<=' DATO
        {
            $$=crearNodo("<=",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |DATO
        {
            $$=$1;
        };


DATO: id {$$=crearHoja('id',$1,@1.first_line,@1.first_column);}
    |num {$$=crearHoja('num',Number($1),@1.first_line,@1.first_column);};


ASIGNACION: id '=' EXPA ';' 
                {
                    $$=crearNodo("asignacion",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$1,@1.first_line,@1.first_column);
                    $$.add(nodo);
                    $$.add($3);

                }
            |'stack' '[' DATO ']' '=' DATO ';' 
                {
                    $$=crearNodo("asignacionStack",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($6);
                }
            |'heap' '[' DATO ']' '=' DATO ';' 
                {
                    $$=crearNodo("asignacionHeap",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($6);
                }
            |'pool' '[' DATO ']' '=' DATO ';' 
                {
                    $$=crearNodo("asignacionPool",@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($6);
                }
            |id '=' 'stack' '[' DATO ']' ';' 
                {
                    $$=crearNodo("accesoStack",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$1,@1.first_line,@1.first_column);
                    $$.add(nodo);
                    $$.add($5);
                }
            |id '=' 'heap' '[' DATO ']' ';' 
                {
                    $$=crearNodo("accesoHeap",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$1,@1.first_line,@1.first_column);
                    $$.add(nodo);
                    $$.add($5);
                }
            |id '=' 'pool' '[' DATO ']' ';' 
                {
                    $$=crearNodo("accesoPool",@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$1,@1.first_line,@1.first_column);
                    $$.add(nodo);
                    $$.add($5);
                }
            |id '(' ')' ';'
                {
                    $$=crearHoja("llamada",$1,@1.first_line,@1.first_column);
                }    
            |'goto' id ';' 
                {
                    $$=crearHoja("saltoIncondicional",$2,@1.first_line,@1.first_column);
                }
            |ETIQUETA ':' 
                {
                    $$=crearNodo("etiquetaLLegada",@1.first_line,@1.first_column);
                    $$.add($1);
                }
            |ETIQUETA ':' ';'
                {
                    $$=crearNodo("etiquetaSalida",@1.first_line,@1.first_column);
                    $$.add($1);
                }; 



ETIQUETA:ETIQUETA ',' id 
            {   
                var nodo=crearHoja("etiqueta",$3,@1.first_line,@1.first_column);
                $$.add(nodo);
            }
        |id 
            {
                $$=crearNodo("etiquetas",@1.first_line,@1.first_column);
                var nodo=crearHoja("etiqueta",$1,@1.first_line,@1.first_column);
                $$.add(nodo);
            };


CONTROLIF: 'if' '(' EXPR ')' 'goto' id ';' 
           'goto' id ';' 
                {
                    $$=crearNodo("if",@1.first_line,@1.first_column);
                    $$.add($3);
                    var etiV=crearHoja("etiV",$6,@6.first_line,@6.first_column);
                    $$.add(etiV);
                    var etiF=crearHoja("etiF",$9,@9.first_line,@9.first_column);
                    $$.add(etiF);
                };


PRIMITIVAS:'printf' '(' '%c' ',' DATO ')' ';' 
                {
                    $$=crearHoja("printf",$3,@1.first_line,@1.first_column);
                    $$.add($5);
                }
            |'printf' '(' '%d' ',' DATO ')' ';' 
                {
                    $$=crearHoja("printf",$3,@1.first_line,@1.first_column);
                    $$.add($5);
                }
            |'printf' '(' '%f' ',' DATO ')' ';' 
                {
                    $$=crearHoja("printf",$3,@1.first_line,@1.first_column);
                    $$.add($5);
                };



SENTENCIA: ASIGNACION 
            {
                $$=$1;
            }
        |CONTROLIF 
            {
                $$=$1;
            }
        |PRIMITIVAS 
            {
                $$=$1;
            };

SENTENCIASTAR:SENTENCIAS {$$=$1;}
            |{$$=crearNodo("sentencias",0,0);};


SENTENCIAS:SENTENCIAS SENTENCIA 
            {
                $$.add($2);
            }
        |SENTENCIA 
            {
                $$=crearNodo("sentencias",0,0);
                $$.add($1);
            };



METODO:'void' id '(' ')' '{' SENTENCIASTAR '}' 
            {
                $$=crearHoja("metodo",$2,@2.first_line,@2.first_column);
                $$.add($6);
            };


CUERPO:SENTENCIA 
        {
            $$=$1;
        }
    |METODO 
        {
            $$=$1;
        };


CUERPOS:CUERPOS CUERPO 
            {
                $$.add($2);
            }
        |CUERPO 
            {
                $$=crearNodo("cuerpo",0,0);
                $$.add($1);
            };

