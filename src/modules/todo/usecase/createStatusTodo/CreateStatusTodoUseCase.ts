import { inject, injectable } from "tsyringe";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IStatusTodoRepository } from "../../interfaces/IStatusTodoRepository";

interface IRequest {
    name: string;
    description?: string;
}

@injectable()
class CreateStatusTodoUseCase { 
    constructor(
        @inject("StatusTodoRepository")
        private statusTodoRepository: IStatusTodoRepository
    ){}
    async execute({name, description}: IRequest) {
        const statusAlreadyExists = await this.statusTodoRepository.findCategoryByName(name);
        if(statusAlreadyExists) {
            throw new AppErrors("Status Already Exists!");
        }

        const status = await this.statusTodoRepository.create({
            name,
            description
        });

        return status;
    }
}

export { CreateStatusTodoUseCase }