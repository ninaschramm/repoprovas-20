import { Router } from "express";

import { testSchema } from '../schemas/testSchemas'

import { registerTest } from "../controllers/testControllers";

import { validateSchema } from "../middlewares/ValidateSchema";

const testRouter = Router();

testRouter.post("/tests", validateSchema(testSchema), registerTest);

export default testRouter;