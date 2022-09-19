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

export async function getTests(){
    const tests = await client.tests.findMany({   
        select: {
            name: true,
            category: {
                select: {
                    name: true
                }
            },
            teacher: {
                select: {
                    name: true
                }
            },
            discipline: {
                select: {
                    name: true
                }
            }
        }
    })
    return tests
}

export async function getDisciplines(){
    const terms = await client.terms.findMany({
        select: {
            number: true,
            disciplines: true
        }
    })
    return terms
}

export async function getCategories(){
    const categories = await client.categories.findMany({
        select: {
            name: true
        }
    })
    return categories
}

export async function getTestsByDiscipline() {
    const testsByDiscipline = await client.terms.findMany({
        select: {
            id: false,
            number: true,            
            disciplines: {
                select: {
                    name: true,
                    tests: {
                        distinct: ['categoryId'],
                        select: {
                            name: true,
                            category: {
                                select: {
                                    name: true
                                }
                            },
                            teacher: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                        }
                    }
                }
        })
    return testsByDiscipline
}

export async function getTestsByTeacher() {
    const testsByTeacher = await client.teachers.findMany({
        select: {
            name: true,
            teacherDiscipline: {
                select: {
                    id: true,
                    discipline: {
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
                                                name: true,
                                                teacherDisciplineId: true,
                                                teacherDiscipline: {
                                                    select: {
                                                        discipline: {
                                                            select: {
                                                                name: true}
                                                            }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                   }
                                }
                    }
                }
            }
        }
    })
    return testsByTeacher
}