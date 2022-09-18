import { Router } from "express";

import { testSchema } from '../schemas/testSchemas'

import { getTestsByDiscipline, getTestsByTeacher, registerTest } from "../controllers/testControllers";

import { validateSchema } from "../middlewares/ValidateSchema";
import { validateToken } from "../middlewares/ValidateToken";

const testRouter = Router();

testRouter.post("/tests", validateToken, validateSchema(testSchema), registerTest);
testRouter.get("/testsByDiscipline", validateToken, getTestsByDiscipline)
testRouter.get("/testsByTeacher", validateToken, getTestsByTeacher)

export default testRouter;