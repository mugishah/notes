import { useEffect, useState } from 'react';
import LoginModal from './components/Login.modal';
import NavBar from './components/NavBar';
import SignUpModal from './components/Signup.modal';
import styles from './styles/NotesPage.module.css';
import { Container } from 'react-bootstrap';
import { User } from './models/user';
import * as NoteAPI from './api/notes';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLogiModal] = useState(false)

  useEffect(()=>{
    const fetchLoggedInUser = async () =>{
      try {
        const user = await NoteAPI.getLoggedInUser();
        setLoggedInUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser()
  },[])

  return (
    <>
    <NavBar 
      loggedInUser={loggedInUser} 
      onSignUpClicked={() => setShowSignUpModal(true)} 
      onLoginClicked={() => setShowLogiModal(true)} 
      onLogoutSuccesful={() => setLoggedInUser(null)} 
    />
    <Container className={styles.notesPage}>
      <>
        { loggedInUser ?
          <NotesPageLoggedInView />
          :
          <NotesPageLoggedOutView />
        }
      </>
      {showSignUpModal &&
        <SignUpModal
          onDismiss={() => { } }
          onSignUpSuccessful={() => { } } />
      }
      {showLoginModal &&
        <LoginModal
          onDismiss={() => { } }
          onLoginSuccessful={() => { } } />
      }
    </Container>
    </>
  );
  
}

export default App;
