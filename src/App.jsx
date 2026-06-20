import { useState , useEffect} from 'react'
import { Navbar } from './components/Navbar'
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)
  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if(todostring){
    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)}
  }, [])
  

  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
  }

  const toggleFinished=()=>{
    setshowFinished(!showFinished);
  }

  const handleDelete=(e,id)=>{
    let index=todos.findIndex(item=>{
        return item.id==id;
      })
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
  }

  const handleAdd=()=>{
    settodos([...todos, {id:uuidv4(),todo,isCompleted:false}])
    settodo("")
  }

  const handleChange=(e)=>{
    settodo(e.target.value)
  }

  const handleCheckbox =(e) => 
    {
      let id = e.target.name;
      let index=todos.findIndex(item=>{
        return item.id==id;
      })
      let newTodos=[...todos];
      newTodos[index].isCompleted=!newTodos[index].isCompleted;
      settodos(newTodos);
    }

  return (
    <>
      <Navbar/>
      <div className=" mx-2 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>Itask-Manager</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-center text-2xl font-bold'>Add a TODO</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full border-2 rounded-full px-5 py-1'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-600 hover:bg-violet-800 disabled:bg-violet-400 rounded-full mx-2 text-white px-5 py-1 font-bold'>Save</button>
          </div>
        </div>
          <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> Show Finished
          <div className=' h-px bg-violet-400  mx-auto my-2'></div>
          <h2 className='text-lg font-bold'>Your todos</h2>
          <div className="todos">
            {todos.length===0 && <div className='m-5'>No todos to display
              </div>}
            {todos.map(item=>{

            
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3 ">
              <div className='flex gap-5'>
              <input name ={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":"" }>{item.todo}
              </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-600 hover:bg-violet-800 rounded-xl text-white mx-1 p-2 py-1 font-bold'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-600 hover:bg-violet-800 rounded-xl text-white mx-1 p-2 py-1 font-bold'><MdDelete /></button>
              </div>
            </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
