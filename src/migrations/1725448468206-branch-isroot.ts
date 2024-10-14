import {MigrationInterface, QueryRunner} from "typeorm";

export class BranchIsroot1725448468206 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_branch" ADD "isRoot" boolean NOT NULL DEFAULT false`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_branch" DROP COLUMN "isRoot"`, undefined);
   }

}
