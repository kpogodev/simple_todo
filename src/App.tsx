import AddTodo from "./components/AddTodo"
import TodosList from "./components/TodosList"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <div className='flex flex-col items-center min-h-screen justify-center gap-10 bg-slate-200'>
      <h1 className='text-3xl font-bold'>Todo App</h1>
      <div className='w-full max-w-5xl flex flex-col items-center bg-white rounded-lg shadow-lg'>
        <TodosList />
        <AddTodo />
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  )
}

export default App
