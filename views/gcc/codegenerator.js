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
        this.sobreescribir;
        this.heredado;
        this.sobreescribir=false;


    }
    setInicial()
    {
        this.etq = 0;
        this.tmp = 0;
        this.listaAboles = [];
        this.contadorImports = 0;
        this.tabla=new TablaSimbolos();     
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
                this.accesoClase="publico";
                this.heredado="N/A";
                switch(arbol.hijos.length){
                    case 4:{
                        var hijo0=arbol.hijos[0].etiqueta;
                        var hijo1=arbol.hijos[1].etiqueta;
                        var hijo2=arbol.hijos[2].etiqueta;
                        var hijo3=arbol.hijos[3].etiqueta;

                        if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="ID" && hijo3=="INSTRUCCIONESCUERPO"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor.toLowerCase();
                            this.idClase=id;
                            this.heredado=arbol.hijos[2].valor.toLowerCase();
                            this.llenarTabla(arbol.hijos[3]);

                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            error ExisteSimbolo(id,ambito);
                        }
                        break;
                    }
                    case 3:{
                        var hijo0=arbol.hijos[0].etiqueta;
                        var hijo1=arbol.hijos[1].etiqueta;
                        var hijo2=arbol.hijos[2].etiqueta;

                        if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="ID"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor.toLowerCase();
                            this.idClase=id;
                            this.heredado=arbol.hijos[2].valor.toLowerCase();

                        }
                        else if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="INSTRUCCIONESCUERPO"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor.toLowerCase();
                            this.idClase=id;
                            this.llenarTabla(arbol.hijos[2]);
                        }
                        else if(hijo0=="ID" && hijo1=="ID" && hijo2=="INSTRUCCIONESCUERPO"){
                            id=arbol.hijos[0].valor.toLowerCase();
                            this.idClase=id;
                            this.heredado=arbol.hijos[1].valor.toLowerCase();
                            this.llenarTabla(arbol.hijos[2]);
                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            error ExisteSimbolo(id,ambito);
                        }
                        break;
                    }
                    case 2:{
                        var hijo0=arbol.hijos[0].etiqueta;
                        var hijo1=arbol.hijos[1].etiqueta;

                        if(hijo0=="VISIBILIDAD" && hijo1=="ID"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor;
                            this.idClase=id;
                        }
                        else if(hijo0=="ID" && hijo1=="ID"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
                            this.heredado=arbol.hijos[2].valor;
                        }
                        else if(hijo0=="ID" && hijo1=="INSTRUCCIONESCUERPO"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
                            this.llenarTabla(arbol.hijos[1]);
                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            error ExisteSimbolo(id,ambito);
                        }
                        break;
                    }
                    case 1:{
                        var hijo0=arbol.hijos[0].etiqueta;

                        if(hijo0=="ID"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
                        }
                        break;
                    }

                }
            }
                else if (etiqueta == "INSTRUCCIONESCUERPO"){
                    for(var i=0; i<arbol.hijos.length;i++){
                        llenarTabla(arbol.hijos[i]);
                    }                       
                }
                else if (etiqueta == "MET_PRINCIPAL"){
                    var identificadores=[];
                    this.tamanoMetodo = 0;
                    this.ambitoid = 0;
                    this.params = "";
                    var acceso = "";
                    var id = "";
                    var tipo = "vacio";
                    var ambitotemp = this.ambito;
                    var posiciontemp = this.posicion;
                    this.posicion = 1;
                    
                    id = arbol.valor;


                    var nombre = ambito+"_"+id+params;
                    if (acceso == ""){acceso = accesoClase;}
                    var cantHijos = arbol.hijos.length;

                    // Cambio de ambito
                    this.ambito = nombre;
                    this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                    tthis = new Simbolo();
                    tthis.setValores(ambito+"_this",id,ambito,nivel,0,"entero","variable",4,"N/A");
                    this.tabla.agregarSimbolo(ambito+"_this",tthis);
                    this.tamanoMetodo++;

                    // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                    if(arbol.hijos.length>0){
                        llenarTabla(arbol.hijos[0]);
                    }

                    //Agregamos el "return" en la posicion 1 del metodo
                    /*
                    if (!(tipo.toLocaleLowerCase()=="vacio")){
                        ss = new Simbolo(ambito+"_return", id, ambito, nivel, posicion*4, tipo, "retorno", TAMANO, "N/A");
                        if(!tabla.existeSimbolo(ambito+"_return")) {
                            tabla.agregarSimbolo(ambito+"_return", ss);
                        }
                        posicion++;
                        tamanoMetodo++;
                    }
                    */

                    // Vuelvo al ámbito anterior
                    this.nivel--;
                    this.ambito = ambitotemp;
                    this.posicion = posiciontemp;

                    // Agregamos metodo a la tabla de simbolos
                    nombre+="()";
                    ss = NULL;
                    if(id.toLocaleLowerCase() == this.idClase.toLocaleLowerCase() && tipo.toLowerCase()=="vacio"){
                        ss = new Simbolo();
                        ss.setValores(nombre,id,ambitotemp,nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso);
                    } else {
                        ss = new Simbolo();
                        ss.setValores(nombre,id,ambitotemp,nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso);
                    }

                    //Agregamos los identificadores de los parametros al simbolo
                    ss.parametros = identificadores;

                    //Verificamos que el simbolo no exista en la tabla de simbolos
                    if(!this.tabla.existeSimbolo(nombre)){
                        this.tabla.agregarSimbolo(nombre,ss);
                    } else {
                        error ExisteSimbolo(id,ambito);
                    }

                }

                else if (etiqueta == "CONSTRUCTOR"){
                    var identificadores=[];
                    this.tamanoMetodo = 0;
                    this.ambitoid = 0;
                    this.params = "";
                    var acceso = "";
                    var id = "";
                    var tipo = "vacio";
                    var ambitotemp = this.ambito;
                    var posiciontemp = this.posicion;
                    this.posicion = 1;
                    
                    switch(arbol.hijos.length){
                        case 4:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            var hijo3=arbol.hijos[3].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="PARAMETROS" && hijo3=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }

                            break;
                        }
                        case 3:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="PARAMETROS"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            else if(hijo0=="ID" && hijo1=="PARAMETROS" && hijo2=="INSTRUCCIONES"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                llenarTabla(arbol.hijos[2]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            else if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                llenarTabla(arbol.hijos[2]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            
                            break;
                        }
                        case 2:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;

                            if(hijo0=="ID" && hijo1=="PARAMETROS"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            else if(hijo0=="VISIBILIDAD" && hijo1=="ID"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            else if(hijo0=="ID" && hijo1=="INSTRUCCIONES"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                llenarTabla(arbol.hijos[1]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            break;
                        }
                        case 1:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            if(hijo0=="ID"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }

                            break;
                        }

                    }



                    var nombre = ambito+"_"+id+this.params;
                    if (acceso == ""){acceso = accesoClase;}
                    var cantHijos = arbol.hijos.length;

                    // Cambio de ambito
                    this.ambito = nombre;
                    this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                    tthis = new Simbolo(ambito+"_this",id,ambito,nivel,0,"entero","variable",4,"N/A");
                    this.tabla.agregarSimbolo(ambito+"_this",tthis);
                    this.tamanoMetodo++;

                    // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                    if(arbol.hijos.length>0){
                        llenarTabla(arbol.hijos[0]);
                    }

                    //Agregamos el "return" en la posicion 1 del metodo
                    /*
                    if (!(tipo.toLocaleLowerCase()=="vacio")){
                        ss = new Simbolo(ambito+"_return", id, ambito, nivel, posicion*4, tipo, "retorno", TAMANO, "N/A");
                        if(!tabla.existeSimbolo(ambito+"_return")) {
                            tabla.agregarSimbolo(ambito+"_return", ss);
                        }
                        posicion++;
                        tamanoMetodo++;
                    }
                    */

                    // Vuelvo al ámbito anterior
                    this.nivel--;
                    this.ambito = ambitotemp;
                    this.posicion = posiciontemp;

                    // Agregamos metodo a la tabla de simbolos
                    nombre+="()";
                    ss = NULL;
                    if(id.toLocaleLowerCase() == idClase.toLocaleLowerCase() && tipo=="vacio"){
                        ss = new Simbolo(nombre,id,ambitotemp,nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso);
                    } else {
                        ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso);
                    }

                    //Agregamos los identificadores de los parametros al simbolo
                    ss.parametros = identificadores;

                    //Verificamos que el simbolo no exista en la tabla de simbolos
                    if(!this.tabla.existeSimbolo(nombre)){
                        this.tabla.agregarSimbolo(nombre,ss);
                    } else {
                        error ExisteSimbolo(id,ambito);
                    }

                }
                else if(etiqueta=="PARAMETROS")
                {
                    for (i = 0; i<arbol.hijos.length; i++){
                        llenarTabla(arbol.hijos[i]);
                    }

                }
                else if(etiqueta=="PARAMETRO")
                {
                    this.params += "_"+arbol.hijos[1].valor;

                }

                else if(etiqueta=="SobreEscribir"){
                    this.sobreescribir=true;
                    for(i=0;i<arbol.hijos.length;i++){
                        this.llenarTabla();
                    }
                    this.sobreescribir=false;
                }
                else if(etiqueta=="METODO")
                {
                    var identificadores=[];
                    this.tamanoMetodo = 0;
                    this.ambitoid = 0;
                    this.params = "";
                    var acceso = "";
                    var id = "";
                    var tipo = "vacio";
                    var ambitotemp = this.ambito;
                    var posiciontemp = this.posicion;
                    this.posicion = 1;
                    
                    switch(arbol.hijos.length){
                        case 4:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            var hijo3=arbol.hijos[3].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="PARAMETROS" && hijo3=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }

                            break;
                        }
                        case 3:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="PARAMETROS"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            else if(hijo0=="ID" && hijo1=="PARAMETROS" && hijo2=="INSTRUCCIONES"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                llenarTabla(arbol.hijos[2]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            else if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                llenarTabla(arbol.hijos[2]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            
                            break;
                        }
                        case 2:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;

                            if(hijo0=="ID" && hijo1=="PARAMETROS"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            else if(hijo0=="VISIBILIDAD" && hijo1=="ID"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            else if(hijo0=="ID" && hijo1=="INSTRUCCIONES"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                llenarTabla(arbol.hijos[1]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }
                            break;
                        }
                        case 1:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            if(hijo0=="ID"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                TThis = new Simbolo(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new Simbolo(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", s);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                ss = NULL;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new Simbolo(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    error ExisteSimbolo(id,ambito);
                                }
                            }

                            break;
                        }

                    }



                    var nombre = ambito+"_"+id+this.params;
                    if (acceso == ""){acceso = accesoClase;}
                    var cantHijos = arbol.hijos.length;

                    // Cambio de ambito
                    this.ambito = nombre;
                    this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                    tthis = new Simbolo(ambito+"_this",id,ambito,nivel,0,"entero","variable",4,"N/A");
                    this.tabla.agregarSimbolo(ambito+"_this",tthis);
                    this.tamanoMetodo++;

                    // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                    if(arbol.hijos.length>0){
                        llenarTabla(arbol.hijos[0]);
                    }

                    //Agregamos el "return" en la posicion 1 del metodo
                    /*
                    if (!(tipo.toLocaleLowerCase()=="vacio")){
                        ss = new Simbolo(ambito+"_return", id, ambito, nivel, posicion*4, tipo, "retorno", TAMANO, "N/A");
                        if(!tabla.existeSimbolo(ambito+"_return")) {
                            tabla.agregarSimbolo(ambito+"_return", ss);
                        }
                        posicion++;
                        tamanoMetodo++;
                    }
                    */

                    // Vuelvo al ámbito anterior
                    this.nivel--;
                    this.ambito = ambitotemp;
                    this.posicion = posiciontemp;

                    // Agregamos metodo a la tabla de simbolos
                    nombre+="()";
                    ss = NULL;
                    if(id.toLocaleLowerCase() == idClase.toLocaleLowerCase() && tipo=="vacio"){
                        ss = new Simbolo(nombre,id,ambitotemp,nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso);
                    } else {
                        ss = new Simbolo(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso);
                    }

                    //Agregamos los identificadores de los parametros al simbolo
                    ss.parametros = identificadores;

                    //Verificamos que el simbolo no exista en la tabla de simbolos
                    if(!this.tabla.existeSimbolo(nombre)){
                        this.tabla.agregarSimbolo(nombre,ss);
                    } else {
                        error ExisteSimbolo(id,ambito);
                    }

                }                   

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
        
        
        
                }else if (etiqueta == "PARAMETROS"){
                    for (i = 0; i<arbol.hijos.length; i++){
                        llenarTabla(arbolhijos[i]);
                    }
                }else if (etiqueta == "PARAMETRO"){
                    params += "_"+arbol.hijos[1].hijos[0].etiqueta;
                } else if (etiqueta == "INSTRUCCIONES"){
                    var i = 0;
                    while(arbol.hijos[i]!=NULL){
                        llenarTabla(arbol.hijos[i]);
                        i++;
                    }
                }
                else if(etiqueta == "INSTRUCCION"){
                    llenarTabla(arbol.hijos[0]);
                }
                else if(etiqueta == "DECLARACIONVAR"){
                    var id = arbol.hijos[0].hijos[0].etiqueta;
                    var tipo = arbol.hijos[1].hijos[0].etiqueta;
                    var nombre = ambito+"_"+id;
                     s = new Simbolo(nombre,id,ambito,nivel,posicion*4,tipo,"variable",TAMANO,"N/A");
                    if(tipo == "cadena" && arbol.hijos[2]!=NULL){
                        var valor = arbol.hijos[2].hijos[0].hijos[0].hijos[0].etiqueta;
                        s.valor = valor;
                    }
                    if(!tabla.existeSimbolo(nombre)){
                        tabla.agregarSimbolo(nombre,s);
                        posicion++;
                        tamanoMetodo++;
                    } else {
                        ExisteSimbolo(id,ambito);
                    }
                }
                else if (etiqueta == "SI"){
                    ambitotmp = ambito;
                    ambito+="_if"+number(ambitoid);
                    ambitoid++;
                    var ambitoidtmp = ambitoid;
                    for(var i = 0; i<arbol.hijos.length; i++){
                        ambitoid = 0;
                        nivel++;
                        llenarTabla(arbol.hijos[i]);
                        nivel--;
                    }
                    ambitoid = ambitoidtmp;
                    ambito = ambitotmp;
                }
                else if(etiqueta == "DECLARACIONVEC"){
                    var acceso = arbol.hijos[0].hijos[0].etiqueta;
                    var id = arbol.hijos[1].hijos[0].etiqueta;
                    var tipo = arbol.hijos[2].hijos[0].etiqueta;
                    var rol = "vector";
                    var nombre = ambito+"_"+id;
        
        
                    if(!tabla.existeSimbolo(nombre)){
                        var dimensiones = [];
                        dimensiones = getDimensiones(dimensiones,arbol.hijos[3]);
                        s = new Simbolo(nombre,id,ambito,nivel,posicion*4,tipo,rol,TAMANO,acceso,dimensiones);
                        tabla.agregarSimbolo(nombre,s);
                        posicion++;
                    } else {ExisteSimbolo(id,ambito);}
                }
    
            }
        }
    }

    llenarConParametros(identifica, arbol)
    {
        if(arbol!=NULL){
            var etiqueta = arbol.etiqueta;
        if(etiqueta == "PARAMETROS"){
            for (i = 0; i<arbol.hijos.length; i++){
                var paramet=arbol.hijos[i];

                switch(paramet.hijos.length){
                    case 2:{
                        var hijo0=paramet.hijos[0];
                        var hijo1=paramet.hijos[1];
                        if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="ID"){
                            var id=hijo1.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            s = new Simbolo();
                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                error ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="ID"){
                            var id=hijo1.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            s = new Simbolo();
                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                error ExisteSimbolo(id,ambito);
                            }

                        }
                        break;
                    }
                    case 3:{
                        var hijo0=paramet.hijos[0];
                        var hijo1=paramet.hijos[1];
                        var hijo2=paramet.hijos[2];
                        if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="ID" && hijo2.etiqueta=="Dimension"){
                            var id=hijo1.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            s = new Simbolo();

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            s.arreglo=true;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                error ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="ID" && hijo2.etiqueta=="Dimension"){
                            var id=hijo1.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            s = new Simbolo();

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            s.arreglo=true;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                error ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID"){
                            var id=hijo2.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            s = new Simbolo();

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_ref",4,"N/A","N/A","N/A");
                            s.puntero=true;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                error ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID"){
                            var id=hijo2.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            s = new Simbolo();

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_ref",4,"N/A","N/A","N/A");
                            s.puntero=true;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                error ExisteSimbolo(id,ambito);
                            }

                        }
                        break;
                    }
                    case 4:{
                        var hijo0=paramet.hijos[0];
                        var hijo1=paramet.hijos[1];
                        var hijo2=paramet.hijos[2];
                        var hijo3=paramet.hijos[3];
                        if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID" && hijo3.etiqueta=="Dimension"){
                            var id=hijo2.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            s = new Simbolo();

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            s.arreglo=true;
                            s.puntero=true;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                error ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID" && hijo3.etiqueta=="Dimension"){
                            var id=hijo2.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            s = new Simbolo();

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            s.arreglo=true;
                            s.puntero=true;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                error ExisteSimbolo(id,ambito);
                            }

                        }
                        
                        break;
                    }


                }

            }
        } 
    }
    return identifica;
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