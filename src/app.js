import e from "express"
import { createMoonRouter } from "./routes/moon.js"

const app = e()
const PORT = process.env.PORT || 3000

export const createApp = () => {
    app.use(e.json())
    app.disable('x-powered-by')

    app.use("/api", createMoonRouter())

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    })

}   
