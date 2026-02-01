import mysql from 'mysql2/promise';

const DB_CONFIG = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    multipleStatements: true  // Permitir múltiples consultas
};

async function initializeDatabase() {
    let connection;

    try {
        console.log('🔌 Conectando a MySQL...');
        connection = await mysql.createConnection(DB_CONFIG);

        console.log('✅ Conexión establecida');
        console.log('📦 Creando base de datos y tablas...\n');

        // 1. Crear base de datos
        await connection.query('CREATE DATABASE IF NOT EXISTS moondb DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
        console.log('✅ Base de datos "moondb" creada/verificada');

        // 2. Seleccionar base de datos
        await connection.query('USE moondb');

        // 3. Crear tabla users
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INT NOT NULL AUTO_INCREMENT,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role_id INT NOT NULL DEFAULT 1,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id),
                INDEX idx_email (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Tabla "users" creada');

        // 4. Crear tabla clients
        await connection.query(`
            CREATE TABLE IF NOT EXISTS clients (
                client_id INT NOT NULL AUTO_INCREMENT,
                client_name VARCHAR(150) NOT NULL,
                client_document_id VARCHAR(50) DEFAULT NULL,
                client_address TEXT DEFAULT NULL,
                client_phone VARCHAR(20) DEFAULT NULL,
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (client_id),
                INDEX idx_client_name (client_name),
                INDEX idx_is_active (is_active)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Tabla "clients" creada');

        // 5. Crear tabla invoice
        await connection.query(`
            CREATE TABLE IF NOT EXISTS invoice (
                invoice_id INT NOT NULL AUTO_INCREMENT,
                client_id INT NOT NULL,
                created_by_user_id INT NOT NULL,
                invoice_type ENUM('FACTURA', 'COTIZACION') NOT NULL DEFAULT 'FACTURA',
                invoice_status ENUM('PENDIENTE', 'PAGADA', 'ANULADA') NOT NULL DEFAULT 'PENDIENTE',
                total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
                invoice_date DATE NOT NULL,
                due_date DATE DEFAULT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (invoice_id),
                FOREIGN KEY (client_id) REFERENCES clients(client_id) ON DELETE RESTRICT ON UPDATE CASCADE,
                FOREIGN KEY (created_by_user_id) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
                INDEX idx_invoice_date (invoice_date),
                INDEX idx_invoice_status (invoice_status),
                INDEX idx_client_id (client_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Tabla "invoice" creada');

        // 6. Crear tabla invoice_details
        await connection.query(`
            CREATE TABLE IF NOT EXISTS invoice_details (
                detail_id INT NOT NULL AUTO_INCREMENT,
                invoice_id INT NOT NULL,
                description TEXT NOT NULL,
                quantity INT NOT NULL DEFAULT 1,
                unit_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (detail_id),
                FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id) ON DELETE CASCADE ON UPDATE CASCADE,
                INDEX idx_invoice_id (invoice_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Tabla "invoice_details" creada');

        // 7. Insertar datos de prueba
        console.log('\n📝 Insertando datos de prueba...');

        await connection.query(`
            INSERT IGNORE INTO users (user_id, full_name, email, password, role_id) 
            VALUES (1, 'Administrador', 'admin@moondb.com', '\$2y\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1)
        `);
        console.log('✅ Usuario de prueba insertado');

        await connection.query(`
            INSERT IGNORE INTO clients (client_id, client_name, client_document_id, client_address, client_phone, is_active) 
            VALUES (1, 'Cliente Ejemplo S.A.', 'J-12345678-9', 'Av. Principal, Caracas', '0212-1234567', 1)
        `);
        console.log('✅ Cliente de ejemplo insertado');

        // 8. Crear tabla de configuración de empresa
        await connection.query(`
            CREATE TABLE IF NOT EXISTS company_settings (
                setting_id INT NOT NULL AUTO_INCREMENT,
                company_name VARCHAR(150) NOT NULL DEFAULT 'SUMINISTROS DEPOMED',
                company_legal_name VARCHAR(150) NOT NULL DEFAULT 'SUMINISTROS DEPOMED, C.A.',
                company_tax_id VARCHAR(50) NOT NULL DEFAULT 'J-50123456-7',
                company_address TEXT NOT NULL,
                company_phone VARCHAR(20) DEFAULT '0212-1234567',
                company_email VARCHAR(100) DEFAULT 'contacto@depomed.com',
                company_logo_url TEXT DEFAULT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (setting_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Tabla "company_settings" creada');

        // Insertar configuración por defecto
        await connection.query(`
            INSERT IGNORE INTO company_settings (setting_id, company_name, company_legal_name, company_tax_id, company_address, company_phone, company_email)
            VALUES (1, 'SUMINISTROS DEPOMED', 'SUMINISTROS DEPOMED, C.A.', 'J-50123456-7', 'Av. Principal de los Ruices, Caracas.', '0212-1234567', 'contacto@depomed.com')
        `);
        console.log('✅ Configuración por defecto insertada');

        // 9. Crear tabla de gastos operativos
        await connection.query(`
            CREATE TABLE IF NOT EXISTS operational_expenses (
                expense_id INT NOT NULL AUTO_INCREMENT,
                expense_description VARCHAR(255) NOT NULL,
                expense_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
                expense_date DATE NOT NULL,
                expense_category VARCHAR(50) DEFAULT 'GENERAL',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (expense_id),
                INDEX idx_expense_date (expense_date)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✅ Tabla "operational_expenses" creada');

        console.log('\n✨ ¡Inicialización completada exitosamente!');
        console.log('📋 Tablas creadas: users, clients, invoice, invoice_details, company_settings, operational_expenses');
        console.log('👤 Usuario de prueba: admin@moondb.com (password: admin123)');
        console.log('🏢 Cliente de prueba: Cliente Ejemplo S.A.');

        await connection.end();

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.code) console.error('   Código:', error.code);
        if (connection) await connection.end();
        process.exit(1);
    }
}

initializeDatabase();
