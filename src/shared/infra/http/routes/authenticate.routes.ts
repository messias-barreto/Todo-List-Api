import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/user/useCase/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../../../../modules/user/useCase/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();
const authenticateUser = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUser.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes }