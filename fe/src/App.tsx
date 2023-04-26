import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import AddNoteModal from './components/Note.modal';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import * as noteAPI from './api/notes';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteModal, setShowAddNoteModal] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await noteAPI.getNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert('Error fetching notes');
      }
    }
  fetchNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map(note => (
          <Col key={note._id} id={'note'+note._id}>
            <Note note={note} className={styles.note}/>
          </Col>
        ))}
      </Row>  
      {showAddNoteModal && <AddNoteModal />}
    </Container>
  );
  
}

export default App;
