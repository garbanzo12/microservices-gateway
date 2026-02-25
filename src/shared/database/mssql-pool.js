// shared/database/mssql-pool.js (versión ODBC defensiva)
import sql from 'mssql/msnodesqlv8.js';
import { config } from '../config/index.js';

let pool = null;

const getPool = async () => {
  if (pool && pool.connected) return pool;

  try {
    const connectionString = `Driver={ODBC Driver 18 for SQL Server};Server=${config.database.server};Database=${config.database.name};Trusted_Connection=yes;Encrypt=yes;TrustServerCertificate=yes;`;

    pool = await sql.connect(connectionString);

    console.log('✅ Pool ODBC conectado (Trusted_Connection)');
    return pool;
  } catch (err) {
    console.error('❌ Error en pool ODBC:', err.message);
    throw err;
  }
};

export default getPool;