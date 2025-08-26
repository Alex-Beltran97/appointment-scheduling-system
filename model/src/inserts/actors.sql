BEGIN;

-- ******************Existents Actors:**************************

-- Insert data for company table

INSERT INTO core.company (
name, nit_code) VALUES (
'Consultores S.A.S.'::character varying, '900428042-2'::character varying)
  returning id;

INSERT INTO core.company (
name, nit_code) VALUES (
'Consultorias Y Asociados S.A.S.'::character varying, '900428033-2'::character varying)
  returning id;

-- SELECT * FROM core.company;

-----------------------------------------------------------------------------

-- Insert data for employee table

INSERT INTO core.employee (
name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES (
'Pepito Jaimito'::character varying, 'Perez'::character varying, 'Prieto'::character varying, '1990-01-01'::date, 'pepito.perez@example.com'::character varying, '+573135553333'::character varying, '3'::bigint, '1033888333'::numeric, '2'::bigint, 'T12345'::character varying)
  returning id;

INSERT INTO core.employee (
name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES (
'Cristina Maria'::character varying, 'Carvajal'::character varying, 'Leiton'::character varying, '1993-05-17'::date, 'cristina.carvajal@example.com'::character varying, '+573135553333'::character varying, '3'::bigint, '1033888777'::numeric, '1'::bigint, 'T87654'::character varying)
  returning id;

INSERT INTO core.employee (
name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES (
'Maria Fernanda'::character varying, 'Gomez'::character varying, 'Torres'::character varying, '1992-07-08'::date, 'maria.gomez@example.com'::character varying, '+573102223344'::character varying, '3', '1033888335', '1', 'T12347')
  returning id;

INSERT INTO core.employee (name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES
('Andres Felipe'::character varying, 'Martinez'::character varying, 'Quintero'::character varying, '1988-11-23'::date, 'andres.martinez@example.com'::character varying, '+573103334455'::character varying, '3', '1033888336', '2', 'T12348')
returning id;

INSERT INTO core.employee (name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES
('Luisa Alejandra'::character varying, 'Castro'::character varying, 'Moreno'::character varying, '1995-03-30'::date, 'luisa.castro@example.com'::character varying, '+573104445566'::character varying, '3', '1033888337', '2', 'T12349')
returning id;

INSERT INTO core.employee (name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES
('Carlos Alberto'::character varying, 'Sanchez'::character varying, 'Rios'::character varying, '1980-09-05'::date, 'carlos.sanchez@example.com'::character varying, '+573105556677'::character varying, '3', '1033888338', '2', 'T12350')
returning id;

INSERT INTO core.employee (name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES
('Valentina Sofia'::character varying, 'Hernandez'::character varying, 'Vega'::character varying, '1996-12-12'::date, 'valentina.hernandez@example.com'::character varying, '+573106667788'::character varying, '3', '1033888339', '2', 'T12351')
returning id;

INSERT INTO core.employee (name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES
('Santiago David'::character varying, 'Diaz'::character varying, 'Pardo'::character varying, '1987-04-19'::date, 'santiago.diaz@example.com'::character varying, '+573107778899'::character varying, '3', '1033888340', '2', 'T12352')
returning id;

INSERT INTO core.employee (name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES
('Natalia Andrea'::character varying, 'Lopez'::character varying, 'Camacho'::character varying, '1994-06-25'::date, 'natalia.lopez@example.com'::character varying, '+573108889900'::character varying, '3', '1033888341', '2', 'T12353')
returning id;

INSERT INTO core.employee (name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES
('Felipe Alejandro'::character varying, 'Morales'::character varying, 'Suarez'::character varying, '1991-10-02'::date, 'felipe.morales@example.com'::character varying, '+573109990011'::character varying, '3', '1033888342', '2', 'T12354')
returning id;

INSERT INTO core.employee (name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES
('Camila Juliana'::character varying, 'Ortiz'::character varying, 'Mejia'::character varying, '1997-08-14'::date, 'camila.ortiz@example.com'::character varying, '+573110001122'::character varying, '3', '1033888343', '2', 'T12355')
returning id;


-- SELECT * FROM core.employee;

-----------------------------------------------------------------------------

COMMIT;