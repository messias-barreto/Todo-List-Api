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

    it("Shold be able to create a new User", async () => {
        const user = await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password"
        });

        expect(user).toHaveProperty("id");
    });

    it("Shold be not able to create a new User if Email Already Exists!", async () => {
        await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password"
        });

        await expect(
            createUserUseCase.execute({
                name: "any_name",
                email: "any_email@gmail.com",
                login: "any_login_01",
                password: "any_password"
            })
        ).rejects.toEqual(new AppErrors("Email Already Exists!"));
    })

    it("Shold be not able to create a new User if Login Already Exists!", async () => {
        await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password"
        });

        await expect(
            createUserUseCase.execute({
                name: "any_name",
                email: "any_email@gmail2.com",
                login: "any_login_01",
                password: "any_password"
            })
        ).rejects.toEqual(new AppErrors("Login Already Exists!"));
    })
})

