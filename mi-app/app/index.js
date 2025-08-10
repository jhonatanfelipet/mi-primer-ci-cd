const express = require('express');
const { checkHealth } = require('./health');
const logger = require('./simple-logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para logging simple
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Ruta health
app.get('/health', (req, res) => {
  const health = checkHealth();
  logger.info('Health check realizado');
  res.json(health);
});

// Ruta principal (ejemplo)
app.get('/', (req, res) => {
  res.send('¡Hola desde mi app Node.js!');
});

app.listen(PORT, () => {
  logger.info(`Servidor escuchando en puerto ${PORT}`);
});
