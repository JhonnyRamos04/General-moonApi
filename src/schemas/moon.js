import z from "zod";

const ProductSchema = z.object({
    product_name: z.string(),
    product_code: z.string(),
    price: z.number(),
    stock_quantity: z.number(),
    description: z.string().optional(),
})

const ClientSchema = z.object({
    client_name: z.string(),
    client_document_id: z.string(),
    client_phone: z.string(),
    client_address: z.string().optional(),
})

const ConfigsSchema = z.object({
    setting_key: z.string(),
    setting_value: z.string(),
    description: z.string().optional(),
})
