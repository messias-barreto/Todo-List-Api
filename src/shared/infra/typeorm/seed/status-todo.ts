import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/typeorm/data-source";
import { StatusTodo } from "../../../../modules/todo/infra/typeorm/entities/StatusTodo";

async function statusTodoSeed() {
     AppDataSource.initialize().then(() => {
        let repository: Repository<StatusTodo>;
        repository = AppDataSource.getRepository(StatusTodo);
    
        repository.query(`
            INSERT into status_todo (id, name, ordem) values 
                                    ('3e10160b-2048-49c7-ad54-2441f3ec842c', 'Em Andamento', 1),
                                    ('7f0057fa-52ea-41cc-8e87-c694f578972d', 'Em Aguardo', 2),
                                    ('7a1b1ef8-74c8-4f50-90e5-a6354bd13112', 'Finalizado', 3);
       `);
    })
    .catch(() => {
        console.error("Does not possible initialization Data Source");
    })
}


export { statusTodoSeed }