import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/fetch?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch data');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>URL Data Fetcher</title>
        <meta name="description" content="Fetch data from any URL using Puppeteer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              URL Data Fetcher
            </h1>
            <p className="text-lg text-gray-600">
              Fetch metadata and content from any URL using Puppeteer
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL (e.g., https://example.com)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Fetching...' : 'Fetch Data'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Results</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">URL</h3>
                  <p className="text-gray-600 break-all">{result.url}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Title</h3>
                  <p className="text-gray-600">{result.title}</p>
                </div>
                {result.metaDescription && (
                  <div>
                    <h3 className="font-medium text-gray-900">Meta Description</h3>
                    <p className="text-gray-600">{result.metaDescription}</p>
                  </div>
                )}
                {result.ogTitle && (
                  <div>
                    <h3 className="font-medium text-gray-900">Open Graph Title</h3>
                    <p className="text-gray-600">{result.ogTitle}</p>
                  </div>
                )}
                {result.ogDescription && (
                  <div>
                    <h3 className="font-medium text-gray-900">Open Graph Description</h3>
                    <p className="text-gray-600">{result.ogDescription}</p>
                  </div>
                )}
                {result.ogImage && (
                  <div>
                    <h3 className="font-medium text-gray-900">Open Graph Image</h3>
                    <img 
                      src={result.ogImage} 
                      alt="OG Image" 
                      className="max-w-xs rounded"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900">Content Preview</h3>
                  <p className="text-gray-600 text-sm">{result.content}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Timestamp</h3>
                  <p className="text-gray-600 text-sm">{result.timestamp}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 