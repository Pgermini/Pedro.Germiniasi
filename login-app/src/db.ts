import mysql from 'mysql2';  // Importando mysql2
import dotenv from 'dotenv';

dotenv.config();

// Criando o pool de conexões com o banco de dados
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,  // Esperar por conexões quando o pool estiver cheio
  connectionLimit: 10,       // Limitar o número de conexões no pool
  queueLimit: 0              // Sem limite para o número de requisições na fila
});

// Exportando a conexão do pool
export default db;
