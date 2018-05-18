
/* description: Parses and executes mathematical expressions. */
/* GCC compiler compiladores 2 */

/* lexical grammar */
%{
    var cadena = "";
    var contador = 0;

    class Leccion
    {
        constructor() 
        {
            this.titulo = "";
            this.descripcion = "";            
            this.codigoEjemplo = "";
            this.enunciadoTarea = "";
            this.pruebas = "";
            this.tipoLeccion = 1;
        }

        setAtributo(atributo, valor)
        {
            switch(atributo.toLowerCase())
            {
                case "titulo":
                    this.titulo = valor;
                    break;
                case "descripcion":
                    this.descripcion = valor;
                    break;
                case "ejemplo":
                    this.codigoEjemplo = valor;
                    break;
                case "resultado":
                    this.pruebas = valor;
                    break;
                case "tarea":
                    this.enunciadoTarea = valor;
                    break;                    
                case "tipo":
                    if(valor.toLowerCase() == "a-coach")
                    {
                        this.tipoLeccion = 2;
                    }
                    if(valor.toLowerCase() == "g-coach")
                    {
                        this.tipoLeccion = 1;
                    }                    
                    break;                                                                                
            }
        }
    }
%}


%lex

%options case-insensitive

%s LECCION CUERPO CONTENIDO

%%
inicio        this.begin('INITIAL');

<INITIAL>\s+               
                    %{ 
                        //console.log("ESPACIO EN BLANCO :V");                      
                    %}
<INITIAL>"{%"                  
                    %{ 
                        this.begin('LECCION');  
                        console.log("|--|\t"+yytext);                      
                        return 'IL';
                    %}      
<LECCION>\s+     
                    %{ 
                        //console.log("ESPACIO EN BLANCO :V");                      
                    %}                        
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
                        this.begin('INITIAL'); 
                        console.log("|--|\t"+yytext);                         
                        return 'FL';
                    %}  
<LECCION>.          return 'INVALID'    
<CUERPO>\s+     
                    %{ 
                        //console.log("ESPACIO EN BLANCO :V");                      
                    %} 
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
<CONTENIDO>\s+     
                    %{ 
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

LECCION :  LECCIONES EOF { return $1;};


LECCIONES
    : LECCIONES LECCION1
                {                 
                    var lecciones = $1;  
                    var lecciones2 = $2;
                    lecciones.push(lecciones2);
                    $$ = lecciones;
                }    
    | LECCION1 
                {                 
                    var lecciones = []; 
                    lecciones.push($1);
                    $$ = lecciones;                
                }     
    ;

LECCION1 
    : IL CONTENIDO FL 
                    { 
                        console.log("---------LECCION------------");
                        console.log($2);
                        $$ = $2;
                    };

CONTENIDO
    : CONTENIDO1 CONTENIDO
                {        
                    var leccionC = $2;    
                    leccionC.setAtributo($1[0],$1[1]);
                    $$ = leccionC;
                }    
    | CONTENIDO1 
                {                               
                    var leccion = new Leccion();
                    leccion.setAtributo($1[0],$1[1]);
                    $$ = leccion;
                };
CONTENIDO1
    : ATRIB AP VALOR CP 
                    {                               
                        var atributo = [];
                        atributo.push($1);
                        atributo.push($3);
                        $$ = atributo; 
                    };

ATRIB
    :TITULO {$$ = $1;} 
    |DESCRIPCION {$$ = $1;} 
    |EJEMPLO {$$ = $1;} 
    |TAREA  {$$ = $1;} 
    |RESULTADO {$$ = $1;} 
    |TIPO {$$ = $1;} ;
 