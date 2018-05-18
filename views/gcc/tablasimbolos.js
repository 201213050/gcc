class TablaSimbolos
{
    constructor()
    {
        this.tabla = {}; 
    }
    agregarSimbolo(nombre, simbolo)
    {
        tabla[nombre] = simbolo;
    }
    getSimbolo(nombre)
    {
        return tabla[nombre];
    }
    existeSimbolo(nombre)
    {
        return tabla[nombre]!=null;
    }
    imprimir()
    {
        var size = this.tabla.length;  
        var i = 0;
        for(i = 0 ; i <size ; i++)
        {
            var element = this.tabla[i];
            windows.addSimbolo(
                element.nombre,
                element.id,
                element.ambito,
                element.nivel,
                element.posicion,
                element.rol,
                element.tamano,
                element.visibilidad,
                element.tamano
            ); 
        }      

    }
    limpiar()
    {
        this.tabla = {};
    }
}
