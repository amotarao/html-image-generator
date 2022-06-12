import { Browser, chromium, PageScreenshotOptions, ViewportSize } from 'playwright-core';

let launch: Promise<Browser> | null = null;

const launchBrowser = () => {
  if (launch === null) {
    launch = chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--font-render-hinting=none'],
    });
  }
  return launch;
};

export type GenerateOptions = {
  viewport: ViewportSize;
  screenshotOptions?: PageScreenshotOptions;
};

export const generate = async (html: string, options: GenerateOptions): Promise<Buffer> => {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.setViewportSize(options.viewport);
  await page.setContent(html, { waitUntil: 'networkidle' });

  const image = await page.screenshot(options.screenshotOptions);
  return image;
};
