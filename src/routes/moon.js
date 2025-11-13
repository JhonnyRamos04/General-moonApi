import { MoonController } from "../controllers/moon.js"
import { Router } from "express"


export const createMoonRouter = () => {
    const moonRouter = Router()
    //const moonController = new MoonController()

    moonRouter.get("/users", MoonController.getAllUsers)

    return moonRouter
}
