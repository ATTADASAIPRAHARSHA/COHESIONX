import express from 'express';
import loginRoutes from './login.js';
import googleRoutes from './google.js';
import { createServerlessHandler } from '../../serverlessHandler.js'; // Helper function

const app = express();
app.use(express.json());

// Mount routes
app.use('/login', loginRoutes);
app.use('/google', googleRoutes);

// Export as a Vercel serverless function
export default app;
