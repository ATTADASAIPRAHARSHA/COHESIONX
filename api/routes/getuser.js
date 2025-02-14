import express from 'express';
import admin from 'firebase-admin';
import { supabase } from '../../supaBaseclient.js';

const router = express.Router();


router.get('/getuser', async (req, res)=>{
    res.send('hello')
});

router.post('/getuser', async (req, res) => {

    const {email} = req.body;

    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
    if(error) return res.status(404).json({ message: "Error While fetching " });
    return res.json({ message: "Login successful", data });
});

export default router;