import styles from '../styles/Note.module.css';
import { INote as INoteProps } from '../interfaces/INote';
import { Card } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';

const Note = ({ note, className }: INoteProps ) => {

  // set up the note object
  const {
    title,
    text,
    createdAt,
    updatedAt
  } = note;

  // set up the created/updated text for the footer 
  let createdUpdatedText: string;
  // logic to determine if the note has been updated or not and display the appropriate text
  if(updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
  }else{
    createdUpdatedText = 'Created: ' + formatDate(createdAt);
  }

  return (
    <>
      <Card className={`${styles.noteCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
          <Card.Title>{title}</Card.Title>
          <Card.Text className={styles.cardText}>{text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          {createdUpdatedText}
        </Card.Footer>
      </Card>
    </>
  )
}
export default Note