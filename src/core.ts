import path from 'path';
import pLimit from 'p-limit';
import { generate as generateHtml } from './modules/html-generator.js';
import { generate as generateImage, GenerateOptions as GenerateImageOptions } from './modules/image-generator.js';
import { closeServer, listenServer } from './modules/server.js';

export type CoreOptions = {
  template: string;
  data: {
    [key: string]: any;
    dist?: string;
  }[];
  baseDir: string;
  assetsDir: string;
  generateOptions: GenerateImageOptions;
  concurrency?: number;
  log?: boolean;
};

export const generate = async ({
  template,
  data,
  baseDir,
  assetsDir,
  generateOptions,
  concurrency = 3,
  log = false,
}: CoreOptions): Promise<(Buffer | string | undefined)[]> => {
  const limit = pLimit(concurrency);
  const port = await listenServer(assetsDir);

  const images = await Promise.all(
    data.map((d) =>
      limit(async () => {
        const filePath = 'dist' in d && d.dist ? path.resolve(baseDir, d.dist) : undefined;

        const html = generateHtml(template, { ...d, assetsDir: `http://localhost:${port}` });
        const image = await generateImage(html, {
          viewport: generateOptions.viewport,
          screenshotOptions: {
            ...generateOptions.screenshotOptions,
            path: filePath,
          },
        });

        if (filePath) {
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
