
    static async exportInvoiceToPDF(req, res) {
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
        const rowTotal = item.total_row || (item.quantity * item.unit_price);

        // Alternar colores de fondo
        if (index % 2 === 0) {
            doc.rect(50, currentY - 5, 512, 20).fillColor('#F9FAFB').fill();
        }

        doc.fillColor('#000000');
        doc.text(item.quantity.toString(), col1X + 5, currentY, { width: 45, align: 'center' });
        doc.text('-', col2X + 5, currentY, { width: 45, align: 'center' });
        doc.text(item.description, col3X + 5, currentY, { width: 225 });
        doc.text(`$${item.unit_price.toFixed(2)}`, col4X + 5, currentY, { width: 75, align: 'right' });
        doc.text('16%', col5X + 5, currentY, { width: 45, align: 'center' });
        doc.text(`$${rowTotal.toFixed(2)}`, col6X + 5, currentY, { width: 47, align: 'right' });

        currentY += 20;
    });

    // Línea separadora después de items
    currentY += 10;
    doc.moveTo(50, currentY).lineTo(562, currentY).strokeColor('#E5E7EB').lineWidth(1).stroke();

    // --- TOTALES ---
    currentY += 20;
    const totalsX = 400;

    doc.fontSize(9).fillColor('#6B7280').font('Helvetica');
    doc.text('Base Imponible Bs.', totalsX, currentY, { width: 100, align: 'left' });
    doc.text(`$${(invoiceData.subtotal || invoiceData.total_amount).toFixed(2)}`, totalsX + 105, currentY, { width: 60, align: 'right' });

    currentY += 18;
    doc.text('I.V.A (16%)', totalsX, currentY, { width: 100, align: 'left' });
    doc.text(`$${(invoiceData.tax || 0).toFixed(2)}`, totalsX + 105, currentY, { width: 60, align: 'right' });

    currentY += 18;
    doc.rect(totalsX, currentY - 5, 165, 25).fillColor('#F3F4F6').fill();
    doc.fontSize(11).fillColor('#000000').font('Helvetica-Bold');
    doc.text('TOTAL DOCUMENTO', totalsX + 5, currentY + 3, { width: 100, align: 'left' });
    doc.text(`$${(invoiceData.total_amount || 0).toFixed(2)}`, totalsX + 110, currentY + 3, { width: 50, align: 'right' });

    // Finalizar PDF
    doc.end();
}
}
