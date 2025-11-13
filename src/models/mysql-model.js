import mysql from 'mysql2/promise'


const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Loki_2903',
    database: 'moondb'
})

if (!connection) {
    console.error("Failed to connect to the database")
    process.exit(1)
}

export class MySQLModel {
    constructor() {
        this.connection = connection
    }

    /**
     * Devuelve la misma forma que `connection.execute` ([rows, fields])
     * Nota: validar el nombre de la tabla para evitar inyección básica.
     */
    static getAll(table) {
        if (!/^[A-Za-z0-9_]+$/.test(table)) {
            throw new Error('Invalid table name')
        }
        return connection.execute(`SELECT * FROM \`${table}\``)
    }
}


