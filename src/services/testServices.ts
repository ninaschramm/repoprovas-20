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
        link
    }

    await testRepository.insert(testData)
}