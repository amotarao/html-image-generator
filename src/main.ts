import { promises as fs } from 'fs';
import { generate as generateHtml } from './html-generator.js';
import { generate as generateImage, GenerateOptions as GenerateImageOptions } from './image-generator.js';
import { closeServer, listenServer } from './server.js';

type GenerateOptions = {
  template: string;
  data: any;
  assetsDir: string;
  generateOptions: GenerateImageOptions;
  dist: string;
};

export const generate = async ({
  template,
  data,
  assetsDir,
  generateOptions,
  dist,
}: GenerateOptions): Promise<void> => {
  const port = await listenServer(assetsDir);

  const html = generateHtml(template, { ...data, assetsDir: `http://localhost:${port}` });
  const image = await generateImage(html, generateOptions);
  await fs.writeFile(dist, image);

  await closeServer();
};
