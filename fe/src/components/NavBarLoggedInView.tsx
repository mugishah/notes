import { User } from "../models/user";
import * as NotesAPI from '../api/notes'
import { Button, Navbar } from "react-bootstrap";

interface IProps {
  user: User
  onLogoutSuccessful: () => void
}
const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful
}: IProps) => {

  const logout = async ()=>{
    try {
      await NotesAPI.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (  
      <>
        <Navbar.Text className="me-2">
          Jambo {user.username}
        </Navbar.Text>
        <Button onClick={logout}>
          Log out
        </Button>
      </>
  );
}
 
export default NavBarLoggedInView;