import { Contract } from '../Contract/Contract';
import { Employee } from './Employee';

class EmployeeDTO {
  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public secondLastName: string,
    public birthDate: Date,
    public email: string,
    public phone: string,
    public docType: string,
    public docNum: number,
    public employeeRole: string,
    public employeeCode: string,
    public contract: Contract,
    public created_at: Date,
    public updated_at: Date
  ) {}

  static fromEntity(employee: Employee): EmployeeDTO {
    return new EmployeeDTO(
      employee.id,
      employee.name,
      employee.lastName,
      employee.secondLastName,
      employee.birthDate,
      employee.email,
      employee.phone,
      employee.docType?.docType || '',
      employee.docNum,
      employee.employeeRole.employeeRole || '',
      employee.employeeCode,
      employee.constract || null,
      employee.created_at,
      employee.updated_at
    );
  }
}

export default EmployeeDTO;
