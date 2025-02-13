import express from 'express';
import loginRoutes from './login.js';
import googleRoutes from './google.js';

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/google', googleRoutes);

// Export the app correctly for Vercel serverless functions
export default app;
