import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import connectDB from './config/db.js';
import leadRoutes from './routes/leadRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import SiteContent from './models/SiteContent.js';
import Admin from './models/Admin.js';
import { defaultContent } from './controllers/contentController.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const defaultPort = process.env.PORT || 5000;

// Auto-seed database with default content and admin on startup
const seedInitialData = async () => {
  try {
    const contentCount = await SiteContent.countDocuments();
    if (contentCount === 0) {
      await SiteContent.create(defaultContent);
      console.log('🌱 Default TezScale site content seeded successfully into MongoDB');
    }

    const admin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (!admin) {
      await Admin.create({
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin@123',
      });
      console.log('👤 Default Admin seeded: admin@gmail.com / admin@123');
    }
  } catch (err) {
    console.warn('Initial data seeding note:', err.message);
  }
};

// Connect to Database
connectDB().then(() => {
  seedInitialData();
});

// Middlewares
app.use(compression());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/content', contentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Tezscale Backend Server is running smoothly!',
    renderUrl: 'https://tezscale.onrender.com',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend build if exists (for unified production deployment on Render)
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDist)) {
  console.log(`📦 Serving production frontend build from: ${frontendDist}`);
  app.use(express.static(frontendDist));
  
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  // Root endpoint when running API standalone in dev
  app.get('/', (req, res) => {
    res.send('Tezscale API is running...');
  });
}

// Resilient server startup
const startServer = (port) => {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
      const nextPort = Number(port) === 5000 ? 5005 : Number(port) + 1;
      console.warn(`⚠️ Port ${port} is unavailable (${err.code}). Trying fallback port ${nextPort}...`);
      startServer(nextPort);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(defaultPort);


