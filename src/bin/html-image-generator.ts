import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import pLimit from 'p-limit';
import { ScreenshotOptions, Viewport } from 'puppeteer';
import { generate } from '../main.js';

const limit = pLimit(3);

type Options = {
  width: Viewport['width'];
  height: Viewport['height'];
  type: ScreenshotOptions['type'];
  quality: ScreenshotOptions['quality'];
};

const run = async () => {
  const rootDir = path.resolve(process.cwd());
  const dir = path.resolve(rootDir, 'example');

  const templateFile = path.resolve(dir, 'template.html');
  const assetsDir = path.resolve(dir, 'assets');
  const dataFile = path.resolve(dir, 'data.js');
  const optionsFile = path.resolve(dir, 'options.yaml');

  const template = (await fs.readFile(templateFile)).toString();
  const optionsYaml = (await fs.readFile(optionsFile)).toString();
  const options = yaml.load(optionsYaml) as Options;

  const { default: generateData } = await import(dataFile);
  const data = await generateData();
  const dataList = Array.isArray(data) ? data : [data];

  await Promise.all(
    dataList.map(({ dist, ...data }) =>
      limit(async () => {
        await generate({
          template,
          data,
          assetsDir,
          generateOptions: {
            viewport: { width: options.width, height: options.height },
            screenshotOptions: { type: options.type, quality: options.quality },
          },
          dist: path.resolve(rootDir, dist),
        });
      })
    )
  );

  process.exit(process.exitCode);
};

run();
