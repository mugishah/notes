import styles from './styles/app.module.css';
import { useEffect, useState } from 'react';
import * as NoteAPI from './api/notes';
import LoginModal from './components/Login.modal';
import NavBar from './components/NavBar';
import SignUpModal from './components/Signup.modal';
import { User } from './models/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';


function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

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
      <BrowserRouter>
        <NavBar 
          loggedInUser={loggedInUser} 
          onSignUpClicked={() => setShowSignUpModal(true)} 
          onLoginClicked={() => setShowLoginModal(true)} 
          onLogoutSuccesful={() => setLoggedInUser(null)} 
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route 
              path="/"
              element={<NotesPage loggedInUser={loggedInUser}/>}
            />
            <Route 
              path="/privacy"
              element={<PrivacyPage />}
            />
            <Route 
              path="/*"
              element={<NotFoundPage />}
            />
          </Routes>
        </Container> 
        
        {showSignUpModal &&
            <SignUpModal
              onDismiss={() => setShowSignUpModal(false)}
              onSignUpSuccessful={(user) => {
                setLoggedInUser(user);
                setShowSignUpModal(false);            
              } } />
        }
        {showLoginModal &&
            <LoginModal
              onDismiss={() => setShowLoginModal(false) }
              onLoginSuccessful={(user) => { 
                setLoggedInUser(user)
                setShowLoginModal(false);
              }}
              />
        }
      </BrowserRouter>
    </>
  );
  
}

export default App;
