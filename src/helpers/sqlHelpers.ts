import sql from 'mssql'
import { sqlConfig } from '@config/sqlConfig'

export const sqlRequest = async (query: string): Promise<any> => {
  await sql.connect(sqlConfig.db)
  const result = await sql.query(query)
  return result.recordsets[0]
}

export const sqlGenerateSelectQuery = (fields: string[], table: string, condition?: string): string => {
  let selectQuery = `SELECT ${fields.join(', ')} FROM ${table}`

  if (condition !== undefined) {
    selectQuery = `${selectQuery} WHERE ${condition}`
  }

  return selectQuery
}
