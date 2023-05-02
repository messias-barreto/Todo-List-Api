import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateStatusTodo1680908462547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "status_todo",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "ordem",
                        type: "integer"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("status_todo");
    }

}
