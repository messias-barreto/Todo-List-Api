import { CategoriesProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesProjectRepositoryInMemory";
import { CreateCategoryProjectUseCase } from "../createCategoryProject/createCategoryProjectUseCase";
import { ListCategoriesProjectUseCase } from "./listCategoryProjectUseCase"

describe("List Category Project", () => {
    let categoryProjectUseCase: CategoriesProjectRepositoryInMemory;
    let createCategoryProjectUseCase: CreateCategoryProjectUseCase;
    let listCategoryProjectUseCase: ListCategoriesProjectUseCase;

    beforeEach(() => {
        categoryProjectUseCase = new CategoriesProjectRepositoryInMemory();
        createCategoryProjectUseCase = new CreateCategoryProjectUseCase(categoryProjectUseCase);
        listCategoryProjectUseCase = new ListCategoriesProjectUseCase(categoryProjectUseCase);
    });

    it("Shold be able to list category project by id", async () => {
        //criar uma categoria
        const category = await createCategoryProjectUseCase.execute({
            name: "any_name",
            description: "any_description"
        });
        
        //buscando a categoria pelo id
        const list_category = await listCategoryProjectUseCase.execute(category.id);
        expect(list_category).toEqual(category);
    })
})