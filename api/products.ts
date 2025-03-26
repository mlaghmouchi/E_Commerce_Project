import type { VercelRequest, VercelResponse } from '@vercel/node';
import { products } from '../db.json';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json(products);
}