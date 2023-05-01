import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as NotesApi from "../api/notes"
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from '../styles/utils.module.css'

interface IProps {
  onDismiss: () => void,
  onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({
  onDismiss,
  onSignUpSuccessful
}: IProps) => {

  const { register, handleSubmit, formState: { errors, isSubmitting }  } = useForm<User>();

  const onSubmit = async (user: User) => {
    try {
      const newUser = await NotesApi.signUp(user);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error)
      console.error(error);
    }
  }
  

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sign up
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>

          <TextInputField 
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={ register }
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputField 
            name='email'
            label='Email'
            type='email'
            placeholder='Email'
            register={ register }
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />

          <TextInputField 
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={ register }
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign up
        </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal