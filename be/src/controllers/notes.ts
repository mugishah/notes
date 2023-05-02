import { RequestHandler } from "express";
import Note from "../models/note";
import { INote, INoteId } from "../interfaces/iNote";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next ) => {
  // take the userId from the session 
  const authenticatedUserId = req.session.userId;

  try {
    // check if the userId is defined or not and throw an error if it is not defined
    assertIsDefined(authenticatedUserId)
    // find all the notes that have the userId equal to the authenticatedUserId
    const notes = await Note.find({userId: authenticatedUserId}).exec();
    res.status(200).json(notes);
  } catch (error: any) {
    next(error);
  }
};


export const getNote: RequestHandler = async (req, res, next ) => {
  // take the id from the url
  const noteId = req.params.noteId
   // take the userId from the session 
   const authenticatedUserId = req.session.userId;
  try {
    // check if the userId is defined or not and throw an error if it is not defined
    assertIsDefined(authenticatedUserId)

    if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, 'Invalid note id');

    const note = await Note.findById(noteId).exec();

    if(!note) throw createHttpError(404, 'Note not found');

    //Check if the note belongs to the authenticated user
    if(!note.userId.equals(authenticatedUserId)) throw createHttpError(403, 'You are not authorized to access this note');

    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}


export const createNote: RequestHandler<unknown, unknown, INote, unknown> = async (req, res, next) => {
  // take the title and text from the body
  const title = req.body.title;
  const text = req.body.text;

   // take the userId from the session 
   const authenticatedUserId = req.session.userId;
  try {
      // check if the userId is defined or not and throw an error if it is not defined
      assertIsDefined(authenticatedUserId)

    if(!title) throw createHttpError(400, 'Note must have a title');

    const note = await Note.create({
      userId: authenticatedUserId,
      title: title, 
      text: text
    });
    res.status(201).json(note);
  } catch (error: any) {
    next(error);
  }
};

export const updateNote: RequestHandler<INoteId, unknown, INote, unknown> = async (req, res, next ) => {
  const noteId = req.params.noteId;
  const title = req.body.title;
  const text = req.body.text;
   // take the userId from the session 
   const authenticatedUserId = req.session.userId;
  try {
    // check if the userId is defined or not and throw an error if it is not defined
    assertIsDefined(authenticatedUserId)

    if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, 'Invalid note id');

    if(!title) throw createHttpError(400, 'Note must have a title');

    const note = await Note.findByIdAndUpdate(noteId, {
      userId: authenticatedUserId,
      title: title,
      text: text
    }, { new: true }).exec();

    if(!note) throw createHttpError(404, 'Note not found');

    res.status(200).json(note);
  } catch (error) {
    next(error)
  }
};

export const deleteNote: RequestHandler<INoteId> = async (req, res, next ) => {
  const noteId = req.params.noteId;
  // take the userId from the session 
  const authenticatedUserId = req.session.userId;
  try {

    // check if the userId is defined or not and throw an error if it is not defined
    assertIsDefined(authenticatedUserId)

    if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400, 'Invalid note id');

    const note = await Note.findByIdAndDelete({
      authenticatedUserId,
      noteId
    }).exec();
  

    if(!note) throw createHttpError(404, 'Note not found');
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
};
