import {MigrationInterface, QueryRunner} from "typeorm";

export class Branch1725044645999 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "organization_branch" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL DEFAULT '', "isPrivate" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "parentId" integer, "logoId" integer, CONSTRAINT "PK_b237f5080d767ef6c11290dbc48" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "organization_branches_organization_branch" ("organizationId" integer NOT NULL, "organizationBranchId" integer NOT NULL, CONSTRAINT "PK_869cbfadf30ec97168ce6a0457e" PRIMARY KEY ("organizationId", "organizationBranchId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f6b27a542da5f8567830e19c2f" ON "organization_branches_organization_branch" ("organizationId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_be7af68fddb2f7355345e9617f" ON "organization_branches_organization_branch" ("organizationBranchId") `, undefined);
        await queryRunner.query(`ALTER TABLE "organization_address" DROP COLUMN "defaultAddress"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_type" ADD "logoId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" ADD "defaultAddressId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" ADD CONSTRAINT "FK_2baee262742978958b1009f5418" FOREIGN KEY ("parentId") REFERENCES "organization_branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" ADD CONSTRAINT "FK_1aec5f637115b86877cee7a2612" FOREIGN KEY ("logoId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_type" ADD CONSTRAINT "FK_6d2070610b0e25544c175a24bff" FOREIGN KEY ("logoId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branches_organization_branch" ADD CONSTRAINT "FK_f6b27a542da5f8567830e19c2f2" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branches_organization_branch" ADD CONSTRAINT "FK_be7af68fddb2f7355345e9617f1" FOREIGN KEY ("organizationBranchId") REFERENCES "organization_branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_branches_organization_branch" DROP CONSTRAINT "FK_be7af68fddb2f7355345e9617f1"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branches_organization_branch" DROP CONSTRAINT "FK_f6b27a542da5f8567830e19c2f2"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_type" DROP CONSTRAINT "FK_6d2070610b0e25544c175a24bff"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" DROP CONSTRAINT "FK_1aec5f637115b86877cee7a2612"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" DROP CONSTRAINT "FK_2baee262742978958b1009f5418"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "defaultAddressId"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_type" DROP COLUMN "logoId"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_address" ADD "defaultAddress" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_be7af68fddb2f7355345e9617f"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6b27a542da5f8567830e19c2f"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_branches_organization_branch"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_branch"`, undefined);
   }

}
