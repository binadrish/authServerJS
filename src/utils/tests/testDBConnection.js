// testConnection.js
import { dbClient } from '../config/dbConnector.js';

async function testConnection() {
  try {
    const result = await dbClient.execute('SELECT 1;');
    console.log('✅ Conexión exitosa:', result);
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

export default testConnection;

