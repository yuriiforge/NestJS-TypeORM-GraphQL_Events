import { MigrationInterface, QueryRunner } from "typeorm";

export class Redesign1768560273231 implements MigrationInterface {
    name = 'Redesign1768560273231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" ADD "phoneNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "placeOfBirth" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "placeOfBirth"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "phoneNumber"`);
    }

}
