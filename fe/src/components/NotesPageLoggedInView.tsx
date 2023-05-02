import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as NoteAPI from '../api/notes';
import AddNoteModal from '../components/Note.modal';
import { Note as NoteModel } from '../models/note';
import Note from "./Note";
import styles from '../styles/NotesPage.module.css';
import styleUtils from '../styles/utils.module.css';


const NotesPageLoggedInView = () => {

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState<NoteModel|null>(null)


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const notes = await NoteAPI.getNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true)
      } finally {
        setNotesLoading(false)
      }
    }
  fetchNotes();
  }, []);
  
  const deleteNote = async (note: NoteModel )=> {
    try {
      const id = note._id
      await NoteAPI.deleteNote(id)
      // filter the notes that's just deleted and removed it from the view
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  const notesGrid = 
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map(note => (
        <Col key={note._id} id={'note'+note._id}>
          <Note 
            note={note} 
            className={styles.note} 
            onNoteClicked={(note) => setNoteToUpdate(note)}
            onDeleteClicked={deleteNote}
          />
        </Col>
      ))}
    </Row>  

  return ( 
    <>
      <Button
        onClick={() => setShowAddNoteModal(true)}
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}>
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary' />}
      {showNotesLoadingError && <p>Something went wrong please refresh the page</p>}
      {!notesLoading && !showNotesLoadingError &&
        <>
          {notes.length > 0
            ? notesGrid
            : <p>You don't have any notes yet</p>}
        </>}
      {showAddNoteModal &&
        <AddNoteModal
          onDismiss={() => setShowAddNoteModal(false)}
          onSave={(note) => {
            // adds the new note to the notes array so it is displayed on the page without having to refresh
            setNotes([...notes, note]);
            setShowAddNoteModal(false);
          } } />}
      {noteToUpdate &&
        <AddNoteModal
          onUpdate={noteToUpdate}
          onDismiss={() => setShowAddNoteModal(false)}
          onSave={(note) => {
            setNotes(notes.map(existingNote => existingNote._id === note._id ? note : existingNote));
            setNoteToUpdate(null);
            // adds the new note to the notes array so it is displayed on the page without having to refresh
            setShowAddNoteModal(false);
          } } />}
      </>
   );
}
 
export default NotesPageLoggedInView;