-- Insert data for company table

INSERT INTO auth.company (
name, nit_code) VALUES (
'Consultores S.A.S.'::character varying, '900428042-2'::character varying)
  returning id;

-- SELECT * FROM auth.company;


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

-- Insert data for employee table

INSERT INTO auth.employee (
name, "lastName", "secondLastName", email, phone, "docType_id", "docNum", "employeeRole_id", "employeeCode") VALUES (
'Pepito Jaimito'::character varying, 'Perez'::character varying, 'Prieto'::character varying, 'pepito.perez@example.com'::character varying, '+573135553333'::character varying, '1'::bigint, '1033888333'::numeric, '1'::bigint, 'T12345'::character varying)
  returning id;

-- SELECT * FROM auth.employee;

-- Insert data for user_role table

INSERT INTO auth.user_role (role) VALUES ('Administrador'::character varying)
  returning id;

INSERT INTO auth.user_role (role) VALUES ('Usuario'::character varying)
  returning id;

-- SELECT * FROM auth.user_role;