import { client } from "../../src/database/prisma";
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export async function createUser () {
    const user = {
      email: "email@teste.com.br",
      password: "123456",
      confirmPassword: "123456"
    };  
    return user
  } 