// import express from 'express';
// import admin from 'firebase-admin';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { MongoClient } from 'mongodb';
// import { supabase } from './supaBaseclient.js';

// // Load environment variables
// dotenv.config();

// // Initialize Firebase Admin SDK
// const serviceAccount = {
//   type: 'service_account',
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//   token_uri: 'https://oauth2.googleapis.com/token',
//   auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
// });

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Set security headers
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   next();
// });

// // MongoDB connection
// const client = new MongoClient(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// client.connect()
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.log('Error connecting to MongoDB:', error));

// const db = client.db('COHESIONX');

// // Pass the database reference to routes
// app.use('/api', (req, res, next) => {
//   req.db = db;
//   next();
// });

// // Import and use routes
// import authRoutes from './api/login.js';

// app.use('/api', authRoutes);
// // app.use('/api', eventsGetRoutes);
// // app.use('/api', eventsPostRoutes);

// app.get('/admin-check', (req, res) => {
//   res.send('Firebase Admin is initialized');
// });

// app.listen(3000, () => {
//   console.log('Backend server running on port 3000');
// });


import express from 'express';
import loginRoutes from './api/routes/login.js';
import googleRoutes from './api/routes/google.js';
import userData from './api/routes/getuser.js'
import eventsData from './api/routes/events-get.js'
import eventsPost from './api/routes/events-post.js'
const app = express();
import cors from "cors";
app.use(express.json());

// app.use('/login', loginRoutes);
// app.use('/google', googleRoutes);

// Export the app correctly for Vercel serverless functions
// Enable CORS for all routes
app.use(
  cors({
    origin: "*", // 🔹 Allows all origins
    methods: "GET, POST, PUT, DELETE, OPTIONS", // 🔹 Allows all HTTP methods
    allowedHeaders: "*", // 🔹 Allows all headers
    credentials: true, // 🔹 Allow credentials (optional)
  })
);

app.use('/api',loginRoutes);
app.use('/api',googleRoutes);
app.use('/api',userData); 
app.use('/api',eventsData); 
app.use('/api',eventsPost); 

app.listen(3000,() => console.log('server listneing on port 3000'))
export default app;


