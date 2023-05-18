import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    async createUser(req, res) { //criar usuario
        try {
            const { name, email } = req.body

            let user = await prisma.user.findUnique({ where: { email } })

            if (user) {
                return res.json({ error: "Já existe um usuario com este email" })
            }

            user = await prisma.user.create({
                data: { name, email }
            })
            return res.json(user)
        } catch (error) { return res.json({ error }) }
    },

    async findAllUsers(req, res) { //pegar todos os usuarios
        try {
            const users = await prisma.user.findMany()
            return res.json(users)
        } catch (error) {
            return res.json({ error })
        }
    },

    async findUser(req, res) { //pegar um usuario pelo id
        try {
            const { id } = req.params
            const user = await prisma.user.findUnique({ where: { id: Number(id) } })
            if (!user) return res.json({ error: "Não foi possivel encontrar o usuario" })
            return res.json(user)
        } catch (error) {
            return res.json({ error })
        }
    },

    async updateUser(req, res) { //modificar um usuario pelo id
        try {
            const { id } = req.params
            const { name, email } = req.body

            let user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.json({ error: "Não foi possivel encontrar o usuario" })

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email },
            })
            return res.json(user)
        } catch (error) {
            return res.json({ error })
        }
    },

    async deleteUser(req, res) { //pegar um usuario pelo id
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.json({ error: "Não foi possivel encontrar o usuario" })

            await prisma.user.delete({ where: { id: Number(id) } })
            return res.json({menssagem: "Usuario deletado"})

        } catch (error) {
            return res.json({ error })
        }
    },

}