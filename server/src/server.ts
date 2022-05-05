import "reflect-metadata";
import express from 'express';
import { routes } from './Routes';

import "./shared/container"

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 HTTP server running in port 3333!');
});