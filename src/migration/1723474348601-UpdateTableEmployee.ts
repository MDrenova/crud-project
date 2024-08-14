import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class UpdateTableEmployee1723474348601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "Employee",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            }),
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Find the foreign key
        const table = await queryRunner.getTable("Employee");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        // Drop the foreign key
        await queryRunner.dropForeignKey("Employee", foreignKey);
    }

}
