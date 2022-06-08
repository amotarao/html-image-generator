import puppeteer, { Browser, ScreenshotOptions, Viewport } from 'puppeteer';

let launch: Promise<Browser> | null = null;

const launchBrowser = () => {
  if (launch === null) {
    launch = puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--font-render-hinting=none'],
    });
  }
  return launch;
};

export type GenerateOptions = {
  viewport: Viewport;
  screenshotOptions?: ScreenshotOptions;
};

export const generate = async (html: string, options: GenerateOptions): Promise<string | Buffer> => {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.setViewport(options.viewport);
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const image = await page.screenshot(options.screenshotOptions);
  return image;
};
