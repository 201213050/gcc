class TablaSimbolos
{
    constructor()
    {
        var tabla = {}; 
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
        
        var HTML = "<html>";
        HTML += "<h1>TABLA DE SIMBOLOS</h1>";
        HTML += "<table border = \"1\">";
        HTML += "<tr>";
        HTML += "<th scope=\"col\">Nombre</th>";
        HTML += "<th scope=\"col\">Id</th>";
        HTML += "<th scope=\"col\">Ambito</th>";
        HTML += "<th scope=\"col\">Nivel</th>";
        HTML += "<th scope=\"col\">Posicion</th>";
        HTML += "<th scope=\"col\">Rol</th>";
        HTML += "<th scope=\"col\">Tipo</th>";
        HTML += "<th scope=\"col\">Visibilidad</th>";
        HTML += "<th scope=\"col\">Tamano</th>";
        HTML += "</tr>";
        
        var size = tabla.length;        
        this.tabla.forEach(element => 
        {
            HTML += "<tr>";
            HTML += "<td>" + element.nombre +"</td>";
            HTML += "<td>" + element.id +"</td>";
            HTML += "<td>" + element.ambito +"</td>";
            HTML += "<td>" + element.nivel +"</td>";
            HTML += "<td>" + element.posicion +"</td>";
            HTML += "<td>" + element.rol +"</td>";
            HTML += "<td>" + element.tipo +"</td>";
            HTML += "<td>" + element.visibilidad +"</td>";
            HTML += "<td>" + element.tamano +"</td>";
            HTML += "</tr>";            
        });

        HTML += "</table>";
        HTML += "</html>";
    }
    limpiar()
    {
        this.tabla = {};
    }
}
