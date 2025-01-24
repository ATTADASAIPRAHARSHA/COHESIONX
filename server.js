import express from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK with environment variables
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const app = express();

// Enable CORS for all domains or specify certain domains
app.use(cors());
app.use(express.json());

// Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

const db = client.db('COHESIONX');
const rolesCollection = db.collection('User');
const Eventscollection = db.collection('Events');

app.get('/admin-check', (req, res) => {
  res.send('Firebase Admin is initialized');
});


app.post('/api-auth', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });
  }

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email; 

    const user = await rolesCollection.findOne({ email: email });
    if (user) {
      // console.log(user.org)
      return res.json({ message: 'User found', user:user  });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid Firebase ID token' });
  }
});

app.get('/Events',async (req,res)=>{
  const result = await Eventscollection.find().toArray()
  res.json(result)
})
app.post('/Events',async(req,res)=>{
  const result = await Eventscollection.insertOne(req.body)

  res.status(400)

})

// Start the Express server
app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
