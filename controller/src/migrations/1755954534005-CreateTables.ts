import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1755954534005 implements MigrationInterface {
    name = 'CreateTables1755954534005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth"."user_role" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant"."available_slots" ("id" SERIAL NOT NULL, "date" date NOT NULL, "start_time" TIME WITH TIME ZONE NOT NULL, "end_time" TIME WITH TIME ZONE NOT NULL, "is_booked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "service_id" integer, CONSTRAINT "PK_65fb5e1795daed6904a9be42c52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant"."appointment_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_8f42047c7975a9606576ca274e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant"."appointments" ("id" SERIAL NOT NULL, "client_full_name" character varying(225) NOT NULL, "client_email" character varying array NOT NULL, "client_phone" character varying array NOT NULL, "date" TIMESTAMP NOT NULL, "start_time" TIME WITH TIME ZONE NOT NULL, "end_time" TIME WITH TIME ZONE NOT NULL, "notes" text, "is_active" boolean NOT NULL DEFAULT true, "appoinment_id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "consultant_id" integer, "service_id" integer, "status_id" integer, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant"."consultant_availability" ("id" SERIAL NOT NULL, "weekday" integer NOT NULL, "start_time" TIME WITH TIME ZONE NOT NULL, "end_time" TIME WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "service_id" integer, CONSTRAINT "PK_723fc91c26207da3069526ad72c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant"."consultant_exceptions" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "start_time" TIME WITH TIME ZONE, "end_time" TIME WITH TIME ZONE, "reason" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "service_id" integer, CONSTRAINT "PK_40e893823abe043f6d593253401" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant"."service" ("id" SERIAL NOT NULL, "name" character varying(225) NOT NULL, "description" text NOT NULL, "duration_minutes" integer NOT NULL, "price" numeric(10,2) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "consultant_id" integer, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant"."notification_type" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_3e0e1fa68c25d84f808ca11dbaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant"."notification" ("id" SERIAL NOT NULL, "message" text NOT NULL, "is_readed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "consultant_id" integer, "notification_type_id" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."profile_img" ("id" SERIAL NOT NULL, "mime" character varying NOT NULL, "data" bytea NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_3264b2bca5683762291757e0d2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "birth_date" TIMESTAMP WITH TIME ZONE NOT NULL, "phone" character varying NOT NULL, "countryCode" character varying NOT NULL, "departmentCode" character varying, "cityCode" character varying, "email" character varying NOT NULL, "docNum" integer NOT NULL, "nitCode" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "userRole_id" integer, "profile_img_id" integer, "docType_id" integer, CONSTRAINT "UQ_3825121222d5c17741373d8ad13" UNIQUE ("email"), CONSTRAINT "UQ_121720b6255b5b4fb31eff2c7a5" UNIQUE ("docNum"), CONSTRAINT "UQ_d80b94dc62f7467403009d88062" UNIQUE ("username"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."docType" ("id" SERIAL NOT NULL, "docType" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_1b44f3824362ef93f9df4cee7bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."employee_role" ("id" SERIAL NOT NULL, "employeeRole" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_1c105b756816efbdeae09a9ab65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."employee" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "birth_date" TIMESTAMP WITH TIME ZONE NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "docNum" integer NOT NULL, "employeeCode" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "docType_id" integer, "employeeRole_id" integer, CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."contract" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "company_id" integer, "employee_id" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."suscription" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "payment_id" integer, CONSTRAINT "PK_eced4cd6c780c3752ce6e3e2214" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."payment_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_b59e2e874b077ea7acf724e4711" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."plan" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."payments" ("id" SERIAL NOT NULL, "payment_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "amount" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "paymentStatus_id" integer, "company_id" integer, "plan_id" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nit_code" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "consultant"."available_slots" ADD CONSTRAINT "FK_0be27ed5233f284b8d65b8efc2a" FOREIGN KEY ("service_id") REFERENCES "consultant"."service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant"."appointments" ADD CONSTRAINT "FK_e423b517ea5503a0da8015c3e28" FOREIGN KEY ("consultant_id") REFERENCES "auth"."profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant"."appointments" ADD CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857" FOREIGN KEY ("service_id") REFERENCES "consultant"."service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant"."appointments" ADD CONSTRAINT "FK_2b35dd864ffc9740d944427f790" FOREIGN KEY ("status_id") REFERENCES "consultant"."appointment_status"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant"."consultant_availability" ADD CONSTRAINT "FK_1eff23a3815d9e0b89a1b2b0383" FOREIGN KEY ("service_id") REFERENCES "consultant"."service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant"."consultant_exceptions" ADD CONSTRAINT "FK_a7d4cb44e08a7ad9e124d34221a" FOREIGN KEY ("service_id") REFERENCES "consultant"."service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant"."service" ADD CONSTRAINT "FK_c6b2f3d089d67fdeb40d435d4e5" FOREIGN KEY ("consultant_id") REFERENCES "auth"."profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant"."notification" ADD CONSTRAINT "FK_09b2d509b01a2144122d51728b9" FOREIGN KEY ("consultant_id") REFERENCES "auth"."profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant"."notification" ADD CONSTRAINT "FK_4c87b82a5cef04202495f67663c" FOREIGN KEY ("notification_type_id") REFERENCES "consultant"."notification_type"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."profile" ADD CONSTRAINT "FK_522e0554d4633909962c220e968" FOREIGN KEY ("userRole_id") REFERENCES "auth"."user_role"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."profile" ADD CONSTRAINT "FK_cfaaf8f562ea28019c8de487c01" FOREIGN KEY ("profile_img_id") REFERENCES "auth"."profile_img"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."profile" ADD CONSTRAINT "FK_ffdae762f604317dca306710abe" FOREIGN KEY ("docType_id") REFERENCES "core"."docType"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."employee" ADD CONSTRAINT "FK_862f75abc3bfd9fd1cdb67506f6" FOREIGN KEY ("docType_id") REFERENCES "core"."docType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."employee" ADD CONSTRAINT "FK_5e8182dd71a452da3e81ea85237" FOREIGN KEY ("employeeRole_id") REFERENCES "core"."employee_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."contract" ADD CONSTRAINT "FK_1dbf9a5c77120410dfac83b817c" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."contract" ADD CONSTRAINT "FK_e629d91803764629bdd2fc7ce9d" FOREIGN KEY ("employee_id") REFERENCES "core"."employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."suscription" ADD CONSTRAINT "FK_c04281f4caad6d23cc716c38b85" FOREIGN KEY ("payment_id") REFERENCES "core"."payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."payments" ADD CONSTRAINT "FK_500d5dc384fecbc927697ab94bf" FOREIGN KEY ("paymentStatus_id") REFERENCES "core"."payment_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."payments" ADD CONSTRAINT "FK_4781cf05f36ba314cdd314c0c66" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."payments" ADD CONSTRAINT "FK_f9b6a4c3196864cdd91b1a440ee" FOREIGN KEY ("plan_id") REFERENCES "core"."plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "core"."active_contracts_with_role_2" AS 
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
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["core","VIEW","active_contracts_with_role_2","SELECT \n      con.id,\n      con.start_date AS employee_start_date,\n      con.is_active AS employee_is_active,\n      com.name AS company_name,\n      com.nit_code AS company_nit,\n      CONCAT(emp.name, ' ', emp.\"lastName\", ' ', emp.\"secondLastName\") as employee_fullName,\n      emp.id AS employee_id,\n      emp.\"docNum\" AS employee_doc_num,\n      emp.\"employeeCode\" AS employee_code,\n      epr.id AS employee_rol_id,\n      epr.\"employeeRole\" AS employee_rol_name\n    FROM core.contract as con\n    INNER JOIN core.company as com ON con.company_id = com.id\n    INNER JOIN core.employee as emp ON con.employee_id = emp.id\n    INNER JOIN core.employee_role as epr ON emp.\"employeeRole_id\" = epr.id\n    WHERE con.is_active = true\n      AND epr.id = 2"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","active_contracts_with_role_2","core"]);
        await queryRunner.query(`DROP VIEW "core"."active_contracts_with_role_2"`);
        await queryRunner.query(`ALTER TABLE "core"."payments" DROP CONSTRAINT "FK_f9b6a4c3196864cdd91b1a440ee"`);
        await queryRunner.query(`ALTER TABLE "core"."payments" DROP CONSTRAINT "FK_4781cf05f36ba314cdd314c0c66"`);
        await queryRunner.query(`ALTER TABLE "core"."payments" DROP CONSTRAINT "FK_500d5dc384fecbc927697ab94bf"`);
        await queryRunner.query(`ALTER TABLE "core"."suscription" DROP CONSTRAINT "FK_c04281f4caad6d23cc716c38b85"`);
        await queryRunner.query(`ALTER TABLE "core"."contract" DROP CONSTRAINT "FK_e629d91803764629bdd2fc7ce9d"`);
        await queryRunner.query(`ALTER TABLE "core"."contract" DROP CONSTRAINT "FK_1dbf9a5c77120410dfac83b817c"`);
        await queryRunner.query(`ALTER TABLE "core"."employee" DROP CONSTRAINT "FK_5e8182dd71a452da3e81ea85237"`);
        await queryRunner.query(`ALTER TABLE "core"."employee" DROP CONSTRAINT "FK_862f75abc3bfd9fd1cdb67506f6"`);
        await queryRunner.query(`ALTER TABLE "auth"."profile" DROP CONSTRAINT "FK_ffdae762f604317dca306710abe"`);
        await queryRunner.query(`ALTER TABLE "auth"."profile" DROP CONSTRAINT "FK_cfaaf8f562ea28019c8de487c01"`);
        await queryRunner.query(`ALTER TABLE "auth"."profile" DROP CONSTRAINT "FK_522e0554d4633909962c220e968"`);
        await queryRunner.query(`ALTER TABLE "consultant"."notification" DROP CONSTRAINT "FK_4c87b82a5cef04202495f67663c"`);
        await queryRunner.query(`ALTER TABLE "consultant"."notification" DROP CONSTRAINT "FK_09b2d509b01a2144122d51728b9"`);
        await queryRunner.query(`ALTER TABLE "consultant"."service" DROP CONSTRAINT "FK_c6b2f3d089d67fdeb40d435d4e5"`);
        await queryRunner.query(`ALTER TABLE "consultant"."consultant_exceptions" DROP CONSTRAINT "FK_a7d4cb44e08a7ad9e124d34221a"`);
        await queryRunner.query(`ALTER TABLE "consultant"."consultant_availability" DROP CONSTRAINT "FK_1eff23a3815d9e0b89a1b2b0383"`);
        await queryRunner.query(`ALTER TABLE "consultant"."appointments" DROP CONSTRAINT "FK_2b35dd864ffc9740d944427f790"`);
        await queryRunner.query(`ALTER TABLE "consultant"."appointments" DROP CONSTRAINT "FK_2a2088e8eaa8f28d8de2bdbb857"`);
        await queryRunner.query(`ALTER TABLE "consultant"."appointments" DROP CONSTRAINT "FK_e423b517ea5503a0da8015c3e28"`);
        await queryRunner.query(`ALTER TABLE "consultant"."available_slots" DROP CONSTRAINT "FK_0be27ed5233f284b8d65b8efc2a"`);
        await queryRunner.query(`DROP TABLE "core"."company"`);
        await queryRunner.query(`DROP TABLE "core"."payments"`);
        await queryRunner.query(`DROP TABLE "core"."plan"`);
        await queryRunner.query(`DROP TABLE "core"."payment_status"`);
        await queryRunner.query(`DROP TABLE "core"."suscription"`);
        await queryRunner.query(`DROP TABLE "core"."contract"`);
        await queryRunner.query(`DROP TABLE "core"."employee"`);
        await queryRunner.query(`DROP TABLE "core"."employee_role"`);
        await queryRunner.query(`DROP TABLE "core"."docType"`);
        await queryRunner.query(`DROP TABLE "auth"."profile"`);
        await queryRunner.query(`DROP TABLE "auth"."profile_img"`);
        await queryRunner.query(`DROP TABLE "consultant"."notification"`);
        await queryRunner.query(`DROP TABLE "consultant"."notification_type"`);
        await queryRunner.query(`DROP TABLE "consultant"."service"`);
        await queryRunner.query(`DROP TABLE "consultant"."consultant_exceptions"`);
        await queryRunner.query(`DROP TABLE "consultant"."consultant_availability"`);
        await queryRunner.query(`DROP TABLE "consultant"."appointments"`);
        await queryRunner.query(`DROP TABLE "consultant"."appointment_status"`);
        await queryRunner.query(`DROP TABLE "consultant"."available_slots"`);
        await queryRunner.query(`DROP TABLE "auth"."user_role"`);
    }

}
