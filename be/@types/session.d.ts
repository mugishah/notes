import mongoose from "mongoose";

declare module 'express-session' {
  export interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}