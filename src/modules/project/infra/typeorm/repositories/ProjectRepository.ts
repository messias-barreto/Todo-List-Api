import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../database/typeorm/data-source";
import { IprojectRepository } from "../../../interfaces/IProjectRepository";
import { Project } from "../entities/Project";


class ProjectRepository implements IprojectRepository {
    private repository: Repository<Project>;
    constructor(){
        this.repository = AppDataSource.getRepository(Project);
    }

    async create({ name, description, category_id, user_id }: IProjectDTO): Promise<Project> {
        const category = this.repository.create({
            name, 
            description, 
            category_id, 
            user_id
        });
        
        await this.repository.save(category);

        return category;
    }

    async findAllProjects(user_id: string): Promise<Project[]> {
        return await this.repository.query(`
                SELECT  p.id,
                        p."name", 
                        p.description, 
                        p.category_id,
                        count(t.id) AS qtd_todo, 
                        (
                            SELECT count(*) 
                                FROM 	todos,
                                        status_todo st 
                                WHERE todos.status = st.id 
                                AND todos.project_id = p.id
                                AND st."name" = 'Finalizado'
                        ) AS qtd_todo_finish
                    FROM projects p
                    LEFT JOIN todos t on t.project_id = p.id
                    WHERE p.user_id  = '${user_id}'
                    GROUP BY(p.id, P."name");
        `)
    }

    async findProjectByName(name: string, user_id: string): Promise<Project> {
        return await this.repository.findOneBy({ name, user_id });
    }

    async findProjectsById(id: string): Promise<Project> {
        return await this.repository.findOneBy({ id });
    }

    async updateProject({ name, description, category_id, id }: IProjectDTO): Promise<void> {
        await this.repository.createQueryBuilder()
        .update()
        .set({ name, description, category_id })
        .where("id = :id")
        .setParameters({ id })
        .execute();
    }

    async deleteProject(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { ProjectRepository };