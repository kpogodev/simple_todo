import { useDispatch } from "react-redux"
import { updateTodo, deleteTodo, resetStatus } from "../features/todos/todosSlice"
import type { Todo } from "../features/todos/todosSlice"
import { AppDispatch } from "../app/store"
import cn from "classnames"
import { AiFillDelete } from "react-icons/ai"


const Todo = ({ todo }: { todo: Todo }) => {
  const dispatch: AppDispatch = useDispatch()

  const handleOnComplete = () => {
    dispatch(updateTodo(todo))
  }

  const handleOnDelete = () => {
    dispatch(deleteTodo(todo))
  }

  return (
    <div className='flex flex-row items-center justify-end gap-2 p-2 border border-gray-200 rounded-md'>
      <span className={cn(todo.completed ? "line-through" : "", "font-bold capitalize flex-grow")}>{todo.text}</span>
      <button
        className='p-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-600'
        disabled={todo.completed}
        onClick={handleOnComplete}
      >
        {todo.completed ? "Completed" : "Complete"}
      </button>
      <button className='p-2 bg-red-500 text-white text-2xl rounded-lg' onClick={handleOnDelete}>
        <AiFillDelete />
      </button>
    </div>
  )
}

export default Todo
