import sql from 'mssql';

async function testConnection() {
  try {
    const pool = await sql.connect({
      user: 'app_microservice',           // prueba con usuario SQL si ya lo creaste
      password: 'TuContraseñaSegura2025!',
      server: '10.150.205.207',
      database: 'DBGERH_Talent',
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    });

    console.log('✅ Conexión exitosa!');
    const result = await pool.request().query('SELECT TOP 1 * FROM dbo.CecoName');
    console.log('Primer registro:', result.recordset[0]);

    await pool.close();
  } catch (err) {
    console.error('❌ Falló la conexión:', err.message);
    console.error(err.stack);
  }
}

testConnection();
