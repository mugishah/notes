import { Container } from "react-bootstrap";
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import { User } from "../models/user";
import styles from '../styles/NotesPage.module.css';

interface IProps {
  loggedInUser: User | null
}
const NotesPage = ({ loggedInUser }:IProps) => {
  return (  
    <>
      <Container className={styles.notesPage}>
        <>
          { loggedInUser ?
            <NotesPageLoggedInView />
            :
            <NotesPageLoggedOutView />
          }
        </>
      </Container>
    </>
  );
}
 
export default NotesPage;