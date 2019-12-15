-- DDL
CREATE DATABASE simulacion;
USE simulacion;

CREATE TABLE simulacion(
    id_simulacion INT PRIMARY KEY AUTO_INCREMENT,
    fecha_simulacion TIMESTAMP NOT NULL
);

CREATE TABLE dia(
    id_dia INT PRIMARY KEY AUTO_INCREMENT,
    dia_simulacion INT NOT NULL,
    id_simulacion INT NOT NULL,
    poblacion INT NOT NULL,
    velocidad_media FLOAT NOT NULL,
    rango_medio FLOAT NOT NULL,
    tamano_medio FLOAT NOT NULL
);

-- DML
ALTER TABLE dia
ADD CONSTRAINT FOREIGN KEY(id_simulacion) REFERENCES simulacion(id_simulacion);


-- PL/SQL


-- SQL
-- INSERT INTO simulacion(fecha_simulacion) VALUES (NOW());
-- SELECT LAST_INSERT_ID() as id_simulacion;


-- INSERT INTO dia (id_simulacion, poblacion, velocidad_media, rango_medio, tamano_medio)
-- VALUES (?, ?, ?, ?, ?);


-- Vista
CREATE VIEW ultimas_simulaciones AS
WITH last_simu AS(
SELECT
id_simulacion
FROM simulacion
ORDER BY fecha_simulacion DESC
LIMIT 5
)
SELECT
    *
FROM dia WHERE id_simulacion IN (SELECT * FROM last_simu);



-- Usage
SELECT * FROM ultimas_simulaciones

-- DELETE FROM dia WHERE 1;
-- DELETE FROM simulacion WHERE 1;
