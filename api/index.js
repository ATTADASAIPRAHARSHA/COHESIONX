import express from 'express';
import loginRoutes from './routes/login.js';
import googleRoutes from './routes/google.js';

const app = express();
app.use(express.json());

// app.use('/login', loginRoutes);
// app.use('/google', googleRoutes);

// Export the app correctly for Vercel serverless functions


app.use('/',loginRoutes);
app.use('/',googleRoutes);

// app.listen(3000,() => console.log('server listneing on port 3000'))
export default app;


