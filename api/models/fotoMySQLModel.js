import { mysql2Trans } from '../utils.js'
import { randomUUID } from 'node:crypto'
import dotenv from 'dotenv'

dotenv.config()

const mysql2 = mysql2Trans('mysql2/promise')

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'grifolls',
}

const mySQLDB = await mysql2.createConnection(config)

export class FotoMySQLModel {
  static async getAll () {
    const [fotos] = await mySQLDB.query('SELECT * FROM fotos')
    return fotos
  }

  static async getByID ({ id }) {
    const [fotos] = await mySQLDB.query('SELECT * FROM fotos WHERE id = ?', [id])
    return fotos
  }

  static async create ({ input }) {
    const nuevaFoto = {
      id: randomUUID(),
      ...input
    }
    const [result] = await mySQLDB.query('INSERT INTO fotos SET ?', [nuevaFoto])
    return { id: result.id, ...input }
  }

  static async delete ({ id }) {
    const [result] = await mySQLDB.query('DELETE FROM fotos WHERE id = ?', [id])
    return result.affectedRows > 0
  }

  static async update ({ id, input }) {
    await mySQLDB.query('UPDATE fotos SET ? WHERE id = ?', [input, id])
    return { id, ...input }
  }
}
