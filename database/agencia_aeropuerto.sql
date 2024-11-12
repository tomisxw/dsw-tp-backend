CREATE DATABASE agencia_aeropuerto;
USE agencia_aeropuerto;

-- Tabla: aeropuerto
CREATE TABLE aeropuerto (
    id_aeropuerto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)  ,
    capacidad_aviones INT  ,
    numero_terminales INT  
);

-- Tabla: avion
CREATE TABLE avion (
    id_avion INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(60) ,
    capacidad_pasajeros INT  ,
    fabricante VARCHAR(60)  ,
    anio_fabricacion int  ,
    capacidad_kg INT 
);

-- Tabla: usuario
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(80)  ,
    fecha_registro DATETIME  ,
    fecha_nacimiento DATE  ,
    numero_pasaporte VARCHAR(20)  ,
    email VARCHAR(160)  ,
    rol VARCHAR(45)  ,
    dni INT  ,
    telefono VARCHAR(20) 
);

-- Tabla: vuelo
CREATE TABLE vuelo (
    id_vuelo INT AUTO_INCREMENT PRIMARY KEY,
    numero_vuelo INT ,
    fecha_salida DATETIME ,
    fecha_llegada DATETIME ,
    estado VARCHAR(50),
    id_avion INT,
    id_aeropuerto_origen INT,
    id_aeropuerto_destino INT,
    FOREIGN KEY (id_avion) REFERENCES avion(id_avion),
    FOREIGN KEY (id_aeropuerto_origen) REFERENCES aeropuerto(id_aeropuerto),
    FOREIGN KEY (id_aeropuerto_destino) REFERENCES aeropuerto(id_aeropuerto)
);

-- Tabla: mantenimiento
CREATE TABLE mantenimiento (
    id_mantenimiento INT,
    fecha DATETIME,
    id_avion INT ,
    descripcion VARCHAR(200) ,
    tipo VARCHAR(20),
    PRIMARY KEY(`fecha`, `id_avion`,`id_mantenimiento`),
    FOREIGN KEY (id_avion) REFERENCES avion(id_avion)
);

-- Tabla: pasaje
CREATE TABLE pasaje (
    id_pasaje INT , 
    fecha_emision DATETIME  ,
    precio DECIMAL(10, 2) ,
    asiento VARCHAR(10) ,
    clase VARCHAR(40) ,
    id_vuelo INT,
    id_usuario INT ,
    PRIMARY KEY(`fecha_emision`,`id_vuelo`,`id_usuario`, `id_pasaje`),
    FOREIGN KEY (id_vuelo) REFERENCES vuelo(id_vuelo),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

create user if not exists dsw@'%' identified by 'dsw';
grant select, update, insert, delete on agencia_aeropuerto.* to dsw@'%';