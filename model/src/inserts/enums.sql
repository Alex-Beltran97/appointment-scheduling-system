BEGIN;

-- ******************Enumerable data / Initial Data:**************************

-- Insert data for user_role table

INSERT INTO core.user_role (role) VALUES ('Administrador'::character varying)
  returning id;

INSERT INTO core.user_role (role) VALUES ('Usuario'::character varying)
  returning id;

-- SELECT * FROM core.user_role;

-----------------------------------------------------------------------------

-- Insert data for docType table

INSERT INTO core."docType" (
"docType") VALUES (
'Pasaporte'::character varying)
  returning id;

INSERT INTO core."docType" (
"docType") VALUES (
'Permiso especial de permanencia'::character varying)
  returning id;

INSERT INTO core."docType" (
"docType") VALUES (
'Cedula de ciudadania'::character varying)
  returning id;
  
INSERT INTO core."docType" (
"docType") VALUES (
'Cedula de extranjeria'::character varying)
  returning id;

-- SELECT * FROM core."docType";

-----------------------------------------------------------------------------

-- Insert data for employee_role table

INSERT INTO core.employee_role (
"employeeRole") VALUES (
'Coordinador'::character varying)
  returning id;

INSERT INTO core.employee_role (
"employeeRole") VALUES (
'Empleado'::character varying)
  returning id;

-- SELECT * FROM core.employee_role;

-----------------------------------------------------------------------------

-- Insert data for Plan table

INSERT INTO core.plan (name, price, description) VALUES (
'Mensual'::character varying, 100000::numeric, 'Plan mensual con funcionalidades limitadas.'::text) 
  returning id;

INSERT INTO core.plan (name, price, description) VALUES (
'Anual'::character varying, 1000000::numeric, 'Plan anual con todas las funcionalidades.'::text) 
  returning id;

-- SELECT * FROM core.plan;

-----------------------------------------------------------------------------

-- Insert data for Payment Status table

INSERT INTO core.payment_status (status) VALUES ('Exitoso'::character varying)
  returning id;

INSERT INTO core.payment_status (status) VALUES ('Fallido'::character varying)
  returning id;

-- SELECT * FROM core.payment_status;

-----------------------------------------------------------------------------

COMMIT;