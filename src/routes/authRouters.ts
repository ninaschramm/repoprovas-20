import { Router } from "express";

import { userSchema, createUserSchema } from "../schemas/authSchemas";

import { createUser, signIn } from "../controllers/authControllers";

import { validateSchema } from "../middlewares/ValidateSchema";

const authRouter = Router();

authRouter.post("/signup", validateSchema(createUserSchema), createUser);
authRouter.post("/signin", validateSchema(userSchema), signIn);

export default authRouter;