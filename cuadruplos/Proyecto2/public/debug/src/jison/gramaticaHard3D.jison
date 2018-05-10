/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */

//comentarios
"¿¿"[^'*']*"??"         return;
"%%"[^\r\n]*[^\r\n]     return;

//tipo de dato primitivo


"num"                 return 'numero';
"str"                 return 'cadena';
"bool"                return 'booleano';

//operadores aritmeticos
"*"                   return '*';
"/"                   return '/';
"%"                   return '%';
"-"                   return '-';
"+"                   return '+';
"^"                   return '^';

//operadores relacionales
"=="                  return '==';
">="                  return '>=';
"<="                  return '<=';
">"                   return '>';
"<"                   return '<';
"!="                  return '!=';

//operadores logicos
"||"                  return '||';
"|?"                  return '|?';
"&&"                  return '&&';
"&?"                  return '&?';
"|&"                  return '|&';
"!"                   return '!';


"("                   return '(';
")"                   return ')';

//simbolos
","                   return ',';
";"                   return ';';
"="                   return '=';
":"                   return ':';
"."                   return '.';
"{"                   return '{';
"}"                   return '}';
"["                   return '[';
"]"                   return ']';


//palabras reservadas
"NULL"|"null"         return 'null';
"array"               return 'array';
"of"                  return 'of';

"element"             return 'element';
"create"              return 'create';

"if"                  return 'if';
"then"                return 'then';
"else"                return 'else';

"switch"              return 'switch';
"case"                return 'case';
"default"             return 'default';

"break"               return 'break';
"continue"            return 'continue';
"return"              return 'return';

"while"               return 'while';
"whilex"              return 'whilex';
"do"                  return 'do';

"repeat"              return 'repeat';
"until"               return 'until';

"for"                 return 'for';

"loop"                return 'loop';

"count"               return 'count';

"void"                return 'void';

"Principal"           return 'Principal';

//funciones primitivas
"getBool"             return 'getBool';
"getNum"              return 'getNum';

//entradas y salidas
"outStr"              return 'outStr';
"outNum"              return 'outNum';
"inStr"               return 'inStr';
"inNum"               return 'inNum';
"show"                return 'show';

//otras
"getRandom"           return 'getRandom';
"getLength"           return 'getLength';
"while"               return 'while';

//excepciones
"throws"              return 'throws';
"NullPointerException"      return 'NullPointerException';
"MissingReturnStatement"    return 'MissingReturnStatement';
"ArithmeticException"       return 'ArithmeticException';
"StackOverFlowException"    return 'StackOverFlowException';
"HeapOverFlowException"     return 'HeapOverFlowException';
"PoolOverFlowException"     return 'PoolOverFlowException';

//------------------------------------------------------------------------


//num
[0-9]+("."[0-9]+)?\b  return 'num';
[0-9]+                return 'entero';

//bool
"true"|"false"        return 'bool'

//str
/*"\""[^"\n""\t"]*"\""|"'"[^"\n""\t"]*"'" return 'str';*/

