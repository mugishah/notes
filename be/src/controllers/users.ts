import { RequestHandler } from 'express';
import User from '../models/user';
import { IUser } from '../interfaces/iUser';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const getAuthUser: RequestHandler = async (req, res, next) => {
  
  const authUserId = req.session.userId;

  try {
    const user = await User.findById(authUserId).select('+email').exec()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const signUp: RequestHandler<unknown, unknown, IUser, unknown> = async (req, res, next ) => {

  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, 'Parameters missing')
    }
  
    const existingUsername = await User.findOne({username: username}).exec()
    if(existingUsername){throw createHttpError(409, 'Username already exist')}

    const existingEmail = await User.findOne({email: email}).exec()
    if(existingEmail) { throw createHttpError(409, 'Email already exist')}

    // hashing the raw password
    const passwordHashed = await bcrypt.hash(passwordRaw, 10)
    const user = await User.create({
      username: username,
      email: email,
      password: passwordHashed,
    })

    // set the session userId to the user._id 
    req.session.userId = user._id

    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const login: RequestHandler<unknown, unknown, IUser, unknown> =async (req, res, next) => {

  const email = req.body.email
  const password = req.body.password

  try {
    if (!email || !password){ throw createHttpError(400, 'Parameters missing') }

    // find the user by email and select the password field + username field + email field (which is not selected by default)
    const user = await User.findOne({ email: email }).select('+password +username +email').exec();
    if(!user){
      throw createHttpError(401, 'Invalid credentials');
    }

    // compare the raw password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      throw createHttpError(401, 'Invalid credentials');
    }

    // set the session userId to the user._id and send the user back to the client (without the password)
    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if(error) {
      next(error);
    } else {
      res.sendStatus(200)
    }
  });
}