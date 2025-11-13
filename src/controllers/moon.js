import { MySQLModel } from "../models/mysql-model.js";

export class MoonController {
    static async getAllUsers(req, res) {
        try {
            const [rows] = await MySQLModel.getAll('users');
            res.json(rows);
        } catch (error) {
            console.error("Error fetching moons:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}