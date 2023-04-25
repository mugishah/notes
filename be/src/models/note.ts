import { InferSchemaType, Schema, model } from 'mongoose';

const noteSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String },
}, { timestamps: true });

// creates a type Note from the schema above 
type Note = InferSchemaType<typeof noteSchema>

// export the model with the type Note
export default model<Note>('Note', noteSchema);