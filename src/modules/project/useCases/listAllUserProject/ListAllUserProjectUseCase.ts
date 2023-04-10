import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../../user/interfaces/IUserRepository";
import { Project } from "../../infra/typeorm/entities/Project";
import { IprojectRepository } from "../../interfaces/IProjectRepository";

@injectable()
class ListAllUserProjectUseCase {
    constructor(
        @inject("ProjectRepository")
        private projectRepository: IprojectRepository,
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}
    
    async execute(user_id: string): Promise<Project[]>{
        const userAlreadyExists = await this.userRepository.findUserById(user_id);
        if(!userAlreadyExists){
            throw new AppErrors("User does not Exists!");
        }
        
        const project = await this.projectRepository.findAllProjects(user_id);
        return project;
    }
}

export { ListAllUserProjectUseCase }