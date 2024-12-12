//path: backend/src/index.ts
import "dotenv/config";

// Core modules
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Middlewares
import passport from "./middlewares/passport";
import { asyncHandler } from "./middlewares/asyncHandler";
import { errorHandler } from "./middlewares/errorHandler";
import { authenticateJWT } from "./common/strategies/jwt.strategy";

// Configurations
import { config } from "./config/app.config";
import { HTTP_STATUS } from "./config/http.config";

// Database
import connectDatabase from "./database/database";

// Routes
import authRoutes from "./modules/auth/auth.routes";
import mfaRoutes from "./modules/mfa/mfa.routes";
import sessionRoutes from "./modules/session/session.routes";

const app = express();
const BASE_PATH = config.BASE_PATH;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTP_STATUS.OK).json({ message: "Hello Subscribers!!!" });
  }),
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/mfa`, mfaRoutes);
app.use(`${BASE_PATH}/session`, authenticateJWT, sessionRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
