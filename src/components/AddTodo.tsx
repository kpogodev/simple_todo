import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, selectTodosStatus } from "../features/todos/todosSlice"
import { AppDispatch } from "../app/store"

const AddTodo = () => {
  const status = useSelector(selectTodosStatus)
  const dispatch: AppDispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current?.value.trim() && status !== "loading") {
      dispatch(addTodo(inputRef.current.value))
      inputRef.current.value = ""
    }
  }
  return (
    <form className='w-full p-4 flex gap-4 items-stretch ' onSubmit={handleAddTodo}>
      <input
        ref={inputRef}
        placeholder='Add todo...'
        className='p-2 flex-grow border border-blue-200 rounded-md focus-visible:border-blue-400 outline-blue-400 transition-colors'
      />
      <button
        type='submit'
        className='w-20 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-800 transition-colors disabled:bg-slate-600'
        disabled={status === "loading"}
      >
        Add
      </button>
    </form>
  )
}

export default AddTodo
