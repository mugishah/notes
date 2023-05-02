import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface IProps {
  loggedInUser: User | null,
  onSignUpClicked: () => void,
  onLoginClicked: () => void
  onLogoutSuccesful: () => void
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccesful
}: IProps) => {

  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>
          HM Brand
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {
              loggedInUser ? 
              <NavBarLoggedInView 
                user={loggedInUser} 
                onLogoutSuccessful={onLogoutSuccesful} 
              />
              : 
              <NavBarLoggedOutView 
                onSignUpClicked={onSignUpClicked} 
                onLoginClicked={onLoginClicked} 
              />
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar