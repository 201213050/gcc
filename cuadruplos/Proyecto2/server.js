    // importar
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
     
    // instanciar
    
    var port = Number(process.env.PORT || 3000);

    app.use(express.static('public'));


 

    app.get("/debug", function(request, response) {

 
        response.redirect('/debug/debug.html');
   });  


app.use(bodyParser.urlencoded({ extended: false }));

app.post('/debugger', function (req, res) {

    var textoCodigo3D=req.body.editorCodigo3D;
    var pagina='<!doctype html><html><head></head><body>';
    pagina+='</textarea>'+textoCodigo3D+'</textarea>';
    pagina+='</body></html>';
    //res.redirect('debug/debug.html');   
    res.render('debug/debug.html');
});
    // escuchar
    app.listen(port);
    
    console.log('Servidor Express iniciado en http://localhost:' + port);
    //console.log("Servidor Express escuchando en modo %s", app.settings.env);

    
