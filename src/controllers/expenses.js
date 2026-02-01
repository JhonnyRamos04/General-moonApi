import { MySQLModel } from "../models/mysql-model.js";

export class ExpensesController {
    static async getAllExpenses(req, res) {
        try {
            const [rows] = await MySQLModel.getAll('operational_expenses');
            res.json(rows);
        } catch (error) {
            console.error('Error obteniendo gastos:', error);
            res.status(500).json({ error: 'Error al obtener gastos' });
        }
    }

    static async createExpense(req, res) {
        try {
            const {
                expense_description,
                expense_amount,
                expense_date,
                expense_category
            } = req.body;

            if (!expense_description || !expense_amount || !expense_date) {
                return res.status(400).json({ error: 'Faltan campos requeridos' });
            }

            const expenseData = {
                expense_description,
                expense_amount: parseFloat(expense_amount),
                expense_date,
                expense_category: expense_category || 'GENERAL'
            };

            await MySQLModel.create('operational_expenses', expenseData);

            res.status(201).json({
                message: 'Gasto creado exitosamente',
                data: expenseData
            });
        } catch (error) {
            console.error('Error creando gasto:', error);
            res.status(500).json({ error: 'Error al crear gasto' });
        }
    }

    static async deleteExpense(req, res) {
        try {
            const { id } = req.params;

            await MySQLModel.deleteById('operational_expenses', id);

            res.json({ message: 'Gasto eliminado exitosamente' });
        } catch (error) {
            console.error('Error eliminando gasto:', error);
            res.status(500).json({ error: 'Error al eliminar gasto' });
        }
    }
}
