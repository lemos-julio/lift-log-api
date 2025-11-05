import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import logsRouter from './routes/logs.js'


dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())

app.use('/', logsRouter)


const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`)
})