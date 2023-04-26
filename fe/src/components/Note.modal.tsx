import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import * as noteAPI from '../api/notes';


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
      <Modal.Header>
        <Modal.Title>
         {onUpdate ? 'Update ' : 'Add '} note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addUpdateNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label >Title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Title" 
              id="title" 
              isInvalid={!!errors.title}
              {...register("title", { required: true })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message && 'Title is required'}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Text</Form.Label>
            <Form.Control 
              as="textarea" 
              placeholder="Text" 
              rows={5} 
              {...register("text", )}
            />
          </Form.Group>
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