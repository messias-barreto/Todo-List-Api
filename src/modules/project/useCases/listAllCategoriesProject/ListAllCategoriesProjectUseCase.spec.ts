import { CategoriesProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesProjectRepositoryInMemory";
import { CreateCategoryProjectUseCase } from "../createCategoryProject/CreateCategoryProjectUseCase";
import { ListAllCategoriesProjectUseCase } from "./ListAllCategoriesProjectUseCase";

describe("List All Categories Project", () => {
    let categoryProjectRepository: CategoriesProjectRepositoryInMemory;
    let createCategoryProjectUseCase: CreateCategoryProjectUseCase;
    let listCategoryProjectUseCase: ListAllCategoriesProjectUseCase;

    beforeAll(() => {
        categoryProjectRepository = new CategoriesProjectRepositoryInMemory;
        createCategoryProjectUseCase = new CreateCategoryProjectUseCase(categoryProjectRepository);
        listCategoryProjectUseCase = new ListAllCategoriesProjectUseCase(categoryProjectRepository);
    })

    it("Shold be able to list all categories", async () => {
        const category = await createCategoryProjectUseCase.execute({
            name: "any_test_01",
            description: "any_description_01"
        });

        const categories = await listCategoryProjectUseCase.execute();
        expect(categories).toEqual([category]);
    })
})