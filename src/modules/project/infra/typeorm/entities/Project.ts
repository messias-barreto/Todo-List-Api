import { CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { CategoryProject } from './CategoryProject';
import { v4 as uuidV4 } from 'uuid';

@Entity("projects")
class Project {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    user_id: string;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => CategoryProject)
    @JoinColumn({ name: "category_id" })
    category: CategoryProject;

    constructor(){
        if(!this.id){
            this.id = uuidV4() 
        }
    }
}

export { Project }