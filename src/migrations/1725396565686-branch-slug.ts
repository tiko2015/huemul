import {MigrationInterface, QueryRunner} from "typeorm";

export class BranchSlug1725396565686 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_branch" ADD "slug" character varying(255) NOT NULL DEFAULT ''`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_branch" DROP COLUMN "slug"`, undefined);
   }

}
