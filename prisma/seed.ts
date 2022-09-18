import { faker } from '@faker-js/faker';
import { client } from '../src/database/prisma';

async function main() {

    const checkTables = await client.terms.findMany(); //checks if the db was populated already
    if (!checkTables) {
        await client.terms.createMany(
            {
            data: [
                {number: 1},
                {number: 2},
                {number: 3},
                {number: 4},
                {number: 5},
                {number: 6}
            ]
            }
        )

        await client.categories.createMany(
            {
            data: [
                {name: "Projeto"},
                {name: "Prática"},
                {name: "Recuperação"}
            ]
            }
        )

        await client.disciplines.createMany(
            {
            data: [
                {name: 'HTML e CSS', termId: 1},
                {name: 'JavaScript', termId: 2},
                {name: 'React', termId: 3},
                {name: 'Humildade', termId: 1},
                {name: 'Planejamento', termId: 2},
                {name: 'Autoconfiança', termId: 3},
            ]
            }
        )

        await client.teachers_Disciplines.createMany(
            {
            data: [
                {teacherId: 1, disciplineId: 1},
                {teacherId: 1, disciplineId: 2},
                {teacherId: 1, disciplineId: 3},
                {teacherId: 2, disciplineId: 1},
                {teacherId: 2, disciplineId: 2},
                {teacherId: 2, disciplineId: 3},
            ]
            }
        )
    }
  }

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    client.$disconnect();
  });
