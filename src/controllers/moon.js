import { MySQLModel } from "../models/mysql-model.js";
import { UserSchema } from "../schemas/users.js";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export class MoonController {
    getAllUsers = async (req, res) => {
        try {
            const [rows] = await MySQLModel.getAll('users')
            res.json(rows);
        } catch (error) {
            console.error("Error fetching moons:", error)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
    getInvoces = async (req, res) => {
        try {
            const [rows] = await MySQLModel.getInvoices('invoice')
            res.json(rows);
        }
        catch (error) {
            console.error("Error fetching invoices:", error)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }

    getallproducts = async (req, res) => {
        try {
            const [rows] = await MySQLModel.getAll('products')
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

    static async getInvoiceById(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            // Get invoice header
            const [invoiceRows] = await MySQLModel.getByid('invoice', id, 'invoice_id');
            if (invoiceRows.length === 0) {
                return res.status(404).json({ error: "Invoice not found" });
            }

            // Get invoice items
            const [itemsRows] = await MySQLModel.execute(
                'SELECT * FROM invoice_details WHERE invoice_id = ?',
                [id]
            );

            const invoice = {
                ...invoiceRows[0],
                items: itemsRows
            };

            res.json(invoice);
        } catch (error) {
            console.error(`Error fetching invoice with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async updateInvoiceById(req, res) {
        const id = parseInt(req.params.id, 10);
        const { client_id, invoice_date, total_amount, items, apply_tax } = req.body;

        if (!id || !client_id || !items || !Array.isArray(items)) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            await MySQLModel.beginTransaction();

            // 1. Actualizar Factura Principal
            // Nota: total_amount debe venir del frontend o recalcularse.
            await MySQLModel.updateById('invoice', id, {
                client_id,
                invoice_date,
                total_amount,
                apply_tax
                // STATUS no se cambia aquí (se usa endpoint específico)
            }, 'invoice_id');

            // 2. Eliminar items existentes (Estrategia: Drop & Recreate)
            // Usamos query directo porque deleteById es solo por ID primario
            await MySQLModel.execute('DELETE FROM invoice_details WHERE invoice_id = ?', [id]);

            // 3. Insertar nuevos items
            for (const item of items) {
                await MySQLModel.create('invoice_details', {
                    invoice_id: id,
                    description: item.description,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    total_row: item.total_row || (item.quantity * item.unit_price) // Fallback calculation
                });
            }

            await MySQLModel.commit();
            res.json({ message: "Invoice updated successfully" });

        } catch (error) {
            await MySQLModel.rollback();
            console.error(`Error updating invoice with id ${id}:`, error);
            res.status(500).json({ error: "Internal Server Error updating invoice" });
        }
    }

    /* Invoice_details Methods */

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
        const applyTax = invoiceData.apply_tax !== 0 && invoiceData.apply_tax !== false && invoiceData.apply_tax !== '0';
        const taxRate = applyTax ? '16%' : '0%';
        const taxValue = applyTax ? (invoiceData.tax || 0) : 0;

        worksheet.getCell(`A${totalsRow + 1}`).value = `I.V.A ${taxRate}`;
        worksheet.getCell(`A${totalsRow + 1}`).alignment = { horizontal: 'right' };
        worksheet.getCell(`F${totalsRow + 1}`).value = taxValue;
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

    static async exportInvoiceToPDF(req, res) {
        try {
            const invoiceData = req.body;

            // Crear documento PDF
            const doc = new PDFDocument({
                size: 'LETTER',
                margins: { top: 50, bottom: 50, left: 50, right: 50 }
            });

            // Headers para descarga
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=Factura_${(invoiceData.client_name || 'Cliente').replace(/\s+/g, '_')}.pdf`);

            // Pipe a response
            doc.pipe(res);

            // --- ENCABEZADO ---
            doc.fontSize(24).fillColor('#1E40AF').font('Helvetica-Bold').text('SUMINISTROS DEPOMED', 50, 50);
            doc.fontSize(10).fillColor('#374151').font('Helvetica-Bold').text('SUMINISTROS DEPOMED, C.A.', 350, 50, { align: 'right' });
            doc.fontSize(8).fillColor('#6B7280').font('Helvetica')
                .text('RIF: J-50123456-7', 350, 65, { align: 'right' })
                .text('Av. Principal de los Ruices, Caracas.', 350, 77, { align: 'right' })
                .text('Telf: 0212-1234567', 350, 89, { align: 'right' })
                .text('Email: contacto@depomed.com', 350, 101, { align: 'right' });

            // Línea separadora
            doc.moveTo(50, 130).lineTo(562, 130).strokeColor('#1F2937').lineWidth(2).stroke();

            // --- INFO FACTURA ---
            const controlNo = `CONTROL No: 00-${(invoiceData.invoice_id || Math.floor(Math.random() * 99999)).toString().padStart(5, '0')}`;
            doc.fontSize(11).fillColor('#DC2626').font('Helvetica-Bold').text(controlNo, 350, 145, { align: 'right' });
            doc.fontSize(10).fillColor('#000000').font('Helvetica-Bold').text(`Factura N. ${invoiceData.invoice_id || 'BORRADOR'}`, 350, 160, { align: 'right' });
            doc.fontSize(9).fillColor('#374151').font('Helvetica').text(`Fecha Emisión: ${invoiceData.invoice_date}`, 350, 175, { align: 'right' });

            // --- CLIENTE ---
            doc.fontSize(8).fillColor('#9CA3AF').font('Helvetica-Bold').text('CLIENTE:', 50, 200);
            doc.fontSize(12).fillColor('#1F2937').font('Helvetica-Bold').text(invoiceData.client_name || 'Particular', 50, 215);

            // --- TABLA DE ITEMS ---
            const tableTop = 260;
            const col1X = 50;   // Cantidad
            const col2X = 100;  // Ref
            const col3X = 150;  // Descripción
            const col4X = 380;  // Precio Unit
            const col5X = 460;  // % IVA
            const col6X = 510;  // Total

            // Header de tabla
            doc.rect(50, tableTop, 512, 25).fillColor('#1F2937').fill();
            doc.fontSize(9).fillColor('#FFFFFF').font('Helvetica-Bold');
            doc.text('CANT.', col1X + 5, tableTop + 8, { width: 45, align: 'center' });
            doc.text('REF.', col2X + 5, tableTop + 8, { width: 45, align: 'center' });
            doc.text('DESCRIPCIÓN', col3X + 5, tableTop + 8, { width: 225 });
            doc.text('P. UNIT', col4X + 5, tableTop + 8, { width: 75, align: 'right' });
            doc.text('% IVA', col5X + 5, tableTop + 8, { width: 45, align: 'center' });
            doc.text('TOTAL', col6X + 5, tableTop + 8, { width: 47, align: 'right' });

            // Items
            let currentY = tableTop + 30;
            doc.fillColor('#000000').font('Helvetica').fontSize(9);

            invoiceData.items.forEach((item, index) => {
                // Convertir a números para evitar errores con toFixed
                const quantity = Number(item.quantity);
                const unitPrice = parseFloat(item.unit_price);
                const rowTotal = item.total_row ? parseFloat(item.total_row) : (quantity * unitPrice);

                // Alternar colores de fondo
                if (index % 2 === 0) {
                    doc.rect(50, currentY - 5, 512, 20).fillColor('#F9FAFB').fill();
                }

                doc.fillColor('#000000');
                doc.text(quantity.toString(), col1X + 5, currentY, { width: 45, align: 'center' });
                doc.text('-', col2X + 5, currentY, { width: 45, align: 'center' });
                doc.text(item.description, col3X + 5, currentY, { width: 225 });
                const applyTax = invoiceData.apply_tax !== 0 && invoiceData.apply_tax !== false && invoiceData.apply_tax !== '0';

                doc.text(`$${unitPrice.toFixed(2)}`, col4X + 5, currentY, { width: 75, align: 'right' });
                doc.text(applyTax ? '16%' : '0%', col5X + 5, currentY, { width: 45, align: 'center' });
                doc.text(`$${rowTotal.toFixed(2)}`, col6X + 5, currentY, { width: 47, align: 'right' });

                currentY += 20;
            });

            // Línea separadora después de items
            currentY += 10;
            doc.moveTo(50, currentY).lineTo(562, currentY).strokeColor('#E5E7EB').lineWidth(1).stroke();

            // --- TOTALES ---
            currentY += 20;
            const totalsX = 400;

            // Convertir totales a números
            const applyTax = invoiceData.apply_tax !== 0 && invoiceData.apply_tax !== false && invoiceData.apply_tax !== '0';
            const subtotal = parseFloat(invoiceData.subtotal || invoiceData.total_amount || 0);
            const tax = applyTax ? parseFloat(invoiceData.tax || 0) : 0;
            const totalAmount = parseFloat(invoiceData.total_amount || 0);

            doc.fontSize(9).fillColor('#6B7280').font('Helvetica');
            doc.text('Base Imponible Bs.', totalsX, currentY, { width: 100, align: 'left' });
            doc.text(`$${subtotal.toFixed(2)}`, totalsX + 105, currentY, { width: 60, align: 'right' });

            currentY += 18;
            doc.text(applyTax ? 'I.V.A (16%)' : 'I.V.A (0%)', totalsX, currentY, { width: 100, align: 'left' });
            doc.text(`$${tax.toFixed(2)}`, totalsX + 105, currentY, { width: 60, align: 'right' });

            currentY += 18;
            doc.rect(totalsX, currentY - 5, 165, 25).fillColor('#F3F4F6').fill();
            doc.fontSize(11).fillColor('#000000').font('Helvetica-Bold');
            doc.text('TOTAL DOCUMENTO', totalsX + 5, currentY + 3, { width: 100, align: 'left' });
            doc.text(`$${totalAmount.toFixed(2)}`, totalsX + 110, currentY + 3, { width: 50, align: 'right' });

            // Finalizar PDF
            doc.end();

        } catch (error) {
            console.error('Error generando PDF:', error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Error al generar PDF', details: error.message });
            }
        }
    }
}