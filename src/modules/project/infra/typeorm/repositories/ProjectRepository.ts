import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../database/typeorm/data-source";
import { ICategoriesProjectRepository } from "../../../interfaces/ICategoryProjectRepository";
import { IprojectRepository } from "../../../interfaces/IProjectRepository";
import { Project } from "../entities/Project";


class ProjectRepository implements IprojectRepository {
    private repository: Repository<Project>;

    constructor(){
        this.repository = AppDataSource.getRepository(Project);
    }

    async create({name, description}: IProjectDTO): Promise<Project> {
        const category = this.repository.create({name, description});
        await this.repository.save(category);

        return category;
    }

    async findAllProjects(user_id: string): Promise<Project[]> {
        return await this.repository.findBy({ user_id });
    }

    async findProjectByName(name: string): Promise<Project> {
        return await this.repository.findOneBy({ name });
    }

    async findProjectsById(id: string): Promise<Project> {
        return await this.repository.findOneBy({ id });
    }

}

export { ProjectRepository };