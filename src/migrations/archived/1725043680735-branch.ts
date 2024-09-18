import {MigrationInterface, QueryRunner} from "typeorm";

export class Branch1725043680735 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_address" DROP COLUMN "defaultAddress"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" ADD "isPrivate" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" ADD "logoId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_type" ADD "logoId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" ADD "defaultAddressId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" ADD CONSTRAINT "FK_1aec5f637115b86877cee7a2612" FOREIGN KEY ("logoId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_type" ADD CONSTRAINT "FK_6d2070610b0e25544c175a24bff" FOREIGN KEY ("logoId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_type" DROP CONSTRAINT "FK_6d2070610b0e25544c175a24bff"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" DROP CONSTRAINT "FK_1aec5f637115b86877cee7a2612"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "defaultAddressId"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_type" DROP COLUMN "logoId"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" DROP COLUMN "logoId"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" DROP COLUMN "isPrivate"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_address" ADD "defaultAddress" boolean NOT NULL DEFAULT false`, undefined);
   }

}
