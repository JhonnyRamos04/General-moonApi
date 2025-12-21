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
     * Nota para mi: validar el nombre de la tabla para evitar inyección básica.
     */

    static getAll(table) {
        if (!/^[A-Za-z0-9_]+$/.test(table)) {
            throw new Error('Invalid table name')
        }
        return connection.execute(`SELECT * FROM \`${table}\``)
    }

    static getByid(table, id) {
        if (!/^[A-Za-z0-9_]+$/.test(table)) {
            throw new Error('Invalid table name')
        }
        return connection.execute(`SELECT * FROM \`${table}\` WHERE id = ?`, [id])
    }

    static updateById(table, id, data) {
        if (!/^[A-Za-z0-9_]+$/.test(table)) {
            throw new Error('Invalid table name')
        }
        const fields = Object.keys(data).map(key => `\`${key}\` = ?`).join(', ')
        const values = Object.values(data)
        values.push(id)
        return connection.execute(`UPDATE \`${table}\` SET ${fields} WHERE id = ?`, values)
    }

    static deleteById(table, id) {
        if (!/^[A-Za-z0-9_]+$/.test(table)) {
            throw new Error('Invalid table name')
        }
        return connection.execute(`DELETE FROM \`${table}\` WHERE id = ?`, [id])
    }

    static create(table, data) {
        if (!/^[A-Za-z0-9_]+$/.test(table)) {
            throw new Error('Invalid table name')
        }
        const fields = Object.keys(data).map(key => `\`${key}\``).join(', ')
        const placeholders = Object.keys(data).map(() => '?').join(', ')
        const values = Object.values(data)
        return connection.execute(`INSERT INTO \`${table}\` (${fields}) VALUES (${placeholders})`, values)
    }


}


