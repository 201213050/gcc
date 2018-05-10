
// Creación del módulo
var app = angular.module('app', ['ngRoute','ngMaterial']);


app.service('basic',function(){
	//this.tabla=null;
	this.txtMetodos="";
	this.txtEstructuras="";
	this.txtCodigo3D="";
	this.txtConsola="";
	//this.txtCodigo3D="";
	//this.txtcodigoOptimizado="";

	//variables que serviran en la generacion de codigo 3d
	
});

// Configuración de las rutas
app.config(function($routeProvider,$mdThemingProvider) {
	
	$mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('grey')
      .warnPalette('green');
      

	$routeProvider
		.when('/', {
			templateUrl	: 'home/home.html',
			controller 	: 'navCtrl'
		})
		.when('/basic', {
			templateUrl : 'basic/basic.html',
			controller 	: 'navCtrl'
		})
		.when('/medium', {
			templateUrl : 'medium/medium.html',
			controller 	: 'navCtrl'
		})
		.when('/hard', {
			templateUrl : 'hard/hard.html',
			controller 	: 'navCtrl'
		})
		.when('/hard3D', {
			templateUrl : 'hard/hard3D.html',
			controller 	: 'navCtrl'
		})
		.when('/debug', {
			templateUrl : 'debug/debug.html',
			controller 	: 'navCtrl'
		})
		
		.when('/simbol', {
			templateUrl	: 'report/simbol.html',
			controller 	: 'simbolCtrl'
		})
		.when('/error', {
			templateUrl	: 'report/error.html',
			controller 	: 'errorCtrl'
		})
		.when('/bloques', {
			templateUrl : 'optimizacion/bloques.html',
			controller 	: 'navCtrl'
		})
		.when('/grafica', {
			templateUrl : 'optimizacion/grafica.html',
			controller 	: 'navCtrl'
		})
		.when('/optimizacion', {
			templateUrl : 'optimizacion/optimizacion.html',
			controller 	: 'navCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});


app.controller('navCtrl', function(basic) {
		var scope=this;
		scope.nombre="navegador"

});



