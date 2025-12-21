import { MySQLModel } from "../models/mysql-model.js";
import { UserSchema } from "../schemas/users.js";

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

    static async getUserById(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const [rows] = await MySQLModel.getByid('users', id);
            if (rows.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error(`Error fetching user with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async updateUserById(req, res) {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        try {
            await MySQLModel.updateById('users', id, data);
            res.json({ message: "User updated successfully" });
        } catch (error) {
            console.error(`Error updating user with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async deleteUserById(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            await MySQLModel.deleteById('users', id);
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(`Error deleting user with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async createUser(req, res) {
        const data = req.body;
        // const parseData = UserSchema.safeParse(data);
        // if (!parseData.success) {
        //     return res.status(400).json({ error: "Invalid user data", details: parseData.error.errors });
        // }
        console.log("Creating user with data:", data);
        try {
            const [result] = await MySQLModel.create('users', data);
            res.status(201).json({ id: result.insertId, message: "User created successfully" });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    /* Auth methods */

    /* Clients Methods */

    static async getAllClients(req, res) {
        try {
            const [rows] = await MySQLModel.getAll('clients');
            res.json(rows);
        } catch (error) {
            console.error("Error fetching clients:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }   

    static async createClient(req, res) {
        const data = req.body;
        console.log("Creating client with data:", data);
        try {
            const [result] = await MySQLModel.create('clients', data);
            res.status(201).json({ id: result.insertId, message: "Client created successfully" });
        } catch (error) {
            console.error("Error creating client:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async getClientById(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const [rows] = await MySQLModel.getByid('clients', id);
            if (rows.length === 0) {
                return res.status(404).json({ error: "Client not found" });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error(`Error fetching client with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async updateClientById(req, res) {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        try {
            await MySQLModel.updateById('clients', id, data);
            res.json({ message: "Client updated successfully" });
        } catch (error) {
            console.error(`Error updating client with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }   

    
}