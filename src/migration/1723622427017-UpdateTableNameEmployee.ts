import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableNameEmployee1723622427017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("Employee", "employee");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("employee", "Employee");
    }

}
