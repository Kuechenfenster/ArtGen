import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Database connection check (simple)
app.get('/db/check', (req: Request, res: Response) => {
  if (DATABASE_URL) {
    res.json({ status: 'connected', database: 'configured', timestamp: new Date().toISOString() });
  } else {
    res.status(500).json({ status: 'error', error: 'DATABASE_URL not configured' });
  }
});

// Projects endpoints (mock for now)
app.get('/api/projects', (req: Request, res: Response) => {
  res.json({ projects: [], message: 'API connected - database integration pending' });
});

// Designers endpoints
app.get('/api/designers', (req: Request, res: Response) => {
  res.json({ designers: [], message: 'API connected' });
});

// Warning templates endpoints
app.get('/api/warnings', (req: Request, res: Response) => {
  res.json({ warnings: [], message: 'API connected' });
});

// Translation orders endpoints
app.get('/api/translations', (req: Request, res: Response) => {
  res.json({ translations: [], message: 'API connected' });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Database URL: ${DATABASE_URL ? 'configured' : 'not configured'}`);
});

export default app;
