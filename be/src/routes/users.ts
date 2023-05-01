import express from 'express';
import * as UserController from '../controllers/users'

// Create a new router for the notes
const router = express.Router()

//register the routes for the CRUD operations
router.get('/', UserController.getAuthUser)
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

export default router