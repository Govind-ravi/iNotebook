const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { query, body, validationResult } = require('express-validator');


router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)        
    } catch (error) {
        res.status(500).send(error.message)
    }
})
router.post('/createnotes',fetchuser, [
    body('title', 'Entre a valid title of minimum 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let note = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        });
        res.send(note)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/updatenotes/:id',fetchuser, async (req, res)=>{

    const {title, description, tag} = req.body;
    try {
    let newNotes = {};
    if(title){newNotes.title = title}
    if(description){newNotes.description = description}
    if(tag){newNotes.tag = tag}

        let notes = await Notes.findById(req.params.id)
        if(!notes){return res.status(404).send("Not Found")}
        if(notes.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
    
        notes = await Notes.findByIdAndUpdate(req.params.id, {$set: newNotes}, {new: true})
        res.json(notes)
    } catch (error) {
        res.status(500).send(error.message)
    }



})
router.delete('/deletenotes/:id',fetchuser, async (req, res)=>{

    try {    
        let notes = await Notes.findById(req.params.id)
        if(!notes){return res.status(404).send("Not Found")}
        if(notes.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
    
        notes = await Notes.findByIdAndDelete(req.params.id, notes)
        res.send("Deleted")
        
    } catch (error) {
        res.status(500).send(error.message)
    }


})
module.exports = router;