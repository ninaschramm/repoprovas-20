import { Router } from "express";

import authRouter from "./authRouters";

const router = Router();

router.use(authRouter)

 export { router };