import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  schema: 'core',
  name: 'active_contracts_with_role_2',
  expression: `
    SELECT 
      con.id,
      con.start_date AS employee_start_date,
      con.is_active AS employee_is_active,
      com.name AS company_name,
      com.nit_code AS company_nit,
      CONCAT(emp.name, ' ', emp."lastName", ' ', emp."secondLastName") as employee_fullName,
      emp.id AS employee_id,
      emp."docNum" AS employee_doc_num,
      emp."employeeCode" AS employee_code,
      epr.id AS employee_rol_id,
      epr."employeeRole" AS employee_rol_name
    FROM core.contract as con
    INNER JOIN core.company as com ON con.company_id = com.id
    INNER JOIN core.employee as emp ON con.employee_id = emp.id
    INNER JOIN core.employee_role as epr ON emp."employeeRole_id" = epr.id
    WHERE con.is_active = true
      AND epr.id = 2
  `,
})
export class ActiveContractView{
  @ViewColumn()
  id!: number;

  @ViewColumn()
  employee_start_date!: Date;

  @ViewColumn()
  employee_is_active!: boolean;

  @ViewColumn()
  company_name!: string;

  @ViewColumn()
  company_nit!: string;

  @ViewColumn()
  employee_fullname!: string;

  @ViewColumn()
  employee_id!: number;

  @ViewColumn()
  employee_doc_num!: number;

  @ViewColumn()
  employee_code!: string;

  @ViewColumn()
  employee_rol_id!: number;

  @ViewColumn()
  employee_rol_name!: string;
};