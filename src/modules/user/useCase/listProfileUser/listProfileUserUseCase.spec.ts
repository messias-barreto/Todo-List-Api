import { UserRepositoryInMemory } from "../../infra/typeorm/repository/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { ListProfileUserUseCase } from "./listProfileUserUseCase";


describe("List Profile User", () => {
    let userRepository: UserRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;
    let listProfileUserUseCase: ListProfileUserUseCase;

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepository);
        listProfileUserUseCase = new ListProfileUserUseCase(userRepository);
    });

    it("Shold be able to List Profile User", async () => {
        const user = await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password"
        });

        const find_user = await listProfileUserUseCase.execute(user.id)
        expect(find_user).toEqual(user);
    })
})