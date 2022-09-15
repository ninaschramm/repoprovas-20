import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandlerMiddleware } from './middlewares/ErrorHandler';
import dotenv from 'dotenv';
import { router } from './routes';
dotenv.config()

const server = express();
server.use(cors());
server.use(express.json());

server.use(router)
server.use(errorHandlerMiddleware)

export default server;