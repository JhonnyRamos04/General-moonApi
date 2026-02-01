import { MySQLModel } from "../models/mysql-model.js";
import { UserSchema } from "../schemas/users.js";
import ExcelJS from "exceljs";

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
            const [rows] = await MySQLModel.getByid('clients', id, 'client_id');
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
            await MySQLModel.updateById('clients', id, data, 'client_id');
            res.json({ message: "Client updated successfully" });
        } catch (error) {
            console.error(`Error updating client with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }   

    /* Invoices Methods */

    static async getAllInvoices(req, res) {
        try {
            const [rows] = await MySQLModel.getAll('invoice');
            res.json(rows);
        } catch (error) {
            console.error("Error fetching invoice:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async createInvoice(req, res) {
        const data = req.body;
        console.log("Creating invoice with data:", data);
        try {
            const [result] = await MySQLModel.create('invoice', data);
            res.status(201).json({ id: result.insertId, message: "Invoice created successfully" });
        } catch (error) {
            console.error("Error creating invoice:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async getInvoiceById(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const [rows] = await MySQLModel.getByid('invoice', id,'invoice_id');
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
            await MySQLModel.updateById('invoice', id, data,'invoice_id');
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
            const [rows] = await MySQLModel.getByid('invoice_details', id, 'detail_id');
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
            await MySQLModel.updateById('invoice_details', id, data, 'detail_id');
            res.json({ message: "Invoice detail updated successfully" });
        } catch (error) {
            console.error(`Error updating invoice detail with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async exportInvoiceToExcel(req, res) {
        const invoiceData = req.body;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Factura');

        // Configuración de columnas
        worksheet.columns = [
            { header: 'CANTIDAD', key: 'quantity', width: 12 },
            { header: 'REF', key: 'ref', width: 12 },
            { header: 'DESCRIPCIÓN', key: 'description', width: 45 },
            { header: 'PRECIO UNIT.', key: 'unit_price', width: 15 },
            { header: '% ALIC', key: 'tax_rate', width: 10 },
            { header: 'TOTAL', key: 'total_row', width: 15 }
        ];

        // --- ENCABEZADO (Estilo SUMINISTROS DEPOMED) ---
        worksheet.mergeCells('A1:C3');
        const logoCell = worksheet.getCell('A1');
        logoCell.value = 'SUMINISTROS DEPOMED';
        logoCell.font = { name: 'Inter', size: 18, bold: true, color: { argb: 'FF1E40AF' } };
        logoCell.alignment = { vertical: 'middle', horizontal: 'left' };

        worksheet.mergeCells('D1:F1');
        const companyNameCell = worksheet.getCell('D1');
        companyNameCell.value = 'SUMINISTROS DEPOMED, C.A.';
        companyNameCell.font = { bold: true, size: 12, color: { argb: 'FF374151' } };
        companyNameCell.alignment = { horizontal: 'right' };

        worksheet.mergeCells('D2:F4');
        const companyInfoCell = worksheet.getCell('D2');
        companyInfoCell.value = 'RIF: J-50123456-7\nDirección: Av. Principal de los Ruices, Caracas.\nTelf: 0212-1234567\nEmail: contacto@depomed.com';
        companyInfoCell.font = { size: 9, color: { argb: 'FF6B7280' } };
        companyInfoCell.alignment = { wrapText: true, vertical: 'top', horizontal: 'right' };

        // --- INFO FACTURA ---
        worksheet.getCell('F5').value = `CONTROL No: 00-${(invoiceData.invoice_id || Math.floor(Math.random() * 99999)).toString().padStart(5, '0')}`;
        worksheet.getCell('F5').font = { color: { argb: 'FFDC2626' }, bold: true, size: 11 };
        worksheet.getCell('F5').alignment = { horizontal: 'right' };

        worksheet.getCell('F6').value = `Factura N. ${invoiceData.invoice_id || 'BORRADOR'}`;
        worksheet.getCell('F6').font = { bold: true };
        worksheet.getCell('F6').alignment = { horizontal: 'right' };

        worksheet.getCell('F7').value = `Fecha Emisión: ${invoiceData.invoice_date}`;
        worksheet.getCell('F7').font = { size: 10 };
        worksheet.getCell('F7').alignment = { horizontal: 'right' };

        // --- CLIENTE ---
        const clientStartRow = 9;
        worksheet.mergeCells(`A${clientStartRow}:F${clientStartRow}`);
        worksheet.getCell(`A${clientStartRow}`).value = `CLIENTE: ${invoiceData.client_name || 'Particular'}`;
        worksheet.getCell(`A${clientStartRow}`).font = { bold: true, size: 12 };
        worksheet.getCell(`A${clientStartRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } };
        worksheet.getRow(clientStartRow).height = 25;
        worksheet.getCell(`A${clientStartRow}`).alignment = { vertical: 'middle' };

        // --- TABLA DE ITEMS ---
        const tableHeaderRow = 11;
        const headerRow = worksheet.getRow(tableHeaderRow);
        headerRow.values = ['CANT.', 'REF.', 'DESCRIPCIÓN', 'P. UNIT', '% IVA', 'TOTAL'];
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.eachCell(cell => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F2937' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = { 
                top: { style: 'medium' }, 
                left: { style: 'thin' }, 
                bottom: { style: 'medium' }, 
                right: { style: 'thin' } 
            };
        });
        headerRow.height = 25;

        let currentRow = tableHeaderRow + 1;
        invoiceData.items.forEach(item => {
            const row = worksheet.getRow(currentRow);
            row.values = [
                item.quantity,
                '-',
                item.description,
                item.unit_price,
                '16%',
                item.total_row || (item.quantity * item.unit_price)
            ];
            row.eachCell((cell, colNumber) => {
                cell.border = { left: { style: 'thin' }, right: { style: 'thin' } };
                if (colNumber === 1 || colNumber === 2 || colNumber === 5) {
                    cell.alignment = { horizontal: 'center' };
                } else if (colNumber === 4 || colNumber === 6) {
                    cell.alignment = { horizontal: 'right' };
                    cell.numFmt = '"$"#,##0.00';
                }
            });
            currentRow++;
        });

        // Completar con filas vacías estéticas
        const minRows = 12;
        while (currentRow < tableHeaderRow + minRows) {
            const row = worksheet.getRow(currentRow);
            row.eachCell(cell => {
                cell.border = { left: { style: 'thin' }, right: { style: 'thin' } };
            });
            currentRow++;
        }

        // --- TOTALES ---
        const totalsRow = currentRow;
        worksheet.mergeCells(`A${totalsRow}:E${totalsRow}`);
        worksheet.getCell(`A${totalsRow}`).value = 'Base Imponible Bs.';
        worksheet.getCell(`A${totalsRow}`).alignment = { horizontal: 'right' };
        worksheet.getCell(`F${totalsRow}`).value = (invoiceData.subtotal || invoiceData.total_amount);
        worksheet.getCell(`F${totalsRow}`).numFmt = '"$"#,##0.00';
        worksheet.getCell(`F${totalsRow}`).border = { left: { style: 'thin' }, right: { style: 'thin' }, top: { style: 'thin' } };

        worksheet.mergeCells(`A${totalsRow + 1}:E${totalsRow + 1}`);
        worksheet.getCell(`A${totalsRow + 1}`).value = 'I.V.A 16%';
        worksheet.getCell(`A${totalsRow + 1}`).alignment = { horizontal: 'right' };
        worksheet.getCell(`F${totalsRow + 1}`).value = (invoiceData.tax || 0);
        worksheet.getCell(`F${totalsRow + 1}`).numFmt = '"$"#,##0.00';
        worksheet.getCell(`F${totalsRow + 1}`).border = { left: { style: 'thin' }, right: { style: 'thin' } };

        worksheet.mergeCells(`A${totalsRow + 2}:E${totalsRow + 2}`);
        worksheet.getCell(`A${totalsRow + 2}`).value = 'TOTAL DOCUMENTO';
        worksheet.getCell(`A${totalsRow + 2}`).font = { bold: true };
        worksheet.getCell(`A${totalsRow + 2}`).alignment = { horizontal: 'right' };
        worksheet.getCell(`F${totalsRow + 2}`).value = (invoiceData.total_amount || 0);
        worksheet.getCell(`F${totalsRow + 2}`).font = { bold: true };
        worksheet.getCell(`F${totalsRow + 2}`).numFmt = '"$"#,##0.00';
        worksheet.getCell(`F${totalsRow + 2}`).border = { left: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'medium' } };

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=Factura_${(invoiceData.client_name || 'Cliente').replace(/\s+/g, '_')}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    }
}