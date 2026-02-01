import { MySQLModel } from "../models/mysql-model.js";

export class CompanySettingsController {
    static async getSettings(req, res) {
        try {
            const [rows] = await MySQLModel.getByid('company_settings', 1, 'setting_id');

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Configuración no encontrada' });
            }

            res.json(rows[0]);
        } catch (error) {
            console.error('Error obteniendo configuración:', error);
            res.status(500).json({ error: 'Error al obtener configuración' });
        }
    }

    static async updateSettings(req, res) {
        try {
            const {
                company_name,
                company_legal_name,
                company_tax_id,
                company_address,
                company_phone,
                company_email,
                company_logo_url
            } = req.body;

            const updateData = {};
            if (company_name) updateData.company_name = company_name;
            if (company_legal_name) updateData.company_legal_name = company_legal_name;
            if (company_tax_id) updateData.company_tax_id = company_tax_id;
            if (company_address) updateData.company_address = company_address;
            if (company_phone) updateData.company_phone = company_phone;
            if (company_email) updateData.company_email = company_email;
            if (company_logo_url !== undefined) updateData.company_logo_url = company_logo_url;

            await MySQLModel.updateById('company_settings', 1, updateData, 'setting_id');

            // Obtener configuración actualizada
            const [rows] = await MySQLModel.getByid('company_settings', 1, 'setting_id');

            res.json({
                message: 'Configuración actualizada exitosamente',
                data: rows[0]
            });
        } catch (error) {
            console.error('Error actualizando configuración:', error);
            res.status(500).json({ error: 'Error al actualizar configuración' });
        }
    }
}
