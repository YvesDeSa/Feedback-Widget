import express from 'express';
import { json } from 'stream/consumers';

const app = express();

app.get('/users', (request, response) => {
  return response.json({

  })
});

app.listen(3333, () => {
  console.log('🚀 HTTP server running in port 3333!');
});