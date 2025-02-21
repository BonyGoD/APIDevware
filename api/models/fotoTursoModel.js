import { randomUUID } from 'node:crypto'
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config()

const tursoDB = createClient({
  url: 'libsql://fotosdb-bonygod.turso.io',
  authToken: process.env.DB_TOKEN,
})

export class FotoTursoModel {
  static async getAll () {
    const [fotos] = await tursoDB.execute('SELECT * FROM fotos')
    return fotos
  }

  static async getByID ({ id }) {
    const [fotos] = await tursoDB.execute('SELECT * FROM fotos WHERE id = ?', [id])
    return fotos
  }

  static async create ({ input }) {
    const nuevaFoto = {
      id: randomUUID(),
      ...input
    }
    const [result] = await tursoDB.execute('INSERT INTO fotos SET ?', [nuevaFoto])
    return { id: result.id, ...input }
  }

  static async delete ({ id }) {
    const [result] = await tursoDB.execute('DELETE FROM fotos WHERE id = ?', [id])
    return result.affectedRows > 0
  }

  static async update ({ id, input }) {
    await tursoDB.execute('UPDATE fotos SET ? WHERE id = ?', [input, id])
    return { id, ...input }
  }
}
