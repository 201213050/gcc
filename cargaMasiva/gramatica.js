
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex

%options flex case-insensitive
%s LECCION CUERPO CONTENIDO

%%

\s+                   /* skip whitespace */
"{%"                  
                    %{ 
                        this.begin('LECCION');
                        console.log("-----------------");
                        console.log(yytext );
                        return 'IL';
                    %}
.                   return 'INVALID'   

<LECCION>"titulo"  
                    %{
                        this.begin('CUERPO');
                        console.log("-----------------");
                        console.log(yytext );                       
                        return 'TITULO';
                   %}                                                        
<LECCION>"descripcion"
                    %{
                       this.begin('CUERPO');
                        console.log("-----------------");
                        console.log(yytext );                          
                       return 'DESCRIPCION';
                    %}
<LECCION>"ejemplo"
                    %{
                       this.begin('CUERPO');
                        console.log("-----------------");
                        console.log(yytext );                          
                       return 'EJEMPLO';
                    %}
<LECCION>"tarea"
                    %{
                       this.begin('CUERPO');
                        console.log("-----------------");
                        console.log(yytext );                          
                       return 'TAREA';
                    %}
<LECCION>"resultado"
                    %{
                       this.begin('CUERPO');
                        console.log("-----------------");
                        console.log(yytext );                          
                       return 'RESUTLTADO';
                    %}                                                            
<LECCION>"tipo"
                    %{
                       this.begin('CUERPO');
                        console.log("-----------------");
                        console.log(yytext );                          
                       return 'TITULO';
                    %}  
<LECCION>"%}"                 
                    %{
                        this.begin('YYINITIAL');
                        console.log("-----------------");
                        console.log(yytext );                           
                        return 'FL';
                    %}  

<LECCION>.          %{
                        return 'INVALID'                                    
                    %}

<CUERPO>"}"         
                    %{
                        this.begin('LECCION');
                        console.log("-------Saltar a Contenido----------");
                        console.log(yytext );   
                        return 'CP';                        
                    %}
<CUERPO>"{"         
                    %{
                        this.begin('CONTENIDO');
                        console.log("-------Saltar a Contenido----------");
                        console.log(yytext);   
                        return 'AP';                        
                    %}                                        
<CUERPO>.           %{return 'INVALID';%}
                            
/lex

/* operator associations and precedence */



%start LECCION

%% /* language grammar */

LECCION
    : AP;
/*
    : LECCION1 LECCION
    | LECCION1
    ;

LECCION1 
    : IL CONTENIDO FL;

CONTENIDO
    : CONTENIDO1 CONTENIDO
    | CONTENIDO1 ;

CONTENIDO1
    : ATRIB VALOR;

ATRIB
    :TITULO
    |DESCRIPCION
    |EJEMPLO
    |TAREA  
    |RESULTADO 
    |TIPO;
*/