"“"[^\"\n]*"”"                      return 'str'
"\""[^\"\n]*"\""                    return 'str'
"'"[a-zA-Z][^''\n]*"'"              return 'str'
"‘"[a-zA-Z][^''\n]*"’"              return 'str'


//id
([a-zA-Z]|"_")([a-zA-Z]|[0-9]|"_")* return 'id';
[a-zA-Z]+             return 'letra';

//---------------------------------------------------------------------------------------------------

<<EOF>>               return 'EOF';
.                     addError("Lexico",yytext,(yylloc.first_line-1),yylloc.first_column);console.log("Error lexico encontrado "+yytext+" Linea: "+(yylloc.first_line-1)+" columna: "+yylloc.first_column);

/lex

%{

function parseError2(str, hash){
    console.log("--------------------------");
    console.log(str+"  "+hash);
    console.log("--------------------------");
}





%}

/* operator associations and precedence */

%left '+' '-'
%left '*' '/' '%'
%left '^'
%left '(' ')'
%left '==' '!=' '>' '>=' '<' '<='
%left '||' '|?'
%left '&&' '&?'
%left '|&'
%right '!'
%left UMINUS

%start INICIO

%% /* language grammar */

INICIO
    : CUERPOSTAR EOF
      { 
        reiniciar();
        console.log($1+"//ultima linea");
        return $1; 
      };


CUERPOSTAR: CUERPOS 
                {
                    $$=$1;
                }
            |
                {
                    $$=crearNodo("cuerpo",1,1);
                };

CUERPOS:CUERPOS CUERPO 
            {
                $$.add($2);
            }
        |CUERPO 
            {
                $$=crearNodo("cuerpo",@1.first_line,@1.first_column);
                $$.add($1);
            };

//incluye declaracion de metodos,atributos globales y estructuras
CUERPO:ELEMENTO {$$=$1;}
        |METODO {$$=$1;}
        |SENTENCIA {$$=$1;};


//expresiones aritmeticas
EXPA: EXPA '+' EXPA
        {
            $$=crearNodo("+",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '-' EXPA
        {
            $$=crearNodo("-",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '*' EXPA
        {
            $$=crearNodo("*",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '/' EXPA
        {
            $$=crearNodo("/",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '%' EXPA
        {
            $$=crearNodo("%",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '^' EXPA
        {
            $$=crearNodo("^",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |'-' EXPA
        {
            $$=crearNodo("unario",@1.first_line,@1.first_column);  
            $$.add($2);
        }
    |'(' EXPL ')'
        {
            $$=$2;
        }
    |DATO
        {
            $$=$1;
        }
    |FUNCIONESNATIVAS 
        {
            $$=$1;
        }
    |ACCESO 
        {
            $$=$1;
        };
 





//expresiones relacionales
EXPR: EXPA '==' EXPA
        {
            $$=crearNodo("==",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '!=' EXPA
        {
            $$=crearNodo("!=",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '>' EXPA
        {
            $$=crearNodo(">",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '>=' EXPA
        {
            $$=crearNodo(">=",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '<' EXPA
        {
            $$=crearNodo("<",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA '<=' EXPA
        {
            $$=crearNodo("<=",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPA
        {
            $$=$1;
        };


//expresiones logicas
EXPL: EXPL '&&' EXPL
        {
            $$=crearNodo("&&",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);   
        }
    |EXPL '&?' EXPL
        {
            $$=crearNodo("&?",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPL '||' EXPL
        {
            $$=crearNodo("||",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPL '|?' EXPL
        {
            $$=crearNodo("|?",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |EXPL '|&' EXPL
        {
            $$=crearNodo("|&",@2.first_line,@2.first_column);
            $$.add($1);
            $$.add($3);
        }
    |'!' EXPL
        {
            $$=crearNodo("!",@1.first_line,@1.first_column);  
            $$.add($2);
        }
    |EXPR 
        {
            $$=$1;
        };






//datos obtenidos a partir de las expresios regulares
DATO: num
        {
            $$=crearHoja("num",Number($1),@1.first_line,@1.first_column);
        }
    |str
        {
            var cad=$1;
            cad=cad.substring(1,cad.length-1);
            $$=crearHoja("str",cad,@1.first_line,@1.first_column);
        }
    |bool
        {   if($1=="true"){
                $$=crearHoja("bool",true,@1.first_line,@1.first_column);
            }else{
                $$=crearHoja("bool",false,@1.first_line,@1.first_column);
            }        

        }
    |'null'
        {
            $$=crearHoja("null",$1,@1.first_line,@1.first_column);
        }; 


DATOELEMENT:EXPL
        {
            $$=$1;
        }
    |'null'
        {
            $$=crearHoja("null",$1,@1.first_line,@1.first_column);
        }; 


tipoDato:numero {$$=$1;}
        |cadena {$$=$1;}
        |booleano {$$=$1;};




//declaracion de variables 
DECLARACION:tipoDato LISTAIDS ';'
                {
                    $$=crearNodo('primitivaD',@1.first_line,@1.first_column);   
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    $$.add(tipo1) 
                    $$.add($2);
                }
            |tipoDato LISTAIDS ':' EXPL ';'
                {
                    $$=crearNodo('primitivaDA',@1.first_line,@1.first_column); 
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    $$.add(tipo1);
                    $$.add($2);
                    $$.add($4);
                }
            |id id ':' EXPL ';'
                {
                    $$=crearNodo('elementDD',@1.first_line,@1.first_column); 
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    $$.add(tipo1);
                    var lista=crearNodo('listaIds',@2.first_line,@2.first_column);
                    var nodo=crearHoja('id',$2,@2.first_line,@2.first_column);
                    lista.add(nodo);
                    $$.add(lista);
                    //var tipo2=crearHoja('tipo',$6,@6.first_line,@6.first_column);
                    $$.add($4);
                }
            |id id ':' 'create' '(' id ')' ';'
                {//57083071 Jorge Guerra
                    $$=crearNodo('elementDI',@1.first_line,@1.first_column); 
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    $$.add(tipo1);
                    var lista=crearNodo('listaIds',@2.first_line,@2.first_column);
                    var nodo=crearHoja('id',$2,@2.first_line,@2.first_column);
                    lista.add(nodo);
                    $$.add(lista);
                    var tipo2=crearHoja('tipo',$6,@6.first_line,@6.first_column);
                    $$.add(tipo2);
                }
            |id LISTAIDS ';'
                {
                    $$=crearNodo('elementD',@1.first_line,@1.first_column); 
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    $$.add(tipo1);
                    $$.add($2);
                }
            |'array' ':' id DIMENSION 'of' tipoDato ';'
                {
                    $$=crearNodo('array',@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$3,@3.first_line,@3.first_column);
                    $$.add(nodo);
                    $$.add($4);
                    var tipo1=crearHoja('tipo',$6,@6.first_line,@6.first_column);
                    $$.add(tipo1);
                };





//Dimension de vectores
DIMENSION: DIMENSION '[' VALORDIM ']' 
            {
                $$.add($3);
            }
        |'[' VALORDIM ']' 
            {
                $$=crearNodo('dimensiones',@2.first_line,@2.first_column);
                $$.add($2);
            };

VALORDIM: num 
            {
                $$=crearNodo('dimension',@1.first_line,@1.first_column);
                var inf=crearHoja('inf',0,@1.first_line,@1.first_column);
                var sup=crearHoja('sup',Number($1),@1.first_line,@1.first_column);
                $$.add(inf);
                $$.add(sup);
            }
        |num '.''.' num 
            {
                $$=crearNodo('dimension',@1.first_line,@1.first_column);
                var inf=crearHoja('inf',Number($1),@1.first_line,@1.first_column);
                var sup=crearHoja('sup',Number($4),@4.first_line,@4.first_column);
                $$.add(inf);
                $$.add(sup);
            };




//lista ids: a,b,c,d...
LISTAIDS: LISTAIDS ',' id
            {
                var nodo=crearHoja('id',$3,@3.first_line,@3.first_column);
                $$.add(nodo);
            }
        |id 
            {   
                $$=crearNodo("listaIds",@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$1,@1.first_line,@1.first_column);
                $$.add(nodo);
            };





//Declaracion de elements
ELEMENTO: 'element' ':' id '{' SENTENCIASELEMENTSTAR '}'    
            {
                $$=crearNodo("element",@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$3,@3.first_line,@3.first_column);
                $$.add(nodo);
                $$.add($5);
            };


//cero o muchas sentencias

SENTENCIASELEMENTSTAR: SENTENCIASELEMENT {$$=$1;}
                    |{$$=crearNodo("sentenciasElement",1,1);};


SENTENCIASELEMENT:SENTENCIASELEMENT SENTENCIAELEMENT    
                    {
                        $$.add($2);
                    }
                |SENTENCIAELEMENT 
                    {
                        $$=crearNodo("sentenciasElement",@1.first_line,@1.first_column);
                        $$.add($1);   
                    };

SENTENCIAELEMENT:DECLARACION
                    {
                        $$=$1;
                    }
                |ELEMENTO 
                    {
                        $$=$1;
                    };



//-----------------------------------------------------------------------------------------------
//SENTENCIAS QUE VAN DENTRO DE LOS METODOS


//Asignacion FALTAAAAAAAAAAAAAAAAAAAAAAAAAA
ASIGNACION: ACCESO '=' EXPL ';' 
                {
                    $$=crearNodo('asignacion',@1.first_line,@1.first_column);
                    $$.add($1);
                    $$.add($3);
                }
            |ACCESO '=' 'create' '(' id ')' ';' 
                {
                    $$=crearNodo('asignacionElement',@1.first_line,@1.first_column);
                    $$.add($1);
                    var tipo2=crearHoja('tipo',$5,@1.first_line,@1.first_column);  
                    $$.add(tipo2);
                }; 



//solo se llama a un metodo o funcion en el cuerpo 
LLAMADAMETODO: ACCESORECUR '.' LLAMADA ';' 
                {
                    $$.add($3);
                }
            |LLAMADA ';'
                {
                    $$=$1;
                };


ACCESO:ACCESORECUR 
            {
                $$=$1;
            };


ACCESORECUR:ACCESORECUR '.' TIPOACCESO 
                {
                    $$.add($3);
                }
            |TIPOACCESO 
                {
                    $$=crearNodo('acceso',@1.first_line,@1.first_column);
                    $$.add($1);
                };


TIPOACCESO: LLAMADA {$$=$1;}
            |ACCESOID {$$=$1;}
            |ACCESOARRAY {$$=$1;};


//llamada a un metodo
LLAMADA: id '(' VALORPARAMETROSTAR ')'   
            {
                $$=crearNodo('llamada',@1.first_line,@1.first_column);
                var nodoId=crearHoja('id',$1,@1.first_line,@1.first_column); 
                $$.add(nodoId);   
                $$.add($3);
            };


//valor de los parametros
VALORPARAMETROSTAR:VALORPARAMETROS {$$=$1;}
                    |{$$=crearNodo('valorParametros',1,1);};

VALORPARAMETROS:VALORPARAMETROS ',' EXPL 
                    {
                        $$.add($3);
                    }
                |EXPL 
                    {
                        $$=crearNodo('valorParametros',@1.first_line,@1.first_column);
                        $$.add($1);
                    };


//acceso a un variable primitiva o element
ACCESOID: id 
        {
            $$=crearNodo('accesoId',@1.first_line,@1.first_column);
            var nodoId=crearHoja('id',$1,@1.first_line,@1.first_column); 
            $$.add(nodoId);
        };


//acceso a la posicion de un arreglo
ACCESOARRAY:id INDICEARRAY 
            {
                $$=crearNodo('accesoArray',@1.first_line,@1.first_column); 
                var nodoId=crearHoja('id',$1,@1.first_line,@1.first_column); 
                $$.add(nodoId);
                $$.add($2);
            };


INDICEARRAY: INDICEARRAY '[' EXPL ']' 
            {
                $$.add($3);
            }
        |'[' EXPL ']' 
            {
                $$=crearNodo('indiceArray',@1.first_line,@1.first_column); 
                $$.add($2);
            };



//fin asignacion
//***********************************************************************







//Sentencia de control if
CONTROLIF: 'if' '(' EXPL ')' 'then' '{' SENTENCIASTAR '}' 
            {
                $$=crearNodo('if',@1.first_line,@1.first_column);
                $$.add($3);
                $$.add($7);
                var sentElse=crearNodo('sentencias',1,1);
                $$.add(sentElse);
            }
        |'if' '(' EXPL ')' 'then' '{' SENTENCIASTAR '}' 'else' '{' SENTENCIASTAR '}' 
                {
                    $$=crearNodo('ifElse',@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($7);
                    $$.add($11);       
                };





//Sentencia de contro switch
CONTROLSWITCH:'switch' '(' EXPL ',' bool ')' '{' CASOSTAR DEFECTO '}' 
                {
                    $$=crearNodo('switch',@1.first_line,@1.first_column); 
                    var modo=null;
                    if($5=="true"){
                        modo=crearHoja('modo',true,@5.first_line,@5.first_column); 
                    }else{
                        modo=crearHoja('modo',false,@5.first_line,@5.first_column); 
                    }
                    $$.add($3)
                    $$.add(modo);
                    $8.add($9);
                    $$.add($8);

                };

CASOSTAR:CASOS {$$=$1;}
        |{$$=crearNodo('casos',1,1);};

CASOS:CASOS CASO 
        {
            $$.add($2);
        }
    |CASO 
        {
            $$=crearNodo('casos',@1.first_line,@1.first_column);  
            $$.add($1);
        };


CASO:'case' VALORCASE ':' SENTENCIASTAR 
    {
        $$=crearNodo('case',@1.first_line,@1.first_column);
        $$.add($2);
        $$.add($4);
    };

DEFECTO:'default' ':' SENTENCIASTAR 
            {
                $$=crearNodo('default',@1.first_line,@1.first_column);
                var nodo=crearHoja('default','default',@1.first_line,@1.first_column);
                $$.add(nodo);
                $$.add($3);
            }
        |
            {
                $$=crearNodo('default',1,1);
                var sent=crearNodo('sentencias',1,1);
                var nodo=crearHoja('default','default',1,1);
                $$.add(nodo);
                $$.add(sent);
            };

VALORCASE: DATO 
            {
                $$=$1;
            }
        | DATO '-' DATO 
            {
                $$=crearNodo('rango',@1.first_line,@1.first_column);
                $$.add($1);
                $$.add($3);
            }; 







//branching
BRANCHING: 'break' ';' 
            {
                $$=crearHoja('break',$1,@1.first_line,@1.first_column);
            }
        |'break' id ';' 
            {
                $$=crearNodo('breakId',@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$2,@2.first_line,@2.first_column);
                $$.add(nodo);
            }
        |'continue' ';' 
            {
                $$=crearHoja('continue',$1,@1.first_line,@1.first_column);
            }
        |'return' ';' 
            {
                $$=crearHoja('return',$1,@1.first_line,@1.first_column);
            }
        |'return' EXPL ';' 
            {
                $$=crearNodo('return',@1.first_line,@1.first_column);
                $$.add($2);
            };





//ciclo while
CICLOWHILE:'while' '(' EXPL ')' '{' SENTENCIASTAR '}' 
                {
                    $$=crearNodo('while',@1.first_line,@1.first_column);  
                    $$.add($3);
                    $$.add($6); 
                };



//ciclo dowhile
CICLODOWHILE:'do' '{' SENTENCIASTAR '}' 'while' '(' EXPL ')'  
                {
                    $$=crearNodo('doWhile',@1.first_line,@1.first_column);  
                    $$.add($7);
                    $$.add($3); 
                };


//ciclo Repeat Until
CICLOREPEATUNTIL:'repeat' '{' SENTENCIASTAR '}' 'until' '(' EXPL ')'  
                {
                    $$=crearNodo('repeatUntil',@1.first_line,@1.first_column);  
                    $$.add($7);
                    $$.add($3); 
                };



//*************************

//ciclo loop
CICLOLOOP:'loop' id '{' SENTENCIASTAR '}' 
            {
                $$=crearNodo('loop',@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$2,@2.first_line,@2.first_column);
                $$.add(nodo);
                $$.add($4);
            };




//ciclo count
CICLOCOUNT:'count' '(' EXPL ')' '{' SENTENCIASTAR '}' 
                {
                    $$=crearNodo('count',@1.first_line,@1.first_column);  
                    $$.add($3);
                    $$.add($6); 
                };





//ciclo dowhilex
CICLODOWHILEX:'do' '{' SENTENCIASTAR '}' 'whilex' '(' EXPL ',' EXPL ')'  
                {
                    $$=crearNodo('doWhilex',@1.first_line,@1.first_column);  
                    $$.add($7);
                    $$.add($9);
                    $$.add($3); 
                };




//ciclo para

CICLOFOR:'for' '(' VARIABLEFOR ';' EXPL ';' VARIABLEFOR ')' '{' SENTENCIASTAR '}' 
            {
                $$=crearNodo('for',@1.first_line,@1.first_column);   
                $$.add($3);
                $$.add($5);
                $$.add($7);
                $$.add($10);
            };



//declaracion o asignacion de la variable del ciclo for
VARIABLEFOR: tipoDato id ':' EXPL 
                {
                    $$=crearNodo('primitivaDA',@1.first_line,@1.first_column); 
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    $$.add(tipo1);
                    var lista=crearNodo('listaIds',@2.first_line,@2.first_column);
                    var nodo=crearHoja('id',$2,@2.first_line,@2.first_column);
                    lista.add(nodo);
                    $$.add(lista);
                    $$.add($4);
                }
            |ACCESO '=' EXPL 
                {
                    $$=crearNodo('asignacionFor',@1.first_line,@1.first_column);
                    //var nodo=crearHoja('id',$1,@1.first_line,@1.first_column);
                    $$.add($1);
                    $$.add($3);
                };



//operacion simplificada del ciclo for
SIMPLIFICADA:id '+' '+' 
                {
                    $$=crearNodo('simplificada',@1.first_line,@1.first_column);
                    var nodoId=crearHoja('id',$1,@1.first_line,@1.first_column);
                    $$.add(nodoId);
                    var nodoTipo=crearHoja('aumento','++',@2.first_line,@2.first_column);
                    $$.add(nodoTipo);
                }
            |id '-' '-' 
                {
                    $$=crearNodo('simplificada',@1.first_line,@1.first_column);
                    var nodoId=crearHoja('id',$1,@1.first_line,@1.first_column);
                    $$.add(nodoId);
                    var nodoTipo=crearHoja('decremento','--',@2.first_line,@2.first_column);
                    $$.add(nodoTipo);
                };


//---------------------------------------------------------------------------------------







//declaracion de metodos
METODO : tipoDato ':' id '(' PARAMETROSTAR ')' '{' SENTENCIASTAR '}'
                {
                    $$=crearNodo('metodo',@1.first_line,@1.first_column);
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$3,@3.first_line,@3.first_column);
                    $$.add(tipo1);
                    $$.add(nodo);
                    $$.add($5);
                    $$.add($8);
                }
        |tipoDato SIMBOLOARRAY ':' id '(' PARAMETROSTAR ')' '{' SENTENCIASTAR '}'
                {
                    $$=crearNodo('metodoArray',@1.first_line,@1.first_column);
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    var dim=crearHoja('dimension',$2,@2.first_line,@2.first_column);
                    var nodo=crearHoja('id',$4,@4.first_line,@4.first_column);
                    $$.add(tipo1);
                    $$.add(nodo);
                    $$.add($6);
                    $$.add($9);
                    $$.add(dim);
                }
        |id ':' id '(' PARAMETROSTAR ')' '{' SENTENCIASTAR '}'
                {
                    $$=crearNodo('metodo',@1.first_line,@1.first_column);
                    var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                    var nodo=crearHoja('id',$3,@3.first_line,@3.first_column);
                    $$.add(tipo1);
                    $$.add(nodo);
                    $$.add($5);
                    $$.add($8);
                }
        |'void' ':' id '(' PARAMETROSTAR  ')' '{' SENTENCIASTAR '}'
            {
                $$=crearNodo('metodo',@1.first_line,@1.first_column);
                var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$3,@3.first_line,@3.first_column);
                $$.add(tipo1);
                $$.add(nodo);
                $$.add($5);
                $$.add($8);
            }
        |'Principal' '(' ')' '{' SENTENCIASTAR '}'
            {
                $$=crearNodo('metodo',@1.first_line,@1.first_column);
                var tipo1=crearHoja('tipo','void',@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$1,@1.first_line,@1.first_column);
                $$.add(tipo1);
                $$.add(nodo);
                var par=crearNodo('parametros',1,1);
                $$.add(par);
                $$.add($5);
            };





//equivalente a [][][][]....
SIMBOLOARRAY: SIMBOLOARRAY '[' ']' 
                {
                    $$=$$+1;
                }
            |'[' ']' 
                {
                    $$=1;
                };



//cero o muchos parametros
PARAMETROSTAR:PARAMETROS {$$=$1;}
            |{$$=crearNodo('parametros',1,1);};   


PARAMETROS:PARAMETROS ',' PARAMETRO 
            {
                $$.add($3);
            }
        |PARAMETRO 
            {
                $$=crearNodo('parametros',@1.first_line,@1.first_column);
                $$.add($1);
            };


//declaracion de parametros
PARAMETRO: tipoDato id 
            {
                $$=crearNodo('parametroVal',@1.first_line,@1.first_column);
                var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$2,@2.first_line,@2.first_column);
                $$.add(tipo1);
                $$.add(nodo);
            }
        |tipoDato '*' id 
            {
                $$=crearNodo('parametroRef',@1.first_line,@1.first_column);
                var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$3,@3.first_line,@3.first_column);
                $$.add(tipo1);
                $$.add(nodo);
            }
        |id id 
            {
                $$=crearNodo('parametroElement',@1.first_line,@1.first_column);
                var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$2,@2.first_line,@2.first_column);
                $$.add(tipo1);
                $$.add(nodo);
            }
        |tipoDato id DIMENSION 
            {
                $$=crearNodo('parametroArray',@1.first_line,@1.first_column);
                var tipo1=crearHoja('tipo',$1,@1.first_line,@1.first_column);
                var nodo=crearHoja('id',$2,@2.first_line,@2.first_column);
                $$.add(tipo1);
                $$.add(nodo);
                $$.add($3);
            };



//cero o muchas sentencias
SENTENCIASTAR:SENTENCIAS {$$=$1;}
            |{$$=crearNodo('sentencias',1,1);};


//sentencias
SENTENCIAS:SENTENCIAS SENTENCIA 
                    {
                        $$.add($2);
                    }
                |SENTENCIA 
                    {
                        $$=crearNodo('sentencias',@1.first_line,@1.first_column);
                        $$.add($1);
                    };


SENTENCIA:DECLARACION {$$=$1;}
        |ASIGNACION {$$=$1;} 
        |LLAMADAMETODO {$$=$1;}
        |CONTROLIF {$$=$1;} 
        |CONTROLSWITCH {$$=$1;}
        |BRANCHING {$$=$1;}
        |CICLOWHILE {$$=$1;}
        |CICLODOWHILE {$$=$1;}
        |CICLOREPEATUNTIL {$$=$1;}
        |CICLOLOOP {$$=$1;}
        |CICLOCOUNT {$$=$1;}
        |CICLODOWHILEX {$$=$1;}
        |CICLOFOR {$$=$1;}
        |METODOSNATIVOS {$$=$1;}
        |NATIVATHROWS {$$=$1;};

//tipo dato metodo
TIPOMETODO:'void'
            |'tipoDato'//tipoDato
            |'id';









//------------------------------------------------------------

//str sin las comillas limitadoras
STRSIMPLIFICADA:str
        {
            var cad=$1;
            cad=cad.substring(1,cad.length-1);
            $$=cad;
        };




//FUNCIONES NATIVAS QUE DEVUELVEN UN VALOR
//getBool :bool
NATIVAGETBOOL:'getBool' '(' EXPL ')' 
                {
                    $$=crearNodo('getBool',@1.first_line,@1.first_column);
                    $$.add($3);
                    //var nodo=crearHoja('str',$3,@3.first_line,@3.first_column);
                    //$$.add(nodo);
                };





//getNum :num
NATIVAGETNUM:'getNum' '(' EXPL ',' EXPL ',' EXPL ')' 
                {
                    $$=crearNodo('getNum',@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    $$.add($7);
                    //var nodoValor=crearHoja('str',$3,@3.first_line,@3.first_column);
                    //$$.add(nodoValor);
                    //var nodoBase=crearHoja('base',$5,@5.first_line,@5.first_column);
                    //$$.add(nodoBase);
                    //var nodoDefault=crearHoja('default',Number($7),@7.first_line,@7.first_column);
                    //$$.add(nodoDefault);
                };





//inNum :num
NATIVAINNUM:'inNum' '(' EXPL ',' EXPL ')' 
                {
                    $$=crearNodo('inNum',@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    //var nodoMsg=crearHoja('str',$3,@3.first_line,@3.first_column);
                    //$$.add(nodoMsg);
                    //var nodoDefault=crearHoja('num',Number($5),@5.first_line,@5.first_column);
                    //$$.add(nodoDefault);
                };




//getRandom :num
NATIVAGETRANDOM:'getRandom' '(' ')' 
                {
                    $$=crearHoja('getRandom',$1,@1.first_line,@1.first_column);
                };





//getLength :num
NATIVAGETLENGTH:'getLength' '(' ACCESO ',' EXPL ')' 
                {
                    $$=crearNodo('getLength',@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    //var nodoId=crearHoja('id',$3,@3.first_line,@3.first_column);
                    //$$.add(nodoId);
                    //var nodoDim=crearHoja('num',Number($5),@5.first_line,@5.first_column);
                    //$$.add(nodoDim);
                };




//getLengthCad :num
NATIVAGETLENGTHCAD:'getLength' '(' EXPL ')' 
                {
                    $$=crearNodo('getLengthCad',@1.first_line,@1.first_column);
                    $$.add($3);
                    //var nodoStr=crearHoja('str',$3,@3.first_line,@3.first_column);
                    //$$.add(nodoStr);
                };


//

FUNCIONESNATIVAS:NATIVAGETBOOL {$$=$1;}
                |NATIVAGETNUM {$$=$1;}
                |NATIVAINNUM {$$=$1;}
                |NATIVAGETRANDOM {$$=$1;}
                |NATIVAGETLENGTH {$$=$1;}
                |NATIVAGETLENGTHCAD {$$=$1;};






//FUNCIONES NATIVAS QUE NO DEVUELVEN VALOR
//outStr :void
NATIVAOUTSTR:'outStr' '(' EXPL ')' 
                {
                    $$=crearNodo('outStr',@1.first_line,@1.first_column);
                    $$.add($3);
                    //var nodo=crearHoja('str',$3,@3.first_line,@3.first_column);
                    //$$.add(nodo);
                };




//outNum :void
NATIVAOUTNUM:'outNum' '(' EXPL ',' EXPL ')' 
                {
                    $$=crearNodo('outNum',@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    /*var nodoValor=crearHoja('num',Number($3),@3.first_line,@3.first_column);
                    $$.add(nodoValor);
                    var nodoComoEntero=null;
                    if($5=="true"){
                        nodoComoEntero=crearHoja('bool',true,@5.first_line,@5.first_column);
                    }else{
                        nodoComoEntero=crearHoja('bool',false,@5.first_line,@5.first_column);
                    }
                    $$.add(nodoComoEntero);*/
                };


//inStr :void
NATIVAINSTR:'inStr' '(' ACCESO ',' EXPL ')' 
                {
                    $$=crearNodo('inStr',@1.first_line,@1.first_column);
                    $$.add($3);
                    $$.add($5);
                    //var nodoId=crearHoja('id',$3,@3.first_line,@3.first_column);
                    //$$.add(nodoId);
                    //$$.add($3);
                    //var nodoMsg=crearHoja('str',$5,@5.first_line,@5.first_column);
                    //$$.add(nodoMsg);
                };




NATIVASHOW:'show' '(' EXPL ')' 
                {
                    $$=crearNodo('show',@1.first_line,@1.first_column);
                    $$.add($3);
                    //var nodo=crearHoja('str',$3,@3.first_line,@3.first_column);
                    //$$.add(nodo);
                };



//metodos nativos que no devuelven nada

METODOSNATIVOS: NATIVAOUTSTR ';' {$$=$1;}
            |NATIVAOUTNUM ';' {$$=$1;}
            |NATIVAINSTR ';' {$$=$1;}
            |NATIVASHOW ';' {$$=$1;};





//excepciones
NATIVATHROWS: throws '(' EXCEPCION ')' ';'
                {
                    $$=crearNodo('throws',@1.first_line,@1.first_column);
                    $$.add($3);
                };

EXCEPCION: NullPointerException 
            {
                $$=crearHoja('excepcion',102,@1.first_line,@1.first_column);
            }
        |MissingReturnStatement
            {
                $$=crearHoja('excepcion',243,@1.first_line,@1.first_column);
            }
        |ArithmeticException
            {
                $$=crearHoja('excepcion',396,@1.first_line,@1.first_column);
            }
        |StackOverFlowException
            {
                $$=crearHoja('excepcion',624,@1.first_line,@1.first_column);
            }
        |HeapOverFlowException
            {
                {
                $$=crearHoja('excepcion',789,@1.first_line,@1.first_column);
            }
            }
        |PoolOverFlowException
            {
                $$=crearHoja('excepcion',801,@1.first_line,@1.first_column);
            };