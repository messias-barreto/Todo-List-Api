import { AppDataSource } from './../../../../../../database/typeorm/data-source';
import { Repository } from "typeorm";
import { IprojectRepository } from "../../../../interfaces/IProjectRepository";
import { Project } from "../../entities/Project";


class ProjectRepositoryInMemory implements IprojectRepository {
    projects: Project[] = [];

    async create({name, description, user_id, category_id}: IProjectDTO): Promise<Project> {
        const project = new Project();
        Object.assign(project, {
            name,
            description,
            user_id,
            category_id
        });

        this.projects.push(project);
        return project;
    }

    async findAllProjects(user_id: string): Promise<Project[]> {
        return this.projects.filter(project => project.user_id === user_id);
    }

    async findProjectByName(name: string): Promise<Project> {
        return this.projects.find(project => project.name === name);
    }

    async findProjectsById(id: string): Promise<Project> {
        return this.projects.find(project => project.id === id);
    }
}

export { ProjectRepositoryInMemory }