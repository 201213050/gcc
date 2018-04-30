
/* description: Parses and executes mathematical expressions. */
/* GCC compiler compiladores 2 */

/* lexical grammar */
%{
    var cadena = "";
    var contador = 0;
%}


%lex

%options case-insensitive

%s LECCION CUERPO CONTENIDO

%%

\s+                   /* skip whitespace */

"{%"                  
                    %{ 
                        this.begin('LECCION');  
                        console.log("|--|\t"+yytext);                      
                        return 'IL';
                    %}
<LECCION>"\s+"      %{%}              
<LECCION>"titulo"  
                    %{
                        this.begin('CUERPO');    
                        console.log("|--|\t"+yytext);                                        
                        return 'TITULO';
                   %}                                                        
<LECCION>"descripcion"
                    %{
                       this.begin('CUERPO');  
                       console.log("|--|\t"+yytext);                                             
                       return 'DESCRIPCION';
                    %}
<LECCION>"ejemplo"
                    %{
                       this.begin('CUERPO'); 
                       console.log("|--|\t"+yytext);                         
                       return 'EJEMPLO';
                    %}
<LECCION>"tarea"
                    %{
                       this.begin('CUERPO');  
                       console.log("|--|\t"+yytext);                        
                       return 'TAREA';
                    %}
<LECCION>"resultado"
                    %{
                       this.begin('CUERPO'); 
                       console.log("|--|\t"+yytext);                        
                       return 'RESULTADO';
                    %}                                                            
<LECCION>"tipo"
                    %{
                       this.begin('CUERPO'); 
                       console.log("|--|\t"+yytext);                      
                       return 'TITULO';
                    %}  
<LECCION>"%}"                 
                    %{
                        this.begin('YYINITIAL'); 
                        console.log("|--|\t"+yytext);                         
                        return 'FL';
                    %}  
<LECCION>.          return 'INVALID' 
<CUERPO>"\s+"      %{%}    
<CUERPO>"{"         
                    %{
                        this.begin('CONTENIDO'); 
                        console.log("|--|\t"+yytext);
                        return 'AP';                        
                    %}
<CUERPO>"}"         
                    %{
                        this.begin('LECCION'); 
                        console.log("|--|\t"+yytext);
                        return 'CP';                        
                    %}                    
<CUERPO>.           
                    %{
                        return 'INVALID';
                    %}

<CONTENIDO>"\n"     %{ 
                        cadena = cadena + yytext;
                    %}
                   
<CONTENIDO>.
                    %{
                                               

                        if(yytext == "}")
                        {
                            contador = contador - 1;

                            if(contador == -1)
                            {
                                this.less();
                                yytext = cadena ;
                                console.log("------Valor----------\n"+ cadena);                                
                                cadena = "";
                                contador = 0;                                
                                this.begin('CUERPO');
                                return 'VALOR';
                            }
                            cadena = cadena + yytext; 
                        } 
                        else if(yytext == "{")
                        {
                            contador = contador + 1;
                            cadena = cadena + yytext; 
                        }
                        else
                        {
                            cadena = cadena + yytext;
                        }                                                                       
                    %}                      
                    

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%start LECCION

%% /* language grammar */

LECCION
    : LECCION1 LECCION
    | LECCION1
    ;

LECCION1 
    : IL CONTENIDO FL;

CONTENIDO
    : CONTENIDO1 CONTENIDO
    | CONTENIDO1 ;

CONTENIDO1
    : ATRIB AP VALOR CP;



ATRIB
    :TITULO
    |DESCRIPCION
    |EJEMPLO
    |TAREA  
    |RESULTADO 
    |TIPO;
 