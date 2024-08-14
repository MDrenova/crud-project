import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableEmployee1723470846853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Employee",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: "experience",
                        type: "varchar",
                        length: '255',
                    },
                    {
                        name: "departament",
                        type: "varchar",
                        length: '255',
                    },
                    {
                        name: "dateStartingJob",
                        type: "date",
                    },
                    {
                        name: "civilStatus",
                        type: "varchar",
                        length: '255',
                    },
                    {
                        name: "userId",
                        type: "int",
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Employee");
    }

}
