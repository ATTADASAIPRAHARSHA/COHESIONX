import express from 'express';
import admin from 'firebase-admin';
import { supabase } from '../supaBaseclient.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email , password } = req.body;
  
    const { data, error } = await supabase.auth.signUp({ email, password });
  
    if (error) return res.status(400).json({ error: error.message });
  
    return res.json({ message: "creating user successful", data });
  });

export default router;