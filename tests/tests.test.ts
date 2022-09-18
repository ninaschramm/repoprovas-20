import { createUser } from "./factories/userFactory";
import server from '../src/index';
import supertest from 'supertest';
import { client } from '../src/database/prisma';
import { createTest } from "./factories/testFactory"

beforeAll(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users"`;
});

let token;

describe("POST /signup", () => {

  it("should answer with status 201 when given email, password and confirm password", async () => {    
    const user = await createUser();
    const response = await supertest(server).post("/signup").send(user);

    const createdUser = await client.users.findUnique({
      where: { email: user.email }
    })

    expect(response.status).toBe(201);
    expect(createdUser).not.toBeNull;
  });

  it("should answer with status 409 when the email is already in use", async () => {      
    const user = await createUser();     
    const response = await supertest(server).post("/signup").send(user);
    expect(response.status).toBe(409);
  });
});

describe("POST /signin", () => {
    it("should answer with status 200 when given email and password", async () => {
     
      const user = await createUser();
      const response = await supertest(server).post("/signin").send({ email: user.email, password: user.password });
      expect(response.status).toBe(200);
      token = response.body.token
      console.log(token)
    });
  });

  describe("GET /testsByTeacher", () => {
    it("should answer with status 200 and return the list os tests", async () => {
     
      const response = await supertest(server).get("/testsByTeacher").set("Authorization", token);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array)
    });

    it("should answer with status 401 when authorization is missing", async () => {
     
      const response = await supertest(server).get("/testsByTeacher");
      expect(response.status).toBe(401);
    });
  });

  describe("GET /testsByDiscipline", () => {
    it("should answer with status 200 and return the list os tests", async () => {
     
      const response = await supertest(server).get("/testsByDiscipline").set("Authorization", token);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array)
    });

    it("should answer with status 401 when authorization is missing", async () => {
     
      const response = await supertest(server).get("/testsByTeacher");
      expect(response.status).toBe(401);
    });
  });

  describe("POST /tests", () => {
    it("should answer with status 201 when given test info", async () => {
     
      const test = await createTest();
      const response = await supertest(server).post("/tests").set("Authorization", token).send(test);

      const createdTest = await client.tests.findUnique({
        where: { name: test.name }
      })


      expect(response.status).toBe(201);
      expect(createTest).not.toBeNull;
    });

    it("should answer with status 401 when authorization is missing", async () => {
     
      const test = await createTest();
      const response = await supertest(server).post("/tests").send(test);
      expect(response.status).toBe(401);
    });
  });

  afterAll(async () => {
    await client.$disconnect();
  });
  