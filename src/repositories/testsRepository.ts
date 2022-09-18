import { client } from '../database/prisma'
import { testData } from '../types/testTypes'


export async function getTeachersId(name: string) {
    const teacher = await client.teachers.findUnique({
        where: { name }
    })
    return teacher
}

export async function getDisciplineId(name: string) {
    const discipline = await client.disciplines.findUnique({
        where: { name }
    })
    return discipline
}

export async function getCategoryId(name: string) {
    const discipline = await client.categories.findUnique({
        where: { name }
    })
    return discipline
}

export async function getTeachersDisciplineId(teacherId: number, disciplineId: number) {
    const teacherDiscipline = await client.teachers_Disciplines.findFirst({
        where: {
            teacherId,
            disciplineId
        }
    })
    return teacherDiscipline
}

export async function insert(test: testData) {
    await client.tests.create({
        data: test
    });
}

export async function getTestsByDiscipline() {
    const testsByDiscipline = await client.terms.findMany({
        select: {
            id: false,
            number: true,            
            disciplines: {
                select: {
                    name: true,
                    id: false,
                    termId: false,
                    teacherDiscipline: {
                        select: {
                            teacher: {
                                select: {
                                    name: true
                                }
                            },
                            tests: {
                                distinct: ['categoryId'],
                                select: {
                                   category: {
                                    select: {
                                        name: true,
                                        tests: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                   }
                                }
                            }
                        }
                    }
                }}
        }        
    })
    return testsByDiscipline
}