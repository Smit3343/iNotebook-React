const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


//ROUTE 1: Get All the Notes using: GET "/api/note/fetchAllNotes". login Required
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id });
        return res.status(200).json(notes);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error:"Internal Server Error!"});
    }
})

//ROUTE 2: Add note using: POST "/api/note/addNote". login Required
router.post('/addNote', [
    body('title', "title must be at least 3 characters").isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters').isLength({ min: 5 })
], fetchUser, async (req, res) => {
    try {
        //If there are errors return Bad request and return the errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;
        let note = await Note.create({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })
        return res.status(200).json({"note":note});
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error:"Internal Server Error!"});
    }
})

//ROUTE 3: Update Note using: PUT "/api/note/updateNote". login Required
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    //Create a new Note Object
    const newNote = {};
    if (title)
        newNote.title = title;
    if (description)
        newNote.description = description;
    if (tag)
        newNote.tag = tag;
    try {
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (note == null)
            return res.status(400).json({ error: "not found!" });

        //Allow updation only if user id and logged user id same
        if (note.user.toString() != req.user.id)
            return res.status(401).json({ error: "not Allowed" });

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        return res.status.json({"note":note});
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error:"Internal Server Error!"});
    }
})

//ROUTE 4: Delete Note using: DELETE "/api/note/deleteNote". login Required
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (note == null)
            return res.status(400).json({ error: "not found!" });

        //Allow deletion only if user id and logged user id same
        if (note.user.toString() != req.user.id)
            return res.status(401).json({ error: "not Allowed" });

        const opNote = await Note.findByIdAndDelete(req.params.id);
        return res.status(200).json({ "success": "Note has been deleted" });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({error:"Internal Server Error!"});
    }
})

module.exports = router;