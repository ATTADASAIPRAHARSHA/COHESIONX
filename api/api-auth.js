import express from 'express';
import admin from 'firebase-admin';
import { supabase } from '../supaBaseclient.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email , password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  return res.json({ message: "Login successful", data });
});

router.post('/signup', async (req, res) => {
  const { email , password } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  return res.json({ message: "creating user successful", data });
});

    router.post('/google', async (req, res) => {
      const { provider} = req.body;

      if (provider !== "google") {
        return res.status(400).json({ error: "Invalid provider, use 'google'" });
      }

      const { data, error } = await supabase.auth.signInWithOAuth({ provider : 'google' });

      if (error) return res.status(400).json({ error: error.message });

      return res.json({ message: "Redirect to Google login", url: data.url });
    });

  router.post('/google', async (req, res) => {
    const { provider} = req.body;

    if (provider !== "google") {
      return res.status(400).json({ error: "Invalid provider, use 'google'" });
    }

    const { data, error } = await supabase.auth.signInWithOAuth({ provider : 'google' });

    if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: "Redirect to Google login", url: data.url });
  });

export default router;
