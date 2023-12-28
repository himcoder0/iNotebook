const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all notes of user using GET : "/api/auth/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});

// ROUTE 2: Add a new note using POST : "/api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Desc must be at least 5 chars").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // destructing to get all data seperately from request
      const { title, description, tag } = req.body;
      // validation of request
      const errors = validationResult(req);

      // If error return bad gateway and error
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// ROUTE 3: Update note using PUT : "/api/notes/updatenote". Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // destructuring to get all data seperately from request
    const { title, description, tag } = req.body;
    // Create a new note body
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    // check if note exists
    if (!note) {
      return res.status(400).json({ errors: "Note not found" });
    }
    // if requesting user and notes owner id's are same (owner updating notes)
    if (note.user.toString() !== req.user.id) {
      return res.status(400).json({ errors: "Not allowed" });
    }

    // update notes
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});

// ROUTE 4: Delete note using DELETE : "/api/notes/deletenote". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // destructuring to get all data seperately from request
    const { title, description, tag } = req.body;

    // Find the note to be deleted
    let note = await Notes.findById(req.params.id);
    // check if note exists
    if (!note) {
      return res.status(400).json({ errors: "Note not found" });
    }
    // if requesting user and notes owner id's are same (owner deleting notes)
    if (note.user.toString() !== req.user.id) {
      return res.status(400).json({ errors: "Not allowed" });
    }

    // update notes
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
