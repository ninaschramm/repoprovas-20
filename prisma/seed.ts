import { faker } from '@faker-js/faker';
import { client } from '../src/database/prisma';

async function main() {

    const checkTerms = await client.terms.findMany(); //checks if the db was populated already
    const checkCategories = await client.categories.findMany();
    const checkTeachers = await client.teachers.findMany();
    const checkDisciplines = await client.disciplines.findMany();
    const checkTeachersDisciplines = await client.teachers_Disciplines.findMany(); // one for each because of possible errors
    
    if (checkTerms.length === 0) {
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
        }

    if (checkCategories.length === 0) {

        await client.categories.createMany(
            {
            data: [
                {name: "Projeto"},
                {name: "Prática"},
                {name: "Recuperação"}
            ]
            }
        )
    }

    if (checkTeachers.length === 0) {
        await client.teachers.createMany(
            {
            data: [
                {name: "Diego Pinho"},
                {name: "Bruna Hamori"}
            ]
            }
        )
    }

    if (checkDisciplines.length === 0) {

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
    }

    if (checkTeachersDisciplines.length === 0) {

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
