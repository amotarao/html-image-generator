import { Server } from 'http';
import express from 'express';

const app = express();

let server: Server | null = null;

export const listenServer = (assetsDir: string) =>
  new Promise<number>((resolve) => {
    app.use(express.static(assetsDir));
    server = app.listen(() => {
      const address = server?.address();
      const port = typeof address !== 'string' ? address?.port ?? 0 : 0;
      resolve(port);
    });
  });

export const closeServer = () =>
  new Promise<void>((resolve) => {
    server?.close(() => resolve());
  });
