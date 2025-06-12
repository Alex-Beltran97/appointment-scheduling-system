BEGIN;

-- ******************Existents Actors:**************************

-- Insert data for company table

INSERT INTO core.company (
name, nit_code) VALUES (
'Consultores S.A.S.'::character varying, '900428042-2'::character varying)
  returning id;

-- SELECT * FROM core.company;

-----------------------------------------------------------------------------

-- Insert data for employee table

INSERT INTO core.employee (
name, "lastName", "secondLastName", birth_date, email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES (
'Pepito Jaimito'::character varying, 'Perez'::character varying, 'Prieto'::character varying, '1990-01-01'::date, 'pepito.perez@example.com'::character varying, '+573135553333'::character varying, '3'::bigint, '1033888333'::numeric, '2'::bigint, 'T12345'::character varying)
  returning id;

-- SELECT * FROM core.employee;

-----------------------------------------------------------------------------

COMMIT;