//path : backend/src/modules/auth/auth.module.ts
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authService = new AuthService();
const authController = new AuthController(authService);

export { authService, authController };
