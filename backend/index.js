import express from 'express'
import cors from 'cors'
import issueRoutes from "./routes/issues.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/", issueRoutes)

app.listen(8800)
