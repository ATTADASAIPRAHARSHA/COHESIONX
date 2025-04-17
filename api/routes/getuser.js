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

router.post('/getuser', async (req, res) => {
    const { name, email, age } = req.body;

    try {
        // Check if user exists
        const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {  // Ignore 'No rows' error
            return res.status(500).json({ message: "Error checking user", error: fetchError });
        }

        if (existingUser) {
            // Update user
            const { error: updateError } = await supabase
                .from("users")
                .update({ name, age })  // Overwrite existing fields
                .eq("email", email);

            if (updateError) {
                return res.status(500).json({ message: "Error updating user", error: updateError });
            }

            return res.status(200).json({ message: "User updated successfully" });
        } else {
            // Insert new user
            const { error: insertError } = await supabase
                .from("users")
                .insert([{ name, email, age }]);

            if (insertError) {
                return res.status(500).json({ message: "Error inserting user", error: insertError });
            }

            return res.status(201).json({ message: "User created successfully" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Unexpected server error", error: err.message });
    }
});


export default router;