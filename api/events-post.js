import express from 'express';
import { supabase } from '../supaBaseclient.js';

const router = express.Router();

router.post('/events-post', async (req, res) => {
  try {
    const { data, error } = await supabase.from('events').insert(req.body);
    if (error) throw error;

    console.log('Event inserted:', data);

    // Save event to MongoDB
    const EventsCollection = req.db.collection('Events');
    await EventsCollection.insertOne(req.body);

    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error('Error inserting event:', error);
    res.status(500).json({ message: 'Error inserting event' });
  }
});

export default router;
