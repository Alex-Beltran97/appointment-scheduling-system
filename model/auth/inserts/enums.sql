BEGIN;

-- ******************Enumerable data / Initial Data:**************************

-- Insert data for user_role table

INSERT INTO auth.user_role (role) VALUES ('Administrador'::character varying)
  returning id;

INSERT INTO auth.user_role (role) VALUES ('Usuario'::character varying)
  returning id;

-- SELECT * FROM auth.user_role;

-----------------------------------------------------------------------------

-- Insert data for docType table

INSERT INTO auth."docType" (
"docType") VALUES (
'Pasaporte'::character varying)
  returning id;

INSERT INTO auth."docType" (
"docType") VALUES (
'Permiso especial de permanencia'::character varying)
  returning id;

INSERT INTO auth."docType" (
"docType") VALUES (
'Cedula de ciudadania'::character varying)
  returning id;
  
INSERT INTO auth."docType" (
"docType") VALUES (
'Cedula de extranjeria'::character varying)
  returning id;

-- SELECT * FROM auth."docType";

-----------------------------------------------------------------------------

-- Insert data for employee_role table

INSERT INTO auth.employee_role (
"employeeRole") VALUES (
'Coordinador'::character varying)
  returning id;

INSERT INTO auth.employee_role (
"employeeRole") VALUES (
'Empleado'::character varying)
  returning id;

-- SELECT * FROM auth.employee_role;

-----------------------------------------------------------------------------

-- Insert data for Plan table

INSERT INTO auth.plan (name, price, description) VALUES (
'Mensual'::character varying, 100000::numeric, 'Plan mensual con funcionalidades limitadas.'::text) 
  returning id;

INSERT INTO auth.plan (name, price, description) VALUES (
'Anual'::character varying, 1000000::numeric, 'Plan anual con todas las funcionalidades.'::text) 
  returning id;

-- SELECT * FROM auth.plan;

-----------------------------------------------------------------------------

-- Insert data for Payment Status table

INSERT INTO auth.payment_status (status) VALUES ('Exitoso'::character varying)
  returning id;

INSERT INTO auth.payment_status (status) VALUES ('Fallido'::character varying)
  returning id;

-- SELECT * FROM auth.payment_status;

-----------------------------------------------------------------------------

COMMIT;