import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  // by using select:false it doesn't return the email when requesting a user by deafult - secuirty measuement
  email: { type: String, required: true, select: false, unique: true }, 
  // by using select:false it doesn't return the password when requesting a user by deafult - secuirty measuement
  password: { type: String, required: true, select: false }
});


// creates a type User from the schema above
type User = InferSchemaType<typeof userSchema>

// export the model as a User type
export default model<User>('User', userSchema)
