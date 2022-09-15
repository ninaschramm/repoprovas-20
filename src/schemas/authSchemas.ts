import Joi, { ObjectSchema } from 'joi';
import { userData } from '../types/userTypes';

const userSchema: ObjectSchema = Joi.object<userData>({
    email: Joi.string().email().required().messages({
        'string.empty': "Todos os campos são obrigatórios",
        'any.required': "Todos os campos são obrigatórios",}),
    password: Joi.string().required().messages({
        'string.empty': "Todos os campos são obrigatórios",
        'any.required': "Todos os campos são obrigatórios"})
})

const createUserSchema: ObjectSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': "Todos os campos são obrigatórios",
        'any.required': "Todos os campos são obrigatórios"}),
    password: Joi.string().required().messages({
        'string.empty': "Todos os campos são obrigatórios",
        'any.required': "Todos os campos são obrigatórios"}),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.empty': "Todos os campos são obrigatórios",
        'any.required': "Todos os campos são obrigatórios",
        'any.only': "A confirmação de senha não confere!",}),
})

export {
    userSchema,
    createUserSchema
}