import { Profile } from "./Profile";

class ProfileDTO {
  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public secondLastName: string,
    public birth_date: Date,
    public phone: string,
    public countryCode: string,
    public departmentCode: string,
    public cityCode: string,
    public email: string,
    public docNum: number,
    public nitCode: string,
    public employeeCode: string,
    public username: string,
    public password: string,
    public created_at: Date,
    public updated_at: Date,
    public userRole: string,
    public docType: string
  ) {}

  static fromEntity(profile: Profile): ProfileDTO {
    return new ProfileDTO(
      profile.id,
      profile.name,
      profile.lastName,
      profile.secondLastName,
      profile.birthDate,
      profile.phone,
      profile.countryCode,
      profile.departmentCode,
      profile.cityCode,
      profile.email,
      profile.docNum,
      profile.nitCode,
      profile.employeeCode,
      profile.username,
      profile.password,
      profile.created_at,
      profile.updated_at,
      profile.userRole.role,
      profile.docType.docType
    );
  }
};

export default ProfileDTO;