import { MigrationInterface, QueryRunner } from "typeorm";

export class Redesign1768554298448 implements MigrationInterface {
    name = 'Redesign1768554298448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" ADD "phoneNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "phoneNumber"`);
    }

}
