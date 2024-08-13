import {MigrationInterface, QueryRunner} from "typeorm";

export class Multi1722543925228 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "seller" RENAME COLUMN "customFields__fix_relational_custom_fields__" TO "customFieldsConnectedaccountid"`, undefined);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "customFieldsConnectedaccountid"`, undefined);
        await queryRunner.query(`ALTER TABLE "seller" ADD "customFieldsConnectedaccountid" character varying(255)`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "customFieldsConnectedaccountid"`, undefined);
        await queryRunner.query(`ALTER TABLE "seller" ADD "customFieldsConnectedaccountid" boolean`, undefined);
        await queryRunner.query(`ALTER TABLE "seller" RENAME COLUMN "customFieldsConnectedaccountid" TO "customFields__fix_relational_custom_fields__"`, undefined);
   }

}
