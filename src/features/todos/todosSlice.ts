import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../app/store"
import { toast } from "react-toastify"

export interface Todo {
  id: number
  text: string
  completed: boolean
}

type StatusType = "idle" | "loading" | "failed" | "success"

type ErrorType = string | null

export interface TodosState {
  todos: Todo[]
  status: StatusType
  error: ErrorType
}

const TODOS_URL = "http://localhost:3000/todos"

export const getAllTodos = createAsyncThunk<Todo[], void>("todos/getAllTodos", async (_, thunkAPI) => {
  try {
    const res = await axios.get(TODOS_URL)
    return res.data
  } catch (error) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message)
  }
})

export const addTodo = createAsyncThunk<Todo, string>("todos/addTodo", async (payload, thunkAPI) => {
  try {
    const res = await axios.post(TODOS_URL, { id: nanoid(), text: payload, completed: false })
    return res.data
  } catch (error) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message)
  }
})


export const updateTodo = createAsyncThunk<Todo, Todo>("todos/updateTodo", async (payload, thunkAPI) => {
  try {
    const res = await axios.put(`${TODOS_URL}/${payload.id}`, {...payload, completed: true })
    return res.data
  } catch (error) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message)
  }
})

export const deleteTodo = createAsyncThunk<Todo, Todo>("todos/deleteTodo", async (payload, thunkAPI) => {
  try {
    const res = await axios.delete(`${TODOS_URL}/${payload.id}`)
    if(res.status === 200) return payload

    return res.data
  } catch (error) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message)
  }
})

const initialState: TodosState = {
  todos: [],
  status: "idle",
  error: null,
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle"
    },
    resetError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.status = "success"
        state.todos = action.payload
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
        toast.error("Failed to fetch todos")
      })
      .addCase(addTodo.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "success"
        state.todos.push(action.payload)
        toast.success("Todo added successfully")
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "success"
        state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo))
        toast.success("Todo updated successfully")
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        if(!action.payload?.id) {
          state.status = "failed"
          state.error = "Todo was deleted but UI was not updated. Please refresh the page to see the changes."
          return
        }
        state.status = "success"
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
        toast.success("Todo deleted successfully")
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })
  },
})

export const selectAllTodos = (state: RootState) => state.todos.todos
export const selectTodosStatus = (state: RootState) => state.todos.status
export const selectTodosError = (state: RootState) => state.todos.error

export const { resetStatus, resetError } = todosSlice.actions

export default todosSlice.reducer
