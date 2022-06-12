import { promises as fs } from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import yaml from 'js-yaml';
import { PageScreenshotOptions, ViewportSize } from 'playwright-core';
import * as core from './core.js';

type Options = {
  dir: string;
};

type TemplateOptions = {
  width: ViewportSize['width'];
  height: ViewportSize['height'];
  type?: PageScreenshotOptions['type'];
  quality?: PageScreenshotOptions['quality'];
  omitBackground?: PageScreenshotOptions['omitBackground'];
  concurrency?: number;
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
      viewport: {
        width: options.width,
        height: options.height,
      },
      screenshotOptions: {
        type: options.type,
        quality: options.quality,
        omitBackground: options.omitBackground,
      },
    },
    concurrency: options.concurrency,
  };
};

export const generate = async ({ dir }: Options): Promise<void> => {
  const options = await buildOptions(dir);
  await core.generate({
    ...options,
    log: true,
  });
};

export const dev = async ({ dir }: Options): Promise<void> => {
  const rootDir = path.resolve(process.cwd());
  const baseDir = path.resolve(rootDir, dir);

  const callback = async () => {
    const options = await buildOptions(dir);
    const data = options.data.slice(0, 1);
    const distFile = path.resolve(baseDir, `_dev.${options.generateOptions.screenshotOptions?.type ?? 'png'}`);
    data[0].dist = distFile;

    await core.generate({
      ...options,
      data: options.data.slice(0, 1),
    });
    console.log(`✔︎ Generated: ${distFile}`);
  };

  callback();
  chokidar
    .watch(baseDir, {
      depth: 99,
      ignored: /(^|\/)_dev\.(jpeg|png|webp)$/,
    })
    .on('change', callback);
};
