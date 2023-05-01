import { InferSchemaType, Schema, model } from 'mongoose';

const noteSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String },
}, { timestamps: true });

// creates a type Note from the schema above 
type Note = InferSchemaType<typeof noteSchema>

// export the model as a Note type
export default model<Note>('Note', noteSchema);