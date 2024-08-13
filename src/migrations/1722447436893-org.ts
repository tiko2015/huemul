import {MigrationInterface, QueryRunner} from "typeorm";

export class Org1722447436893 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "organization_branch" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL DEFAULT '', "id" SERIAL NOT NULL, "parentId" integer, CONSTRAINT "PK_b237f5080d767ef6c11290dbc48" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "organization_type" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying(255) NOT NULL DEFAULT '', "id" SERIAL NOT NULL, CONSTRAINT "PK_42a3f102470c2b194b9bafc1f07" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "organization" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying(255) NOT NULL DEFAULT '', "enabled" boolean NOT NULL DEFAULT true, "description" text, "email" character varying(150), "linksRRSS" text, "id" SERIAL NOT NULL, "ownerId" integer, "typeId" integer, "logoId" integer, "bannerId" integer, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "organization_address" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying NOT NULL DEFAULT '', "streetLine1" character varying NOT NULL, "streetLine2" character varying NOT NULL DEFAULT '', "city" character varying NOT NULL DEFAULT '', "province" character varying NOT NULL DEFAULT '', "postalCode" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL DEFAULT '', "defaultAddress" boolean NOT NULL DEFAULT false, "location" geography(Point,4326), "id" SERIAL NOT NULL, "organizationId" integer, "countryId" integer, CONSTRAINT "PK_0f31fe3925535afb5462326d7d6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6812cf314c044953f41696556b" ON "organization_address" ("countryId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_af918a8d096c145e8c3166b4cc" ON "organization_address" USING GiST ("location") `, undefined);
        await queryRunner.query(`CREATE TABLE "seller_custom_fields_organization_organization" ("sellerId" integer NOT NULL, "organizationId" integer NOT NULL, CONSTRAINT "PK_5f803941563c879660d45be8000" PRIMARY KEY ("sellerId", "organizationId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_cf860b20c3c9c78a8d802a7229" ON "seller_custom_fields_organization_organization" ("sellerId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1f224a8735ff3f059c9ffd8743" ON "seller_custom_fields_organization_organization" ("organizationId") `, undefined);
        await queryRunner.query(`CREATE TABLE "organization_channels_channel" ("organizationId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "PK_90b729ff0b41df3e4646cf0cbfd" PRIMARY KEY ("organizationId", "channelId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_2605aab535932b944570551062" ON "organization_channels_channel" ("organizationId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3b344dda67df440e24277613d7" ON "organization_channels_channel" ("channelId") `, undefined);
        await queryRunner.query(`CREATE TABLE "organization_affiliated_width_organization" ("organizationId_1" integer NOT NULL, "organizationId_2" integer NOT NULL, CONSTRAINT "PK_97cba5a6b95f3d156fe7f001c64" PRIMARY KEY ("organizationId_1", "organizationId_2"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b72eda07332e17626f7e87da6f" ON "organization_affiliated_width_organization" ("organizationId_1") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f2eee2feeb8f23f7fc1e1099d1" ON "organization_affiliated_width_organization" ("organizationId_2") `, undefined);
        await queryRunner.query(`CREATE TABLE "organization_collaborators_seller" ("organizationId" integer NOT NULL, "sellerId" integer NOT NULL, CONSTRAINT "PK_daca28d9192c359240c00853841" PRIMARY KEY ("organizationId", "sellerId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_4f9645bffdd83e1da86c5356d3" ON "organization_collaborators_seller" ("organizationId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_4650c6b0fa5c731daac25f4b6f" ON "organization_collaborators_seller" ("sellerId") `, undefined);
        await queryRunner.query(`CREATE TABLE "organization_branches_organization_branch" ("organizationId" integer NOT NULL, "organizationBranchId" integer NOT NULL, CONSTRAINT "PK_869cbfadf30ec97168ce6a0457e" PRIMARY KEY ("organizationId", "organizationBranchId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f6b27a542da5f8567830e19c2f" ON "organization_branches_organization_branch" ("organizationId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_be7af68fddb2f7355345e9617f" ON "organization_branches_organization_branch" ("organizationBranchId") `, undefined);
        await queryRunner.query(`ALTER TABLE "product_translation" ADD "customFields__fix_relational_custom_fields__" boolean`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "product_translation"."customFields__fix_relational_custom_fields__" IS 'A work-around needed when only relational custom fields are defined on an entity'`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsOrganizationid" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFields__fix_relational_custom_fields__" boolean`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "product"."customFields__fix_relational_custom_fields__" IS 'A work-around needed when only relational custom fields are defined on an entity'`, undefined);
        await queryRunner.query(`ALTER TABLE "seller" ADD "customFields__fix_relational_custom_fields__" boolean`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "seller"."customFields__fix_relational_custom_fields__" IS 'A work-around needed when only relational custom fields are defined on an entity'`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d08bea381cb747ddf3a4bf30be3" FOREIGN KEY ("customFieldsOrganizationid") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" ADD CONSTRAINT "FK_2baee262742978958b1009f5418" FOREIGN KEY ("parentId") REFERENCES "organization_branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_67c515257c7a4bc221bb1857a39" FOREIGN KEY ("ownerId") REFERENCES "seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_986e1130273d2904f0042047493" FOREIGN KEY ("typeId") REFERENCES "organization_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_8caca2b07d288e145b392aa9a92" FOREIGN KEY ("logoId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_4c44b0e4a6407e91106c15c3d9a" FOREIGN KEY ("bannerId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_address" ADD CONSTRAINT "FK_d774c13d8f67544c223b15df628" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_address" ADD CONSTRAINT "FK_6812cf314c044953f41696556be" FOREIGN KEY ("countryId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "seller_custom_fields_organization_organization" ADD CONSTRAINT "FK_cf860b20c3c9c78a8d802a72297" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "seller_custom_fields_organization_organization" ADD CONSTRAINT "FK_1f224a8735ff3f059c9ffd8743e" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_channels_channel" ADD CONSTRAINT "FK_2605aab535932b944570551062a" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_channels_channel" ADD CONSTRAINT "FK_3b344dda67df440e24277613d71" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_affiliated_width_organization" ADD CONSTRAINT "FK_b72eda07332e17626f7e87da6fb" FOREIGN KEY ("organizationId_1") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_affiliated_width_organization" ADD CONSTRAINT "FK_f2eee2feeb8f23f7fc1e1099d12" FOREIGN KEY ("organizationId_2") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_collaborators_seller" ADD CONSTRAINT "FK_4f9645bffdd83e1da86c5356d39" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_collaborators_seller" ADD CONSTRAINT "FK_4650c6b0fa5c731daac25f4b6fb" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branches_organization_branch" ADD CONSTRAINT "FK_f6b27a542da5f8567830e19c2f2" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branches_organization_branch" ADD CONSTRAINT "FK_be7af68fddb2f7355345e9617f1" FOREIGN KEY ("organizationBranchId") REFERENCES "organization_branch"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_branches_organization_branch" DROP CONSTRAINT "FK_be7af68fddb2f7355345e9617f1"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branches_organization_branch" DROP CONSTRAINT "FK_f6b27a542da5f8567830e19c2f2"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_collaborators_seller" DROP CONSTRAINT "FK_4650c6b0fa5c731daac25f4b6fb"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_collaborators_seller" DROP CONSTRAINT "FK_4f9645bffdd83e1da86c5356d39"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_affiliated_width_organization" DROP CONSTRAINT "FK_f2eee2feeb8f23f7fc1e1099d12"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_affiliated_width_organization" DROP CONSTRAINT "FK_b72eda07332e17626f7e87da6fb"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_channels_channel" DROP CONSTRAINT "FK_3b344dda67df440e24277613d71"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_channels_channel" DROP CONSTRAINT "FK_2605aab535932b944570551062a"`, undefined);
        await queryRunner.query(`ALTER TABLE "seller_custom_fields_organization_organization" DROP CONSTRAINT "FK_1f224a8735ff3f059c9ffd8743e"`, undefined);
        await queryRunner.query(`ALTER TABLE "seller_custom_fields_organization_organization" DROP CONSTRAINT "FK_cf860b20c3c9c78a8d802a72297"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_address" DROP CONSTRAINT "FK_6812cf314c044953f41696556be"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_address" DROP CONSTRAINT "FK_d774c13d8f67544c223b15df628"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_4c44b0e4a6407e91106c15c3d9a"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_8caca2b07d288e145b392aa9a92"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_986e1130273d2904f0042047493"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_67c515257c7a4bc221bb1857a39"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_branch" DROP CONSTRAINT "FK_2baee262742978958b1009f5418"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d08bea381cb747ddf3a4bf30be3"`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "seller"."customFields__fix_relational_custom_fields__" IS 'A work-around needed when only relational custom fields are defined on an entity'`, undefined);
        await queryRunner.query(`ALTER TABLE "seller" DROP COLUMN "customFields__fix_relational_custom_fields__"`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "product"."customFields__fix_relational_custom_fields__" IS 'A work-around needed when only relational custom fields are defined on an entity'`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFields__fix_relational_custom_fields__"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsOrganizationid"`, undefined);
        await queryRunner.query(`COMMENT ON COLUMN "product_translation"."customFields__fix_relational_custom_fields__" IS 'A work-around needed when only relational custom fields are defined on an entity'`, undefined);
        await queryRunner.query(`ALTER TABLE "product_translation" DROP COLUMN "customFields__fix_relational_custom_fields__"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_be7af68fddb2f7355345e9617f"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6b27a542da5f8567830e19c2f"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_branches_organization_branch"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_4650c6b0fa5c731daac25f4b6f"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f9645bffdd83e1da86c5356d3"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_collaborators_seller"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2eee2feeb8f23f7fc1e1099d1"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_b72eda07332e17626f7e87da6f"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_affiliated_width_organization"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b344dda67df440e24277613d7"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_2605aab535932b944570551062"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_channels_channel"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f224a8735ff3f059c9ffd8743"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf860b20c3c9c78a8d802a7229"`, undefined);
        await queryRunner.query(`DROP TABLE "seller_custom_fields_organization_organization"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_af918a8d096c145e8c3166b4cc"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_6812cf314c044953f41696556b"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_address"`, undefined);
        await queryRunner.query(`DROP TABLE "organization"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_type"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_branch"`, undefined);
   }

}
