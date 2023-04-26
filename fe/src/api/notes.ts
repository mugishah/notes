import { Note } from "../models/note"

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

export default {
  getNotes,
  createNote,
}