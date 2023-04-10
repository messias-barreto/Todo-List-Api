import { Project } from "../infra/typeorm/entities/Project"

interface IprojectRepository {
    create({name, description, category_id, user_id}: IProjectDTO): Promise<Project>;
    findAllProjects(user_id: string): Promise<Project[]>;
    findProjectsById(id: string): Promise<Project>;
    findProjectByName(name: string): Promise<Project>;
    updateProject({ name, description, category_id, id }: IProjectDTO): Promise<void>
}

export { IprojectRepository }