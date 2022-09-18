import Joi, { ObjectSchema } from 'joi';

const testSchema: ObjectSchema = Joi.object({
    name: Joi.string().required(),
    categoryName: Joi.string().required(),
    teacherName: Joi.string().required(),
    disciplineName: Joi.string().required(),
    link: Joi.string().required()
})

export { testSchema }