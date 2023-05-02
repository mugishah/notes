import { ConflictError, UnauthorizedError } from "../errors/http.errors"
import { Note } from "../models/note"
import { User } from "../models/user"

/** 
 * This is a generic function that can be used to fetch data from the API
 */ 
export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init)
  if (response.ok) {
   return response
  } else {
    const errorBody = await response.json()
    const errorMessage = errorBody.error

    if (response.status === 401) 
    {
      throw new UnauthorizedError(errorMessage)
    } else if(response.status === 409)
    {
      throw new ConflictError(errorMessage)
    } else
    {
      throw Error('Something went wrong'+response.status + ' message:' + errorMessage)
    }
    
  }
}

/**
 * Endpoint: GET /api/users
 * @returns the logged in user
 * @example
 * const user = await getLoggedInUser()
 * console.log(user)
 * // {
 * //   "email": "mail@mail",
 * //   "password": "securepassword"
 * // }
 */
export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData("/api/users", { method: "GET" })
  return response.json()
}

/**
 * Endpoint: POST /api/users/signup
 * @param user the user to sign up
 * @returns the signed up user
 * @example
 * const user = await signUp({ email: 'mail@mail.com', password: 'securepassword' })
 * console.log(user)
 * // {
 * //   "email": "mail@mail",
 * //   "password": "securepassword"
 * // }
*/ 
export const signUp = async (user: User): Promise<User> => {
  const response = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  return response.json(); 
}

/**
 * Endpoint: POST /api/users/login
 * @param user the user to log in
 * @returns the logged in user
 * @example
 * const user = await login({ email: 'mail@mail.com', password: 'securepassword' })
 * console.log(user)
 * // {
 * //   "email": "mail@mail.com",
 * //   "password": "securepassword"
 * // }
 * 
*/
export const login = async (user: User): Promise<User> => {
  const response = await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  return response.json(); 
} 

/**
 * Endpoint: POST /api/users/logout
 * @returns status code 200 and OK if successful
 */
export const logout = async () => {
  await fetchData('/api/users/logout', { method: 'POST'})
}

/**
 * Endpoint: GET /api/notes
 * @returns all notes
 * @throws Error if the response status code is not 200
 * @throws Error if the response status code is 401
 * 
 * @example
 * const notes = await getNotes()
 * console.log(notes)
 * // [
 * //   {
 * //     "id": "1",
 * //     "title": "Note 1",
 * //     "text": "text 1"
 * //   },
 * //   {
 * //     "id": "2",
 *  //    "title": "Note 2",
 * //    "text": "text 2"
 * //   }
 * // ]
 */
export const getNotes = async (): Promise<Note[]> => {
  const response = await fetchData("/api/notes", { method: "GET" })
  return response.json()
}

/**
 * Endpoint: POST /api/notes
 * @param note the note to create
 * @returns the created note
 * @example
 * const note = await createNote({ title: 'Note 1', text: 'text 1' })
 * console.log(note)
 * // {
 * //   "id": "1",
 * //   "title": "Note 1",
 * //   "text": "text 1"
 * // }
 */
export const createNote = async (note: Note): Promise<Note> => {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
  return response.json()
}

/**
 *  Endpoint: PUT /api/notes/:id
 * @param id the id of the note to update
 * @param note the note to update
 * @returns the updated note
 * @example
 * const note = await updateNote('1', { title: 'Note 1', text: 'text 1' })
 * console.log(note)
 * // {
 * //   "id": "1",
 * //   "title": "Note 1",
 * //   "text": "text 1"
 * // }
 */
export const updateNote = async (id: string, note: Note): Promise<Note> => {
  const response = await fetchData(`/api/notes/${id}`, { 
    method: "PUT" , 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note)
  })
  return response.json()
}

/**
 * Endpoint: DELETE /api/notes/:id
 * @param id the id of the note to delete
 * @returns status code 200 and OK if successful
 * @example
 * await deleteNote('1')
 * console.log('Note deleted')
 * // Note deleted
 */
export const deleteNote = async (id: string): Promise<void> => {
  await fetchData(`/api/notes/${id}`, { method: "DELETE" })
}

export default {
  getLoggedInUser,
  signUp,
  login,
  logout,
  getNotes,
  createNote,
  deleteNote
}