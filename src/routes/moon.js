import { MoonController } from "../controllers/moon.js"
import { Router } from "express"


export const createMoonRouter = () => {
    const moonRouter = Router()
    //const moonController = new MoonController()

    /* Users */
    moonRouter.get("/users", MoonController.getAllUsers)
    moonRouter.get("/users/:id", MoonController.getUserById)
    moonRouter.post("/users", MoonController.createUser)
    moonRouter.put("/users/:id", MoonController.updateUserById)
    moonRouter.delete("/users/:id", MoonController.deleteUserById)

    /* Clients */
    moonRouter.get("/clients", MoonController.getAllClients)
    moonRouter.post("/clients", MoonController.createClient)
    moonRouter.get("/clients/:id", MoonController.getClientById)
    moonRouter.put("/clients/:id", MoonController.updateClientById)

    return moonRouter
}
