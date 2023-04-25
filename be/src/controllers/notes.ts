import { RequestHandler } from "express";
import Note from "../models/note";
import { INote, INoteId } from "../interfaces/iNote";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next ) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error: any) {
    next(error);
  }
};


export const getNote: RequestHandler = async (req, res, next ) => {
  // take the id from the url
  const id = req.params.noteId
  try {
    if(!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Invalid note id');
    const note = await Note.findById(id).exec();
    if(!note) throw createHttpError(404, 'Note not found');
    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}


export const createNote: RequestHandler<unknown, unknown, INote, unknown> = async (req, res, next) => {
  // take the title and text from the body
  const title = req.body.title;
  const text = req.body.text;
  try {

    if(!title) throw createHttpError(400, 'Note must have a title');

    const note = await Note.create({
      title: title, 
      text: text
    });
    res.status(201).json(note);
  } catch (error: any) {
    next(error);
  }
};

export const updateNote: RequestHandler<INoteId, unknown, INote, unknown> = async (req, res, next ) => {
  const id = req.params.noteId;
  const title = req.body.title;
  const text = req.body.text;
  try {

    if(!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Invalid note id');

    if(!title) throw createHttpError(400, 'Note must have a title');

    const note = await Note.findByIdAndUpdate(id, {
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
  const id = req.params.noteId;
  try {
    if(!mongoose.isValidObjectId(id)) throw createHttpError(400, 'Invalid note id');
    const note = await Note.findByIdAndDelete(id).exec();
    if(!note) throw createHttpError(404, 'Note not found');
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
};
