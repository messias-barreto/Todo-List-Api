import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/typeorm/data-source";
import { CategoryProject } from "../../../../modules/project/infra/typeorm/entities/CategoryProject";

async function categoryProjectSeed() {
     AppDataSource.initialize().then(() => {
        let repository: Repository<CategoryProject>;
        repository = AppDataSource.getRepository(CategoryProject);
    
        repository.query(`  
            INSERT into category_project (id, name) values 
                                        ('f2b66da7-5b54-4033-9141-e850acbbffcb', 'Lazer'),
                                        ('48243349-3b3b-453b-9104-05b934418d18', 'Estudo'),
                                        ('11d4cae6-81b3-4884-ba1b-dd7d3e41733a', 'Trabalho'),
                                        ('d5bf0b54-9f04-4964-98f6-0727aa89b817', 'Reforma'),
                                        ('4e40eb3f-b5c7-4c9f-9059-54eda7df85d9', 'Planejamento');
            `);
    })

    .catch(() => {
        console.error("Does not possible initialization Data Source");
    })
}


export { categoryProjectSeed }