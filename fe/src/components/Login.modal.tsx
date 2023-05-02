import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as NotesApi from "../api/notes"
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from '../styles/utils.module.css'
import { useState } from "react";
import { UnauthorizedError } from "../errors/http.errors";

interface IProps {
  onDismiss: () => void,
  onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({
  onDismiss,
  onLoginSuccessful
}: IProps) => {

  const [errorText, setErrorText] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }  } = useForm<User>();

  const onSubmit = async (user: User) => {
    try {
      const newUser = await NotesApi.login(user);
      onLoginSuccessful(newUser);
    } catch (error) {
      if(error instanceof UnauthorizedError){
        setErrorText(error.message)
      } else {
      alert(error)
      }
      console.error(error);
    }
  }
  

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Login
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && 
          <Alert variant="danger">
            {errorText}
          </Alert>
        }
        <Form onSubmit={handleSubmit(onSubmit)}>

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
            Login
        </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal