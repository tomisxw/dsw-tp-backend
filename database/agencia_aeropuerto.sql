-- Creación de la base de datos
CREATE DATABASE agencia_aeropuerto;
USE agencia_aeropuerto;

-- Tabla: aeropuerto
CREATE TABLE aeropuerto (
    id_aeropuerto INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacidad_aviones INT NOT NULL,
    numero_terminales INT NOT NULL
);

-- Tabla: avion
CREATE TABLE avion (
    id_avion INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(60) NOT NULL,
    capacidad_pasajeros INT NOT NULL,
    fabricante VARCHAR(60) NOT NULL,
    anio_fabricacion DATE NOT NULL,
    capacidad_kg INT NOT NULL,
    id_aeropuerto INT,
    FOREIGN KEY (id_aeropuerto) REFERENCES aeropuerto(id_aeropuerto)
);

-- Tabla: usuario
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(80) NOT NULL,
    fecha_registro DATETIME NOT NULL,
    fecha_nacimiendo DATE NOT NULL,
    numero_pasaporte INT NOT NULL,
    email VARCHAR(160) NOT NULL,
    rol VARCHAR(45) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    telefono INT NOT NULL
);

-- Tabla: vuelo
CREATE TABLE vuelo (
    id_vuelo INT AUTO_INCREMENT PRIMARY KEY,
    numero_vuelo INT NOT NULL,
    fecha_salida DATETIME NOT NULL,
    fecha_llegada DATETIME NOT NULL,
    estado VARCHAR(50) NOT NULL,
    id_avion INT,
    id_aeropuerto_origen INT,
    id_aeropuerto_destino INT,
    FOREIGN KEY (id_avion) REFERENCES avion(id_avion),
    FOREIGN KEY (id_aeropuerto_origen) REFERENCES aeropuerto(id_aeropuerto),
    FOREIGN KEY (id_aeropuerto_destino) REFERENCES aeropuerto(id_aeropuerto)
);

-- Tabla: reserva
CREATE TABLE reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    fecha_reserva DATETIME NOT NULL,
    estado VARCHAR(50) NOT NULL,
    id_usuario INT,
    id_vuelo INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_vuelo) REFERENCES vuelo(id_vuelo)
);

-- Tabla: pasaje
CREATE TABLE pasaje (
    id_pasaje INT AUTO_INCREMENT PRIMARY KEY,
    fecha_emision DATETIME NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    asiento VARCHAR(10) NOT NULL,
    clase VARCHAR(40) NOT NULL,
    id_vuelo INT,
    id_usuario INT,
    FOREIGN KEY (id_vuelo) REFERENCES vuelo(id_vuelo),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
