CREATE OR REPLACE VIEW core.active_contracts_with_role_2 AS
SELECT 
	con.id, con.start_date AS employee_start_date, con.is_active AS employee_is_active,
	com.name AS company_name, com.nit_code AS company_nit,
	CONCAT(emp.name, ' ', emp."lastName", ' ', emp."secondLastName") as employee_fullName,
	emp.id AS employee_id, emp."docNum" AS employee_doc_num, emp."employeeCode" AS employee_code,
	epr.id AS employee_rol_id, epr."employeeRole" AS employee_rol_name
FROM core.contract as con
INNER JOIN core.company as com ON con.company_id = com.id
INNER JOIN core.employee as emp ON con.employee_id = emp.id
INNER JOIN core.employee_role as epr ON emp."employeeRole_id" = epr.id
WHERE con.is_active = true
	AND epr.id = 2;

-- SELECT * FROM core.active_contracts_with_role_2;