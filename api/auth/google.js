import express from 'express';
import admin from 'firebase-admin';
import { supabase } from '../../supaBaseclient.js';

const router = express.Router();

export default async function handler (req, res)  {
    const { provider} = req.body;

    if (provider !== "google") {
      return res.status(400).json({ error: "Invalid provider, use 'google'" });
    }

    const { data, error } = await supabase.auth.signInWithOAuth({ provider : 'google' });

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: "Redirect to Google login", url: data.url });
  };

// export default router;