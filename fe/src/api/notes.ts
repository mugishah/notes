import { Note } from "../models/note"
import { User } from "../models/user"

// This is a generic function that can be used to fetch data from the API
export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init)
  if (response.ok) {
   return response
  } else {
    const errorBody = await response.json()
    const errorMessage = errorBody.message
    throw new Error(errorMessage)
  }
}

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData("/api/users", { method: "GET" })
  return response.json()
}

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

export const logout = async () => {
  await fetchData('/api/users/logout', { method: 'POST'})
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetchData("/api/notes", { method: "GET" })
  return response.json()
}

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

export const deleteNote = async (id: string): Promise<void> => {
  await fetchData(`/api/notes/${id}`, { method: "DELETE" })
}

export default {
  getNotes,
  createNote,
  deleteNote
}