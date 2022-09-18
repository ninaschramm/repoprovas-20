import { client } from "../../src/database/prisma";
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export async function createTest () {
    const test = { 
        "name": `Prova ${faker.word.noun()}`,
        "categoryName": "Projeto",
        "teacherName": "Diego Pinho",
        "disciplineName": "JavaScript",
        "link": faker.internet.url()      
    }
    return test
  } 