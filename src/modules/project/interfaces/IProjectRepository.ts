import { Project } from "../infra/typeorm/entities/Project"

interface IprojectRepository {
    create(data: IProjectDTO): Promise<Project>;
    findAllProjects(user_id: string): Promise<Project[]>;
    findProjectsById(id: string): Promise<Project>;
    findProjectByName(name: string): Promise<Project>;
}

export { IprojectRepository }