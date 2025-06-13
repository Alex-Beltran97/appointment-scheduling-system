import { Company } from "../Company/Company";
import { Employee } from "../Employee/Employee";
import { Contract } from "./Contract";

class ContractDTO {
  constructor(
    public id: number,
    public company: Company,
    public employee: Employee,
    public is_active: boolean,
    public start_date: Date,
    public end_date: Date,
    public created_at: Date,
    public updated_at: Date,
  ) {}

  static fromEntity(contract: Contract): ContractDTO {
    return new ContractDTO(
      contract.id,
      contract.company,
      contract.employee,
      contract.is_active,
      contract.start_date,
      contract.end_date,
      contract.created_at,
      contract.updated_at
    );
  }
}

export default ContractDTO;