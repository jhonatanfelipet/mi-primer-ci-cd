import express from 'express';
import pkg from 'pg';
import { createClient } from 'redis';

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a PostgreSQL
const db = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'miapp'
});

// Conexión a Redis
const redis = createClient({
  url: `redis://${process.env.REDIS_HOST || 'redis'}:6379`
});
redis.on('error', err => console.error('Error de Redis:', err));

await redis.connect();

// Endpoint de prueba
app.get('/', async (req, res) => {
  const visits = await redis.incr('visits');
  res.send(`Hola desde Node.js! Visitas: ${visits}`);
});

// Endpoint de salud
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
