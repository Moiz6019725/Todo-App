import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todoList, setTodoList] = useState([])
  const [showFinished, setShowFinished] = useState(false)

  const toggleFinished=() => {
    setShowFinished(!showFinished)
  }
  

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(todoString)
      setTodoList(todos)
    }
  }, [])
  
  const saveToLS=() => {
    localStorage.setItem("todos",JSON.stringify(todoList))
  }
  
  const handleAdd = () => {
    setTodoList([...todoList, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (e,id) => {
    let t=todoList.filter(item=>{
      return item.id===id
    })
    setTodo(t[0].todo)
    let editTodo = todoList.filter(item => {
      return item.id != id
    })
    setTodoList(editTodo)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let yes = confirm()
    if (yes == true) {
      let delTodo = todoList.filter(item => {
        return item.id != id
      })
      setTodoList(delTodo)
    }
    saveToLS()
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todoList.findIndex((item) => {
      return item.id === id
    })
    let newTodo = [...todoList]
    newTodo[index].isCompleted = !newTodo[index].isCompleted
    setTodoList(newTodo)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-indigo-100 min-h-[80vh] md:w-1/2">
      <h1 className='text-xl font-bold text-center my-2'>iTask - Manage Your Tasks at one place</h1>
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Task</h2>
          <input onChange={handleChange} value={todo} className='w-full outline-none py-1 px-2 rounded-full' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-indigo-800 hover:bg-indigo-950 p-3 py-1 rounded-md text-white w-full my-2 disabled:bg-black disabled:text-white'>Add</button>
        </div>
        <input className='mt-4' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> show finished
        <div className='flex justify-center my-2'>
        <div className="hr h-[1px] bg-black opacity-15 w-[90%]"></div>
        </div>
        <h2 className='text-lg font-bold'>Your Tasks</h2>
        <div className="todos">
          {todoList.length===0 && <div className='text-base m-3 font-medium text-gray-400'>No todos to display.</div>}
          {todoList.map(item => {
            return (showFinished || !item.isCompleted) &&<div key={item.todo} className="todo flex items-center w-full justify-between mb-1 border-b border-gray-950 p-2">
              <div className="todo flex gap-4">
                <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-indigo-800 hover:bg-indigo-950 p-3 py-1 rounded-md text-white mx-2'><MdEditNote /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-indigo-800 hover:bg-indigo-950 p-3 py-1 rounded-md text-white '><MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
