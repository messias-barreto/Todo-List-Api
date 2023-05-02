import { type } from "os";
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTodo1681264978598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "todos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "status",
                        type: "uuid"
                    },
                    {
                        name: "project_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKStatusTodo",
                        referencedTableName: "status_todo",
                        referencedColumnNames: ["id"],
                        columnNames: ["status"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKProjectTodo",
                        referencedTableName: "projects",
                        referencedColumnNames: ["id"],
                        columnNames: ["project_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("todos");
    }

}
