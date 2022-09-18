import { Router } from "express";

import authRouter from "./authRouters";
import testRouter from "./testRouters";

const router = Router();

router.use(authRouter, testRouter)

 export { router };