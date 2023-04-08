import { AppErrors } from "../../../../shared/errors/AppErrors";
import { UserRepositoryInMemory } from "../../infra/typeorm/repository/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User", () => {
    let userRepository: UserRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepository);
    })

    it("Shold be able to create a new User", async() => {
        const user = await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password"
        });

        expect(user).toHaveProperty("id");
    });

    it("Shold be not able to create a new User if Email Was Add", async() => {
        expect(async () => {
            await createUserUseCase.execute({
                name: "any_name",
                email: "any_email@gmail.com",
                login: "any_login_01",
                password: "any_password"
            });

            await createUserUseCase.execute({
                name: "any_name",
                email: "any_email@gmail.com",
                login: "any_login_02",
                password: "any_password"
            })
        }).rejects.toBeInstanceOf(AppErrors);
    })

    it("Shold be not able to create a new User if Login Was Add", async() => {
        expect(async () => {
            await createUserUseCase.execute({
                name: "any_name",
                email: "any_email@gmail.com",
                login: "any_login_01",
                password: "any_password"
            });

            await createUserUseCase.execute({
                name: "any_name",
                email: "any_email_2@gmail.com",
                login: "any_login_01",
                password: "any_password"
            })
        }).rejects.toBeInstanceOf(AppErrors);
    })
})

