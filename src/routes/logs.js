import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.post('/insert_exercise', async (req, res) => {
    try {
        const { exerciceType, weight } = req.body

        if (!exerciceType || !weight) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes." })
        }

        const log = await prisma.logsExercises.create({
            data: {
                exerciceType,
                weight: parseFloat(weight)
            }
        })

        res.json(log)
        console.log(log)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro ao criar o log", status: 500 })
    }
})

router.get('/logged_exercises', async (req, res) => {
    try {
        const logs = await prisma.logsExercises.findMany({
            orderBy: { createdAt: 'desc' }
        })

        res.json(logs)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao buscar logs.", status: 500 })
        

    }
})

router.get('/exercises', async (req, res) => {
    try {
        const list = await prisma.exercises.findMany()

        res.json(list)

    } catch (error) {
        console.error('Erro ao buscar exercícios:', error)
        res.status(500).json({ message: "Erro ao buscar exercicios.", status: 500 })

    }
})

router.get('/logged_exercises/:id', async (req, res) => {
    const { id } = req.params
    try {
        const exercise = await prisma.logsExercises.findUnique({ where: { id: id } })
        console.log(exercise)
        res.json(exercise)
    } catch (error) {
        console.log(error)
    }
})

router.post('/update_exercise/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { exerciceType, weight } = req.body

        const updateLog = await prisma.logsExercises.update({
            where: { id: id },
            data: {
                exerciceType,
                weight: parseFloat(weight)
            }
        })

        console.log(updateLog)
        res.json(updateLog)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    try {
        await prisma.logsExercises.delete({ where: { id: id } })
        console.log(`deletede excercise: ${id}`)
        return res.status(200).json({ status: 1 })
    } catch (e) {
        console.error(e)
    }
})

export default router