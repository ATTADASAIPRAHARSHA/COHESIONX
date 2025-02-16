import express from 'express';
import { supabase } from '../../supaBaseclient.js';

const router = express.Router();



router.get('/events-post', async (req, res) => {
  try {
    res.send('inserting event ....');
  } catch (error) {
    console.error('Error inserting event:', error);
    res.status(500).json({ message: 'Error inserting event' });
  }
});
router.post('/events-post', async (req, res) => {
  try {
    const { data, error } = await supabase.from('events').insert(req.body);
    if (error) throw error;

    console.log('Event inserted:', data);


    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error('Error inserting event:', error);
    res.status(500).json({ message: 'Error inserting event' });
  }
});

export default router;
