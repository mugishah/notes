import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import * as noteAPI from '../api/notes';
import TextInputField from "./form/TextInputField";


interface NoteProps {
  onUpdate?: Note,
  onDismiss: () => void,
  onSave: (note: Note) => void
}

const NoteModal = ({ onUpdate, onDismiss, onSave }: NoteProps) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Note>({
    defaultValues:{
      title: onUpdate?.title || '',
      text: onUpdate?.text || '',
    }
  }); 

  const onSubmit = async (note: Note) => {
    try {
      let noteResponse: Note;
      if(onUpdate){
        noteResponse = await noteAPI.updateNote(onUpdate._id, note)
      }else{
        noteResponse = await noteAPI.createNote(note);
      }
      onSave(noteResponse);
    } catch (error) {
      console.error(error);
      alert('Error saving note');
    }
  }

  return (  
    <Modal show onHide={()=> onDismiss()}>
      <Modal.Header closeButton>
        <Modal.Title>
         {onUpdate ? 'Update ' : 'Add '} note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addUpdateNoteForm" onSubmit={handleSubmit(onSubmit)}>

          <TextInputField 
            name="title" 
            label="Title" 
            type="text"
            placeholder="Title"
            register={ register } 
            registerOptions={{ required: 'Required' }}
            error={errors.title}
          />

          <TextInputField 
            name="text"
            label="Text"
            as="textarea"
            rows={ 5 }
            placeholder="Text"
            register={ register }
          />
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={()=> onDismiss()}>
          Close
        </Button>
        <Button 
          type="submit"
          form="addUpdateNoteForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default NoteModal;