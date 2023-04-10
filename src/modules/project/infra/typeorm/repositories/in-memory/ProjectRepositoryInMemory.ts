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

    async updateProject({ name, description, category_id, id }: IProjectDTO): Promise<void> {
        const index = this.projects.findIndex(project => project.id === id);
        this.projects[index].name = name;
        this.projects[index].description = description;
        this.projects[index].category_id = category_id;
    }
}

export { ProjectRepositoryInMemory }