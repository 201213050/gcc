// load the things we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = require('json-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Conexion con base de datos
var pgp = require("pg-promise")(/**/);
var db = pgp("postgres://postgres:123@localhost:5432/gcc");
app.use(express.static('views'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) 
{
	db.any('select leccion.codigoLeccion as codigo, leccion.titulo, tipoLeccion.nombre as tipo from leccion inner join tipoLeccion on leccion.tipoLeccion = tipoLeccion.codigoTipoLeccion;'
		, [])
	    .then(function(data) 
	    {			
			console.log(data);
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

// A-Coach
app.get('/coachA', function(req, res) {
	res.render('pages/coachA');
});


// A-Coach abrir
app.get('/coachA/:id', function(req, res) 
{
	console.log(req.params.id);
	var codigo = req.params.id;
	db.one('select * from leccion where codigoleccion = $1 '
		, [codigo])
	    .then(function(data) 
	    {			
	    	console.log(data);
		    res.render('pages/leccion', {
		    	leccion: data    	       
		    }); 
	    })
	    .catch(function(error) 
	    {
			var leccion = [
				{
					titulo: '',
					explicacion: '',
					codigoejemplo: '',
					enunciadotarea: '',
					pruebas : '' 
				}
			]; // Aquí se guardan los títulos de las lecciones.		    	
			console.log("Error");
		    res.render('pages/leccion', {
		    	leccion: leccion        	       
		    }); 	        
	    });
});

// G-Coach
app.get('/coachG', function(req, res) {
	res.render('pages/coachG');
});

// G-Coach
app.get('/editor', function(req, res) {
	res.render('pages/editor');
});

// Registra una leccion coach a 
app.post('/registrarA', urlencodedParser, function(req, res){

	var registro = 0;
	db.none('INSERT INTO leccion(titulo, explicacion, codigoEjemplo, enunciadoTarea, pruebas, tipoLeccion) VALUES($1, $2, $3, $4, $5, $6)'
			, [req.body.titulo,req.body.explicacion, req.body.codigoEjemplo, req.body.enunciadoTarea, req.body.pruebas,1])
	    .then(() => {
			registro = 1;
	        console.log("Insercion exitosa.");
	    })
	    .catch(error => {
	        console.log("Error al insertar");
	    });
		res.render('pages/coachA', {
			registro: registro        	       
		});	
});



class Leccion
{
	constructor() 
	{
		this.titulo = "";
		this.descripcion = "";            
		this.codigoEjemplo = "";
		this.enunciadoTarea = "";
		this.pruebas = "";
		this.tipoLeccion = "";
	}
}

// Registra una leccion coach a 
app.post('/cargaMasiva', urlencodedParser, function(req, res){			
		console.log(req.body);
		var lecciones = req.body;
		for(var i = 0 ; i< lecciones.length ; i ++)
		{
			console.log(
				registrarLeccion(
					lecciones[i].titulo, 
					lecciones[i].descripcion,
					lecciones[i].codigoEjemplo, 
					lecciones[i].enunciadoTarea,
					lecciones[i].pruebas, 
					lecciones[i].tipoLeccion)
				);
		}
		res.sendStatus(200);
});

// Registra una leccion G-Coach 
app.post('/registrarG', urlencodedParser, function(req, res){
	var registro = 0;
	db.none('INSERT INTO leccion(titulo, explicacion, codigoEjemplo, enunciadoTarea, pruebas, tipoLeccion) VALUES($1, $2, $3, $4, $5, $6)'
			, [req.body.titulo,req.body.explicacion, req.body.codigoEjemplo, req.body.enunciadoTarea, req.body.pruebas,2])
	    .then(() => {
			registro = 1;
	        console.log("Insercion exitosa.");
	    })
	    .catch(error => {
	        console.log("Error al insertar");
	    });
		res.render('pages/coachG', {
			registro: registro        	       
		});		
});


function registrarLeccion(titulo, explicacion, ejemplo, tarea, pruebas, tipo)
{
	db.none('INSERT INTO leccion(titulo, explicacion, codigoEjemplo, enunciadoTarea, pruebas, tipoLeccion) VALUES($1, $2, $3, $4, $5, $6)'
			, [titulo, explicacion, ejemplo, tarea, pruebas, tipo])
	    .then(() => {
			return 1;
	    })
	    .catch(error => {
	        return 0;
	    });	
}


app.listen(8080);
console.log('Servidor en puerto 8080');
