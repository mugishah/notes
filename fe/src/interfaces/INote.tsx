import { Note } from '../models/note';

export interface INote {
  note: Note,
  className?: string,
  onDeleteClicked: (note: Note) => void,
  onNoteClicked: (note: Note) => void
}
