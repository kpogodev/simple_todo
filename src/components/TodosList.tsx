import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTodos, selectAllTodos, selectTodosStatus } from "../features/todos/todosSlice"
import { AppDispatch } from "../app/store"
import Todo from "./Todo"

const TodosList = () => {
  const dispatch: AppDispatch = useDispatch()
  const todos = useSelector(selectAllTodos)
  const status = useSelector(selectTodosStatus)

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllTodos())
    }
  }, [dispatch, status])

  return (
    <div className='w-full p-5 flex flex-col gap-2'>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodosList
