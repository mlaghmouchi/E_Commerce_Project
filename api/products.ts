import type { VercelRequest, VercelResponse } from '@vercel/node';
const jsonServer = require('json-server');
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Use json-server router to handle the request
    const result = await new Promise((resolve, reject) => {
      router.render(req, res, (err: Error | null, result: any) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error?.message || 'Unknown error' });
  }
}; 