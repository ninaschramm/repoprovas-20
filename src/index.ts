import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorHandlerMiddleware from './middlewares/ErrorHandler.js';
import dotenv from 'dotenv';
dotenv.config()

const server = express();
server.use(cors());
server.use(express.json());

// routes
// server.use();
server.use(errorHandlerMiddleware)

export default server;