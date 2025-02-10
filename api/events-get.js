// import express from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { supabase } from '../supaBaseclient.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK with environment variables

if(!admin.apps.length){
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
}

  
  export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
          return res.status(200).json(result);
        } catch (error) {
          console.error('Error fetching events:', error);
          return res.status(500).json({ message: 'Error fetching events' });
        }
      }
  }