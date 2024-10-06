import React from 'react'
import './Todo.css'
import {useState,useRef,useEffect} from 'react'
import {IoMdDoneAll} from 'react-icons/io';
import {FiEdit} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import ListIcon from '@mui/icons-material/List';

function Todo() {
    const[todo,settodo] =useState('')
    const[todos,settodos] =useState([])
    const[editId,setEditID] =useState(0)
    const handleSubmit = (e)=>{
         e.preventDefault();

    }
    const addTodo = () => {
        if (/^[a-zA-Z]+$/.test(todo) && todo.trim() !== '') {
            const isTodoAlreadyExists = todos.some((to) => to.list === todo);
    
            if (!isTodoAlreadyExists) {
                if (editId) {
                    const edittodo = todos.find((todo) => todo.id === editId);
                    const updatetodo = todos.map((to) =>
                        to.id === edittodo.id
                            ? { ...to, list: todo.toUpperCase() }
                            : { ...to }
                    );
                    settodos(updatetodo);
                    setEditID(0);
                } else {
                    settodos([
                        ...todos,
                        { list: todo.toUpperCase(), id: Date.now(), status: false }
                    ]);
                }
                settodo('');
            } else {
                alert('Todo already exists!');
            }
        } else {
            alert('Please enter a valid input!');
        }
    }
    
    
    const inputRef = useRef('null')

    useEffect(()=>{
        inputRef.current.focus();

    })
    
    const onDelete = (id) =>{
        settodos(todos.filter((to)=>to.id !== id))
    }
    const onComplete = (id)=>{
        let complete = todos.map((list)=>{
            if(list.id === id){
            return({...list,status:!list.status})
            }
            return list
        })
        settodos(complete)
    }
    const onEdit = (id)=>{
        const edittodo =todos.find((to)=>to.id === id)
        settodo(edittodo.list)
        setEditID(edittodo.id)

    }



  return (
    <div className='container'>
        <ListIcon></ListIcon>
        <h2>TO-DO APP</h2>
       <form className='form-group' onSubmit={handleSubmit}>
         <input type="text" value={todo} ref={inputRef} placeholder='Enter Your Activity' className='form-control uppercase' onChange={(event)=>settodo(event.target.value)}/>
         <button onClick={addTodo}>{editId? 'EDIT':'ADD'}</button>
       </form>
       <div className='list'>
        <ul>
            {
                todos.map((to)=>(
                    <li className='list-items'>
                        <div className='list-item-list' id={to.status ?'list-item':''}>{to.list}</div>
                    <span>
                    <IoMdDoneAll className='list-item-icons' id='complete' tittle="Complete" onClick={()=>onComplete(to.id)}/>  
                    <FiEdit  className='list-item-icons' id='edit'  tittle="Edit" onClick={()=>onEdit(to.id)}/>
                    <MdDelete className='list-item-icons' id='delete'  tittle="Delete"
                    onClick={()=>onDelete(to.id)}/>
                    </span>
                    </li>

                ))
            }
            
        </ul>
       </div>

    </div>
  )
}

export default Todo