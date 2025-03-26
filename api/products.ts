import type { VercelRequest, VercelResponse } from '@vercel/node';
import { products } from '../db.json';

<<<<<<< Updated upstream
<<<<<<< Updated upstream
export default function handler(req: VercelRequest, res: VercelResponse) {
=======
=======
>>>>>>> Stashed changes
// Create json-server instance
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Add middlewares
server.use(middlewares);

// Add rewrite rules
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}));

// Add router
server.use(router);

export default async function handler(req: VercelRequest, res: VercelResponse) {
>>>>>>> Stashed changes
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
    console.log('Products data:', products); // Log the products data
    if (!products || products.length === 0) {
      console.error('No products found in db.json');
      return res.status(404).json({ error: 'No products found' });
    }
    res.status(200).json(products);
  } catch (error) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    res.status(500).json({ error: 'Failed to fetch products' });
=======
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
>>>>>>> Stashed changes
=======
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
>>>>>>> Stashed changes
  }
}