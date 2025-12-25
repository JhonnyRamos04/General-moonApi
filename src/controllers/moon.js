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

    /* Invoices Methods */

    static async getAllInvoices(req, res) {
        try {
            const [rows] = await MySQLModel.getAll('invoices');
            res.json(rows);
        } catch (error) {
            console.error("Error fetching invoices:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async createInvoice(req, res) {
        const data = req.body;
        console.log("Creating invoice with data:", data);
        try {
            const [result] = await MySQLModel.create('invoices', data);
            res.status(201).json({ id: result.insertId, message: "Invoice created successfully" });
        } catch (error) {
            console.error("Error creating invoice:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async getInvoiceById(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const [rows] = await MySQLModel.getByid('invoices', id);
            if (rows.length === 0) {
                return res.status(404).json({ error: "Invoice not found" });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error(`Error fetching invoice with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async updateInvoiceById(req, res) {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        try {
            await MySQLModel.updateById('invoices', id, data);
            res.json({ message: "Invoice updated successfully" });
        } catch (error) {
            console.error(`Error updating invoice with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    /*Invoices-details Methods */

    static async getAllInvoiceDetails(req, res) {
        try {
            const [rows] = await MySQLModel.getAll('invoice_details');
            res.json(rows);
        } catch (error) {
            console.error("Error fetching invoice details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async createInvoiceDetail(req, res) {
        const data = req.body;
        console.log("Creating invoice detail with data:", data);
        try {
            const [result] = await MySQLModel.create('invoice_details', data);
            res.status(201).json({ id: result.insertId, message: "Invoice detail created successfully" });
        } catch (error) {
            console.error("Error creating invoice detail:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async getInvoiceDetailById(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const [rows] = await MySQLModel.getByid('invoice_details', id);
            if (rows.length === 0) {
                return res.status(404).json({ error: "Invoice detail not found" });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error(`Error fetching invoice detail with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async updateInvoiceDetailById(req, res) {
        const id = parseInt(req.params.id, 10);
        const data = req.body;
        try {
            await MySQLModel.updateById('invoice_details', id, data);
            res.json({ message: "Invoice detail updated successfully" });
        } catch (error) {
            console.error(`Error updating invoice detail with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}