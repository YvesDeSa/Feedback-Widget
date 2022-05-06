import "reflect-metadata";
import express from 'express';
import cors from 'cors';

import { routes } from './Routes';

import "./shared/container"

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 HTTP server running in port 3333!');
});