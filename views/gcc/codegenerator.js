class GeneradorDeCodigo
{
    

    constructor()
    {
        this.codigo3D;
        this.decMetodos;
        this.decIniciales;
        this.eV;
        this.eF;
        this.eSalida;
        this.etRetorno;
        this.idClase;

        this.tmp;
        this.etq;

        this.listaArboles;

        this.tabla;

        this.ambitos;
        this.ambito;
        this.ambitotmp;
        this.accesoClase;
        this.params;
        this.tipo;
        this.metodoActual;
        this.tamanoMetodo;
        this.tamanoClase;
        this.nivel;
        this.posicion;
        this.ambitoid;
        this.contadorImports;
        this.cicloIf;


    }
    setInicial()
    {
        this.etq = 0;
        this.tmp = 0;
        this.listaAboles = [];
        this.contadorImports = 0;     
    }
    inicializar() {
        
        gdc.tabla.limpiar();
        this.etq = 0;
        this.tmp = 0;
        this.decMetodos = "";
        this.decIniciales = "";
        this.codigo3D = "";
        this.decMetodos+="void imprimir_cadena();|";
        this.decMetodos+="void imprimir_num();|";
        this.decMetodos+="void imprimir_caracter();|";
        
        //gdc.generarImprimir(); pendiente
    }

    Iniciar()
    {
        //pendiente este metodo;
        decIniciales = "#include <iostream>|";
        decIniciales += "using namespace std;|";
        decIniciales += "long Stack[10000];|";
        decIniciales += "long Heap[10000];|";
        console.log("generando codigo cuadruplos");
        this.cicloIf = false;
        emitirCodigo3D();
        archivo3D.close();

    }

    AgregarAbol(arbol)
    {
        this.listaAboles.push(arbol);
        analizarImports(arbol);
        this.contadorImports++;
        
        //imprimir tabla de simbolos pendiente
        //tabla.imprimir();
    }

    analizarImports(arbol){
        if(arbol!=NULL){
            var etiqueta = arbol.etiqueta;
    
            if(etiqueta == "INICIO"){
                for(i = 0; i < arbol.hijos.length; i++){
                    analizarImports(arbol.hijos[i]);
                }
            } else if (etiqueta == "IMPORTAR"){ //incompleto
                for (i = 0; i < arbol.hijos.length; i++){
                    analizarImports(arbol.hijos[i]);
                }
            } else if (etiqueta == "IMPORT"){
                path = arbol.hijos[0].etiqueta;
                CompilarImport(path);
    
            } else if (etiqueta == "CLASE"){
                //errores.open("errores.txt");
                llenarTabla(arbol);
                generarCodigo3D(tmp,etq,arbol);
                Iniciar();
                errores.close();
            }
        }
    }

    llenarTabla(arbol){
        if(arbol!=NULL){
            var etiqueta = arbol.etiqueta;
            console.log(etiqueta);
            //cout<<etiqueta.toStdString()<<endl;
    
            if(etiqueta == "INICIO"){
                for (i = 0; i< arbol.hijos.length; i++){
                    llenarTabla(arbol.hijos[i]);
                }
            }
    
            else if(etiqueta == "CLASE_LIST"){
                for (i = 0; i< arbol.hijos.length; i++){
                    llenarTabla(arbol.hijos[i]);
                }
            }
    
            else if(etiqueta == "CLASE"){
                this.ambitoid = 0;
                this.nivel = 0;
                this.posicion = 0;
                var id = "";
                for(i = 0; i< arbol.hijos.length; i++){
                    etiqueta = arbol.hijos[i].etiqueta;
                    if(etiqueta=="VISIBILIDAD"){
                        accesoClase = arbol.hijos[i].hijos[0].etiqueta;
                    } else if (etiqueta=="ID"){
                        id = arbol.hijos[i].hijos[0].etiqueta;
                        idClase = id;
                        ambito = id;
    
                    } else if (etiqueta == "INSTRUCCIONESCUERPO"){
                        llenarTabla(arbol.hijos[i]);
                    }
                }
                s = new Simbolo(id, id, "N/A", -1, -1, "N/A", "clase", posicion*4, accesoClase);
                if(!tabla.existeSimbolo(id)){
                    tabla.agregarSimbolo(id,s);
                } else {
                    ExisteSimbolo(id,ambito);
                }
            }
                else if (etiqueta == "INSTRUCCIONESCUERPO"){
                    i = 0;
                    while(arbolhijos[i]!=NULL){
                        llenarTabla(arbol.hijos[i]);
                        i++;
                    }
                }
                else if (etiqueta == "INSTRUCCIONCUERPO"){
                    llenarTabla(arbol.hijos[0]);
                }
                else if (etiqueta == "DECATR"){
                    i = 0;
                    hijo = arbol.hijos[i];
                    var id;
                    var visibilidad="publico";
                    var tipo;
                    while(hijo!=NULL){
                        if(hijo.etiqueta == "ID") {id = hijo.hijos[0].etiqueta;}
                        else if (hijo.etiqueta == "VISIBILIDAD") {visibilidad = hijo.hijos[0].etiqueta;}
                        else if (hijo.etiqueta == "TIPO") {tipo = hijo.hijos[0].etiqueta;}
                        i++;
                        hijo = arbol.hijos[i];
                    }
                    var nombre = ambito+"_"+id;
                    s = new Simbolo(nombre, id, ambito,nivel,posicion*4,tipo,"atributo",TAMANO,visibilidad);
                    if(!tabla.existeSimbolo(nombre)){
                        tabla.agregarSimbolo(nombre,s);
                        posicion++;
                    } else {
                        ExisteSimbolo(id,ambito);
                    }
                } else if (etiqueta == "METODO"){
                    var identificadores=[];
                    var tamanoMetodo = 0;
                    var ambitoid = 0;
                    var params = "";
                    var acceso = "";
                    var id = "";
                    var tipo = "";
                    var ambitotemp = ambito;
                    var posiciontemp = posicion;
                    var posicion = 1;
                    for (var i = 0; i<arbol.cantHijos; i++){
                        if(arbol.hijos[i].etiqueta=="VISIBILIDAD"){
                            acceso = arbol.hijos[i].hijos[0].etiqueta;
                        } else if(arbol.hijos[i].etiqueta == "ID"){
                            id = arbol.hijos[i].hijos[0].etiqueta;
                        } else if(arbol.hijos[i].etiqueta == "TIPO"){
                            tipo = arbol.hijos[i].hijos[0].etiqueta;
                        } else if (arbol.hijos[i].etiqueta=="PARAMETROS"){
                            llenarTabla(arbol.hijos[i]);
                            ambito = ambito+"_"+id+params;
                            nivel++;
                            identificadores = llenarConParametros(identificadores, arbol.hijos[i]);
                            ambito = ambitotemp;
                            nivel--;
                        }
                    }
        
                    //Creamos el nombre del metodo con el ambito, el id y los tipos de los parametros.
                    var nombre = ambito+"_"+id+params;
                    if (acceso == ""){acceso = accesoClase;}
                    var cantHijos = arbol.hijos.length;
        
                    // Cambio de ambito
                    ambito = nombre;
                    nivel++;
        
                    //Agregamos el "this" en la posicion 0 del metodo
                    TThis = new Simbolo(ambito+"_this",id,ambito,nivel,0,"entero","variable",TAMANO,"N/A");
                    tabla.agregarSimbolo(ambito+"_this",This);
                    tamanoMetodo++;
        
        
        
                    // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                    llenarTabla(arbol.hijos[cantHijos-1]);
        
                    //Agregamos el "return" en la posicion 1 del metodo
                    if (!(tipo=="ninguno")){
                        ss = new Simbolo(ambito+"_return", id, ambito, nivel, posicion*4, tipo, "retorno", TAMANO, "N/A");
                        if(!tabla.existeSimbolo(ambito+"_return")) {tabla.agregarSimbolo(ambito+"_return", s);}
                        posicion++;
                        tamanoMetodo++;
                    }
        
                    // Vuelvo al ámbito anterior
                    nivel--;
                    ambito = ambitotemp;
                    posicion = posiciontemp;
        
                    // Agregamos metodo a la tabla de simbolos
                    nombre+="()";
                    s1 = NULL;
                    if(id == idClase && tipo=="ninguno"){
                        s1 = new Simbolo(nombre,id,ambitotemp,nivel,-1,tipo,"constructor",tamanoMetodo*4,acceso);
                    } else {
                        s1 = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso);
                    }
        
                    //Agregamos los identificadores de los parametros al simbolo
                    s1.parametros = identificadores;
        
                    //Verificamos que el simbolo no exista en la tabla de simbolos
                    if(!tabla.existeSimbolo(nombre)){
                        tabla.agregarSimbolo(nombre,s);
                    } else {ExisteSimbolo(id,ambito);}
        
        
        
                }
    
            }
        }
    }


}
//falta arreglar metodos del inicio
//continuar recorrido
class GeneradorDeCodigo : public Errores
{
public:
    

    void llenarTabla(Nodo* arbol);
    void analizarImports(Nodo* arbol);
    void AgregarAbol(Nodo* arbol);
    QList<QString> llenarConParametros(QList<QString> &identificadores, Nodo* arbol);
    QString generarCodigo3D(int &tmp, int &etq, Nodo* arbol);
    QString getParamsTipo(QString params, Nodo* arbol);
    QString generarAsignacion(int &tmp, int &etq, Nodo* arbol);
    QString generarDecVar(int &tmp, int &etq, Nodo* arbol);
    void escribir(QString codigo);
    void emitirCodigo3D();
    QString generaTmp();
    QString generaETQ();
    
    QList<Nodo> *getDimensiones(QList<Nodo> *dimensiones, Nodo *arbol);
    
    void generarImprimir();


private:


    void generarParametros(QString temporal, QString nombre, Nodo* arbol, int &cont);
    void CompilarImport(QString path);


};