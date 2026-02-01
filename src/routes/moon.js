import { MoonController } from "../controllers/moon.js"
import { CompanySettingsController } from "../controllers/companySettings.js"
import { ExpensesController } from "../controllers/expenses.js"
import { Router } from "express"


export const createMoonRouter = () => {
    const moonRouter = Router()
    const moonController = new MoonController()

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

    /* Invoices */
    moonRouter.get("/invoices", MoonController.getAllInvoices)
    moonRouter.post("/invoices", MoonController.createInvoice)
    moonRouter.get("/invoices/:id", MoonController.getInvoiceById)
    moonRouter.put("/invoices/:id", MoonController.updateInvoiceById)

    /* Invoice_details */
    moonRouter.get("/invoice_details", MoonController.getAllInvoiceDetails)
    moonRouter.post("/invoice_details", MoonController.createInvoiceDetail)
    moonRouter.get("/invoice_details/:id", MoonController.getInvoiceDetailById)
    moonRouter.put("/invoice_details/:id", MoonController.updateInvoiceDetailById)

    /* Export Excel */
    moonRouter.post("/export-excel", MoonController.exportInvoiceToExcel)

    /* Export PDF */
    moonRouter.post("/export-pdf", MoonController.exportInvoiceToPDF)

    /* Company Settings */
    moonRouter.get("/company-settings", CompanySettingsController.getSettings)
    moonRouter.post("/company-settings", CompanySettingsController.updateSettings)

    /* Operational Expenses */
    moonRouter.get("/operational-expenses", ExpensesController.getAllExpenses)
    moonRouter.post("/operational-expenses", ExpensesController.createExpense)
    moonRouter.delete("/operational-expenses/:id", ExpensesController.deleteExpense)

    return moonRouter
}
