#!/usr/bin/env node

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import * as main from '../main.js';

const run = async () => {
  await yargs(hideBin(process.argv))
    .command(
      'generate [dir]',
      'generate images',
      (yargs) => {
        return yargs.positional('dir', {
          alias: 'd',
          type: 'string',
          demandOption: true,
        });
      },
      async (options) => {
        await main.generate(options);
        process.exit(process.exitCode);
      }
    )
    .command(
      'dev [dir]',
      'dev images',
      (yargs) => {
        return yargs.positional('dir', {
          alias: 'd',
          type: 'string',
          demandOption: true,
        });
      },
      async (options) => {
        await main.dev(options);
      }
    )
    .help()
    .parse();
};

run();
