import 'dotenv/config';
import { DataSource } from 'typeorm'
import { CategoryProject } from '../../modules/project/infra/typeorm/entities/CategoryProject';
import { Project } from '../../modules/project/infra/typeorm/entities/Project';
import { StatusTodo } from '../../modules/todo/infra/typeorm/entities/StatusTodo';
import { Todo } from '../../modules/todo/infra/typeorm/entities/Todo';
import { User } from '../../modules/user/infra/typeorm/entities/User';
import { UserTokens } from '../../modules/user/infra/typeorm/entities/UserTokens';
import { CreateCategoryProject1680573176547, 
         CreateStatusTodo1680908462547,
         CreateUser1680917363570,
         CreateProject1680981434895,
         CreateTodo1681264978598,
         CreateUsersToken1681351191993 
} from './migrations';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(`${process.env.DB_PORT}`),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ CategoryProject, 
                StatusTodo, 
                User, 
                Project,
                Todo,
                UserTokens
            ],
    migrations: [   CreateCategoryProject1680573176547, 
                    CreateStatusTodo1680908462547, 
                    CreateUser1680917363570, 
                    CreateProject1680981434895,
                    CreateTodo1681264978598,
                    CreateUsersToken1681351191993
                ]
});