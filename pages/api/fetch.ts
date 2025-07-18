import type { NextApiRequest, NextApiResponse } from 'next';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  // Validate URL parameter
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ 
      error: 'URL parameter is required. Use ?url=https://example.com' 
    });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ 
      error: 'Invalid URL format' 
    });
  }

  let browser = null;

  try {
    // Launch browser with Chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // Set a reasonable timeout
    await page.setDefaultNavigationTimeout(30000);

    // Navigate to the URL
    await page.goto(url);

    // Get page title
    const title = await page.title();

    // Get page content
    const content = await page.content();


    const result = {
      url,
      title,
      content: content
    };

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch data from URL',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    // Always close the browser
    if (browser !== null) {
      await browser.close();
    }
  }
} 