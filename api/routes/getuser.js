import express from 'express';
import admin from 'firebase-admin';
import { supabase } from '../../supaBaseclient.js';

const router = express.Router();

router.get('/getuser', async (req, res) => {

  const { data , error } = await supabase.auth.getUser();

//   if (error) return res.status(400).json({ error: error.message });

    return res.json({ message: "Login successful", data });
});

export default router;