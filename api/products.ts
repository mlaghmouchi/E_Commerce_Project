import type { VercelRequest, VercelResponse } from '@vercel/node';
import jsonServer from 'json-server';
import { products } from '../db.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    res.status(200).json(products);
  } catch (error: any) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error?.message || 'Unknown error' });
  }
}