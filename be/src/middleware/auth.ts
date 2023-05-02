import { RequestHandler } from "express";
import createHttpError from "http-errors";

// method to check if the user is authenticated
export const requiresAuth: RequestHandler = (req, res, next) => {
  // if the session has a userId, the user is authenticated
  if(req.session.userId){
    // continue to the next middleware
    next()
  } else{
    // if the user is not authenticated, throw an error
    next(createHttpError(401, 'User not authenticated'))
  }
}