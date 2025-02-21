import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

export const mysql2Trans = (path) => require(path)

export const transformSQL = (rowsPostgreSQL) => {
  const result = rowsPostgreSQL.rows.map((row) => {
    const { base64, ...rest } = row
    const base64String = Buffer.from(base64).toString()
    return { ...rest, base64String }
  })
  return result
}