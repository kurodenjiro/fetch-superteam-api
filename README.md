# URL Data Fetcher API

A Next.js API that fetches data from any URL using Puppeteer and Chromium. This API can extract page titles, meta descriptions, Open Graph data, and content from web pages.

## Features

- 🕷️ **Puppeteer Integration**: Uses Puppeteer with Chromium for reliable web scraping
- 📊 **Rich Data Extraction**: Extracts titles, meta descriptions, Open Graph tags, and content
- 🔒 **URL Validation**: Validates URLs before processing
- ⚡ **Fast Response**: Optimized for quick data extraction
- 🎨 **Modern UI**: Clean, responsive interface for testing the API

## API Endpoint

### GET `/api/fetch`

Fetches data from a specified URL.

**Query Parameters:**
- `url` (required): The URL to fetch data from

**Example:**
```
GET /api/fetch?url=https://example.com
```

**Response:**
```json
{
  "url": "https://example.com",
  "title": "Example Domain",
  "metaDescription": "This domain is for use in illustrative examples...",
  "ogTitle": "Example Domain",
  "ogDescription": "This domain is for use in illustrative examples...",
  "ogImage": "https://example.com/image.jpg",
  "content": "<!DOCTYPE html><html>...",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Web Interface
1. Open the application in your browser
2. Enter a URL in the input field
3. Click "Fetch Data" to see the extracted information

### API Usage
```bash
curl "http://localhost:3000/api/fetch?url=https://example.com"
```

### JavaScript Example
```javascript
const response = await fetch('/api/fetch?url=https://example.com');
const data = await response.json();
console.log(data);
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (missing or invalid URL)
- `405`: Method Not Allowed (only GET requests are supported)
- `500`: Internal Server Error

## Dependencies

- **Next.js**: React framework for the API and frontend
- **Puppeteer Core**: Headless browser automation
- **@sparticuz/chromium**: Chromium binary for serverless environments
- **Tailwind CSS**: Utility-first CSS framework for styling

## Deployment

This application is optimized for deployment on serverless platforms like Vercel, Netlify, or AWS Lambda. The Chromium binary is specifically configured for serverless environments.

### Environment Variables
No environment variables are required for basic functionality.

## Security Considerations

- The API validates URLs before processing
- Content is limited to prevent excessive memory usage
- Browser instances are properly closed after each request
- Timeouts are set to prevent hanging requests

## License

MIT License - feel free to use this project for your own applications. 