import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/user/useCase/authenticateUser/AuthenticateUserUseCase.spec';

const authenticateRoutes = Router();
const authenticateUser = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUser.handle);

export { authenticateRoutes }