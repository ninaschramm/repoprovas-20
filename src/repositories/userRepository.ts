import { client } from '../database/prisma'

export async function insert(email: string, password: string) {
    await client.users.create({
        data: {
            email,
            password
        }
    });
}

export async function checkEmail(email: string) {
    const user = await client.users.findUnique({
        where: { email }
    })
    return user
}
