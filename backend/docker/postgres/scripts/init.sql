CREATE USER lazerparatodos WITH ENCRYPTED PASSWORD 'mysecretpassword';
CREATE SCHEMA lazerparatodos_schema;
ALTER USER lazerparatodos SET search_path TO lazerparatodos_schema;
GRANT ALL PRIVILEGES ON SCHEMA lazerparatodos_schema TO lazerparatodos;
CREATE EXTENSION unaccent schema lazerparatodos_schema;

CREATE USER sonarqube WITH ENCRYPTED PASSWORD 'sonarqube';
CREATE SCHEMA sonarqube_schema;
ALTER USER sonarqube SET search_path TO sonarqube_schema;
GRANT ALL PRIVILEGES ON SCHEMA sonarqube_schema TO sonarqube;