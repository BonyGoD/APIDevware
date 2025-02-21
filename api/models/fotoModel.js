import { transformSQL } from '../utils.js'
import { randomUUID } from 'node:crypto'
import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const postgreSQL = await pool.connect()

export class FotoModel {
  static async getAll() {

    const rowsPostgreSQL = await postgreSQL.query('SELECT * from fotos')

    const result = transformSQL(rowsPostgreSQL)

    return result
  }

  static async getByCategory({ categoria }) {
    const rowsPostgreSQL = await postgreSQL.query(
      'SELECT * FROM fotos WHERE categoria = $1',
      [categoria]
    )

    const result = transformSQL(rowsPostgreSQL)

    return result
  }

  static async getByID({ id }) {
    const rowsPostgreSQL = await postgreSQL.query(
      'SELECT * FROM fotos WHERE id = $1',
      [id]
    )

    const result = transformSQL(rowsPostgreSQL)

    return result
  }

  static async create({ input }) {
    const nuevaFoto = {
      id: randomUUID(),
      ...input,
    }

    const result = await postgreSQL.query(
      'INSERT INTO fotos (id, nombre, extension, base64, categoria) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [nuevaFoto.id, nuevaFoto.nombre, nuevaFoto.extension, nuevaFoto.base64, nuevaFoto.categoria]
    )
    const insertedRecord = result.rows[0];
    return insertedRecord
  }

  static async update({ id, input }) {
    const keys = Object.keys(input);
    const values = Object.values(input);
    const setString = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
  
    await postgreSQL.query(`UPDATE fotos SET ${setString} WHERE id = $1`, [id, ...values]);
    return { id, ...input };
  }

  static async delete({ id }) {
    const result = await postgreSQL.query('DELETE FROM fotos WHERE id = $1', [id])
    return result.rowCount > 0
  }
}
