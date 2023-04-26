import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note  from './components/Note';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    try {
      fetch('/api/notes', { method: 'GET' })
      .then(response => response.json())
      .then(data => setNotes(data));
    } catch (error) {
      console.error(error);
      alert('Error fetching notes');
    }
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
    </Container>
  );
  
}

export default App;
