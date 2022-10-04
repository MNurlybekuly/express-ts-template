import { Request, Response } from 'express'
import { sqlGenerateSelectQuery, sqlRequest } from '@helpers/sqlHelpers'
import { handleResponse } from '@helpers/handleResponse'

const tableName = 'ST_USER'
const tableFields = ['USE_CODE', 'USE_NAME']

export const getUsersList = async (_req: Request, res: Response) => {
  try {
    const sqlQuery = sqlGenerateSelectQuery(tableFields, tableName)
    const list = await sqlRequest(sqlQuery)
    res.send(handleResponse(true, 'successfully handled', list))
  } catch (e: any) {
    res.send(handleResponse(false, e.message || 'unsuccessfully handled'))
  }
}

export const getSpecificUser = async (req: Request, res: Response) => {
  try {
    if (!req.params.id.match('^[0-9]+$')) {
      throw new Error('invalid id provided')
    }

    const sqlQuery = sqlGenerateSelectQuery(tableFields, tableName, `USE_CODE = ${req.params.id}`)
    const user = await sqlRequest(sqlQuery)

    if (user.length === 0) {
      throw new Error('user does not exists')
    }

    res.send(handleResponse(true, 'successfully handled', user[0]))
  } catch (e: any) {
    res.send(handleResponse(false, e.message || 'unsuccessfully handled'))
  }
}
