import { Button } from "react-bootstrap";

interface IProps {
  onSignUpClicked: () => void,
  onLoginClicked: () => void 
}
const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked
}:IProps) => {

  return ( 
      <>
        <Button onClick={onSignUpClicked}>Sign Up</Button>
        <Button onClick={onLoginClicked}>Login</Button>
      </>
   );
}
 
export default NavBarLoggedOutView;