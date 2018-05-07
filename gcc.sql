-- Database: gcc

-- DROP DATABASE gcc;

CREATE DATABASE gcc
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'Spanish_Guatemala.1252'
       LC_CTYPE = 'Spanish_Guatemala.1252'
       CONNECTION LIMIT = -1;


--tabla tipoLeccion
Create table tipoLeccion(
	codigoTipoLeccion SERIAL,
	nombre varchar(40) not null UNIQUE,
	primary key (codigoTipoLeccion)
);

--tabla Leccion
Create table leccion(
	codigoLeccion SERIAL,	
	titulo varchar(40) not null ,
	explicacion varchar(2000) not null,
	codigoEjemplo varchar(4000) not null,
	enunciadoTarea varchar(2000) not null,
	pruebas varchar(200) not null,
	tipoLeccion int references tipoLeccion(codigoTipoLeccion),
	primary key (codigoLeccion)	
);

insert into tipoLeccion(codigoTipoLeccion,nombre) values (1,'G-Coach');
insert into tipoLeccion(codigoTipoLeccion,nombre) values (2,'A-Coach');
select * from tipoLeccion;
select * from leccion;
delete from leccion where codigoleccion< 55 ;
ALTER SEQUENCE leccion_codigoLeccion_seq RESTART WITH 1;


select leccion.codigoLeccion as codigo, leccion.titulo, tipoLeccion.nombre as tipo
from leccion 
inner join tipoLeccion on leccion.tipoLeccion = tipoLeccion.codigoTipoLeccion order by codigo;

insert into leccion(titulo, explicacion, codigoEjemplo, enunciadoTarea, pruebas, tipoLeccion) values
	('Lección Polimorfismo', 'En este ejemplo explicaremos la sentencia if', 'if(true){imprimir("es verdadero");}', 'Se ingresa un número, si es mayor a 10 se imprime mensaje 1 si no, mensaje 2.', 'prueba(4) = false', 2);

