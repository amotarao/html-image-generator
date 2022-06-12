import { promises as fs } from 'fs';
import path from 'path';
import pLimit from 'p-limit';
import { generate as generateHtml } from './modules/html-generator.js';
import { generate as generateImage, GenerateOptions as GenerateImageOptions } from './modules/image-generator.js';
import { closeServer, listenServer } from './modules/server.js';

const limit = pLimit(3);

type CoreOptions = {
  template: string;
  data: {
    [key: string]: any;
    dist?: string;
  }[];
  baseDir: string;
  assetsDir: string;
  generateOptions: GenerateImageOptions;
  log?: boolean;
};

export const generate = async ({
  template,
  data,
  baseDir,
  assetsDir,
  generateOptions,
  log = false,
}: CoreOptions): Promise<(Buffer | string | undefined)[]> => {
  const port = await listenServer(assetsDir);

  const images = await Promise.all(
    data.map((d) =>
      limit(async () => {
        const html = generateHtml(template, { ...d, assetsDir: `http://localhost:${port}` });
        const image = await generateImage(html, generateOptions);

        if ('dist' in d && d.dist) {
          const file = path.resolve(baseDir, d.dist);
          await fs.writeFile(file, image);
          log && console.log(`✔︎ Generated: ${d.dist}`);
          return;
        }

        return image;
      })
    )
  );

  await closeServer();

  return images;
};
