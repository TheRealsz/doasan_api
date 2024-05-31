import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectToMongo } from './db/connect'
import router from './routes/router'

const app = express()

app.use(cors())

app.use(express.json())

connectToMongo()

const routes = router

app.use("/api", routes)

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
