import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableExample1723559158722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "example",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: "firstname",
                        type: "varchar",
                        length: '255',
                    }
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("example");
    }

}
