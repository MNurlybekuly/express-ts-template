import sql from 'mssql';
import { sqlConfig } from '@config/sqlConfig';

export const sqlRequest = async () => {
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from table`;
    return result;
};
