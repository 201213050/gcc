
class simbolo
{
    constructor()
    {
       this.nombre;
       this.id;
       this.ambito;
       this.nivel;
       this.posicion;
       this.tipo;
       this.rol;
       this.tamano;
       this.visibilidad; 
       this.valor;
       this.heredado;
       this.dimensiones = [];
    }
    setValores(nombre,id,ambito,nivel,posicion,tipo,rol,tamano,visibilidad,heredado)
    {
        this.nombre = nombre;
        this.id = id;
        this.ambito = ambito;
        this.nivel = nivel;
        this.posicion = posicion;
        this.tipo = tipo;
        this.rol = rol;
        this.tamano = tamano;
        this.visibilidad = visibilidad;
        this.heredado=heredado;     
    }
    setValores(nombre,id,ambito,nivel,posicion,tipo,rol,tamano,visibilidad,dimensiones)
    {
        this.nombre = nombre;
        this.id = id;
        this.ambito = ambito;
        this.nivel = nivel;
        this.posicion = posicion;
        this.tipo = tipo;
        this.rol = rol;
        this.tamano = tamano;
        this.visibilidad = visibilidad;     
        this.dimensiones = dimensiones;
    }    
}
