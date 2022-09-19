import * as testRepository from '../repositories/testsRepository';
import { testData } from '../types/testTypes';

export async function registerTest(test: any) {

    const { categoryName, teacherName, disciplineName, name, link } = test;
    
    const category = await testRepository.getCategoryId(categoryName)
    if (!category) throw Error("Categoria não encontrada"); 
    const categoryId = category.id

    const teacher = await testRepository.getTeachersId(teacherName)
    if (!teacher) throw Error("Professor(a) não encontrado(a)"); 
    const teacherId = teacher.id

    const discipline = await testRepository.getDisciplineId(disciplineName)
    if (!discipline) throw Error("Disciplina não encontrada"); 
    const disciplineId = discipline.id

    const teacherDiscipline = await testRepository.getTeachersDisciplineId(teacherId, disciplineId)
    if (!teacherDiscipline) throw Error("Este professor não leciona esta disciplina")
    const teacherDisciplineId = teacherDiscipline.id

    const testData: testData = {
        name,
        categoryId,
        teacherDisciplineId,
        link,
        teacherId,
        disciplineId
    }

    await testRepository.insert(testData)
}

export async function getTestsByDiscipline() {

    let terms = [];
    
    const termList = await testRepository.getDisciplines()
    
    for (let term of termList) {
        let disciplines = [];
        for (let discipline of term.disciplines) {
            let categories = [];
            disciplines.push({
                name: discipline.name,
                categories: categories
            })
        }
        terms.push({
            number: term.number,
            disciplines: disciplines
        })
    }

    const testList = await testRepository.getTests()

    for (let test of testList) {
        for (let term of terms) {
            for (let discipline of term.disciplines) {
                let tests = []
                if (discipline.name == test.discipline.name) {
                    if (!discipline.categories.find(e => e.name === test.category.name)) {
                        discipline.categories.push({
                            name: test.category.name,
                            tests: tests
                        })
                    }
                }
            }            
        }
    }

    for (let test of testList) {
        for (let term of terms) {
            for (let discipline of term.disciplines) {
                if (discipline.name == test.discipline.name) {
                    for (let category of discipline.categories) {
                        if (category.name == test.category.name) {
                        category.tests.push({
                            testname: `${test.name} (${test.teacher.name})`
                        })
                        }
        }
        }
    }
    }
}
    return terms
}

export async function getTestsByTeacher() {
    const testsList = await testRepository.getTestsByTeacher()

    for (let teacher of testsList) {
        for (let teacherDiscipline of teacher.teacherDiscipline) {
            let id = teacherDiscipline.id;
            for (let test of teacherDiscipline.tests) {         
                for (let testName of test.category.tests) {                                       
                    if (testName.teacherDisciplineId !== id) {                    
                        let i = test.category.tests.indexOf(testName)
                        test.category.tests.splice(i, 1)
                    }   
                    else {
                        let discipline = testName.teacherDiscipline.discipline.name;     
                        testName.name = `${testName.name} (${discipline})`   
                        delete testName.teacherDiscipline  
                    }
                }
            }
        }
    }
    
    return testsList
}