// load the things we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Conexion con base de datos
var pgp = require("pg-promise")(/**/);
var db = pgp("postgres://postgres:123@localhost:5432/gcc");



// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) 
{
	db.any('select leccion.titulo, tipoLeccion.nombre as tipo from leccion inner join tipoLeccion on leccion.tipoLeccion = tipoLeccion.codigoTipoLeccion;'
		, [])
	    .then(function(data) 
	    {			
		    res.render('pages/index', {
		    	titulos: data    	       
		    }); 
	    })
	    .catch(function(error) 
	    {
			var lecciones = [
		        { titulo: 'Leccion If', tipo: "A-Coach" },
		        { titulo: 'Leccion If', tipo: "G-Coach" },
		        { titulo: 'Leccion Where', tipo: "A-Coach" },
		        { titulo: 'Leccion Do While', tipo: "A-Coach" }

			]; // Aquí se guardan los títulos de las lecciones.		    	
			console.log("Error");
		    res.render('pages/index', {
		    	titulos: lecciones        	       
		    }); 	        
	    });


 
});

// about page 
app.get('/about', function(req, res) {
	res.render('pages/about');
});

app.listen(8081);
console.log('8081 is the magic port');
