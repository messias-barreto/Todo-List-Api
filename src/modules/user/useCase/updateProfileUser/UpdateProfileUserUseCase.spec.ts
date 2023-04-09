import { UserRepositoryInMemory } from "../../infra/typeorm/repository/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ListProfileUserUseCase } from "../listProfileUser/ListProfileUserUseCase";
import { UpdateProfileUserUseCase } from "./UpdateProfileUserUseCase";


describe("Update Profile User", () => {
    let userRepository: UserRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;
    let listProfileUserUseCase: ListProfileUserUseCase;
    let updateProfileUserUseCase: UpdateProfileUserUseCase;

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepository);
        listProfileUserUseCase = new ListProfileUserUseCase(userRepository);
        updateProfileUserUseCase = new UpdateProfileUserUseCase(userRepository);
    });

    it("Shold be able to Updated the Profile User", async() => {
        const user = await createUserUseCase.execute({
            name: "any_name",
            email: "any_email@gmail.com",
            login: "any_login_01",
            password: "any_password",
        });

        await updateProfileUserUseCase.execute({
            name: "any_updated_name",
            email: "any_email@gmail.com",
            login: "any_updated_login_01",
            id: user.id
        });

        const list_user = await listProfileUserUseCase.execute(user.id);
        expect(list_user.name).toEqual("any_updated_name");
        expect(list_user.login).toEqual("any_updated_login_01");
    })
})