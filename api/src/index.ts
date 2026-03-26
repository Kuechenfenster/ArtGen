import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Database connection check
app.get('/db/check', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    res.json({ status: 'connected', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: 'error', error: (error as Error).message });
  }
});

// Projects endpoints
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/api/projects/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const { project_code, name, sku, brand, target_markets, deadline, status } = req.body;
    const result = await pool.query(
      `INSERT INTO projects (project_code, name, sku, brand, target_markets, deadline, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [project_code, name, sku, brand, target_markets, deadline, status || 'In Progress']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Designers endpoints
app.get('/api/designers', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM designers ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Warning templates endpoints
app.get('/api/warnings', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM warning_templates ORDER BY code');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Translation orders endpoints
app.get('/api/translations', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM translation_orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Database URL: ${process.env.DATABASE_URL ? 'configured' : 'not configured'}`);
});

export default app;
