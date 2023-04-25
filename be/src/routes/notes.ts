import express from 'express';
import * as NotesController from '../controllers/notes';

// Create a new router for the notes 
const router = express.Router();

// Register the routes for CRUD operations
router.get('/' , NotesController.getNotes);
router.get('/:noteId', NotesController.getNote)
router.post('/' , NotesController.createNote);
router.put('/:noteId', NotesController.updateNote);
router.delete('/:noteId', NotesController.deleteNote);

export default router;