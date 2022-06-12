import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { ScreenshotOptions, Viewport } from 'puppeteer';
import * as core from './core.js';

type Options = {
  dir: string;
};

type TemplateOptions = {
  width: Viewport['width'];
  height: Viewport['height'];
  type: ScreenshotOptions['type'];
  quality: ScreenshotOptions['quality'];
};

const buildOptions = async (dir: string): Promise<core.CoreOptions> => {
  const rootDir = path.resolve(process.cwd());
  const baseDir = path.resolve(rootDir, dir);

  const templateFile = path.resolve(baseDir, 'template.html');
  const assetsDir = path.resolve(baseDir, 'assets');
  const dataFile = path.resolve(baseDir, 'data.js');
  const optionsFile = path.resolve(baseDir, 'options.yaml');

  const template = (await fs.readFile(templateFile)).toString();
  const optionsYaml = (await fs.readFile(optionsFile)).toString();
  const options = yaml.load(optionsYaml) as TemplateOptions;

  const { default: generateData } = await import(dataFile);
  const data = typeof generateData === 'function' ? await generateData() : generateData;

  const dataList = Array.isArray(data) ? data : [data];

  return {
    template,
    data: dataList,
    baseDir,
    assetsDir,
    generateOptions: {
      viewport: { width: options.width, height: options.height },
      screenshotOptions: { type: options.type, quality: options.quality },
    },
  };
};

export const generate = async ({ dir }: Options): Promise<void> => {
  const options = await buildOptions(dir);
  await core.generate({
    ...options,
    log: true,
  });
};
