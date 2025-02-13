import express from 'express';
import { supabase } from '../supaBaseclient.js';

const router = express.Router();

router.get('/events-get', async (req, res) => {
  try {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

export default router;
