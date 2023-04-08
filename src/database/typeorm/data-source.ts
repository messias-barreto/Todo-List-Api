import 'dotenv/config';
import { DataSource } from 'typeorm'
import { CategoryProject } from '../../modules/project/infra/typeorm/entities/CategoryProject';
import { StatusTodo } from '../../modules/todo/infra/typeorm/entities/StatusTodo';
import { CreateCategoryProject1680573176547, 
         CreateStatusTodo1680908462547 
} from './migrations';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(`${process.env.DB_PORT}`),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [CategoryProject, StatusTodo],
    migrations: [CreateCategoryProject1680573176547, CreateStatusTodo1680908462547],
})