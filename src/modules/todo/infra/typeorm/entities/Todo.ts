import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { StatusTodo } from "./StatusTodo";

@Entity('todos')
class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    project_id: string;

    @Column()
    status: string;

    @ManyToOne(() => StatusTodo)
    @JoinColumn({ name: "status" })
    status_todo: StatusTodo;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export  { Todo }