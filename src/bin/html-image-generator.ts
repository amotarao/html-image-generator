#!/usr/bin/env node

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { generate } from '../main.js';

const run = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option('dir', {
      alias: 'd',
      type: 'string',
      demandOption: true,
    })
    .help().argv;

  await generate(argv);

  process.exit(process.exitCode);
};

run();
