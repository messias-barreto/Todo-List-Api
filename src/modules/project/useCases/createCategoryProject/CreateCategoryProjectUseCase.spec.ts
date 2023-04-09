import { AppErrors } from '../../../../shared/errors/AppErrors';
import { CategoriesProjectRepositoryInMemory } from "../../infra/typeorm/repositories/in-memory/CategoriesProjectRepositoryInMemory";
import { CreateCategoryProjectUseCase } from "./CreateCategoryProjectUseCase"

let createCategoryProjectUseCase: CreateCategoryProjectUseCase;
let categoriesRepository: CategoriesProjectRepositoryInMemory;

describe("Create Category Project", () => {
    beforeEach(() => {
        categoriesRepository = new CategoriesProjectRepositoryInMemory();
        createCategoryProjectUseCase = new CreateCategoryProjectUseCase(categoriesRepository);
    });

    it("Shold be able to create a new Category Project", async () => {
        const category = await createCategoryProjectUseCase.execute({
            name: "any_name",
            description: "any_description"
        });

        expect(category).toHaveProperty("id");
    });

    it("Shold not be able to create a new Category if Category Name is Add", async () => {
        await createCategoryProjectUseCase.execute({
            name: "any_name",
            description: "any_description"
        })

        await expect(
            createCategoryProjectUseCase.execute({
                name: "any_name",
                description: "any_description"
            })
        ).rejects.toEqual(new AppErrors("Categories already Exists!"));
    });
})