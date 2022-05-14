import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './model';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md';
import "./styles.css";
import {Draggable} from 'react-beautiful-dnd';

type Props = {
  todo: Todo,
  todos: Todo[],
  settodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  index: number,
};


const SingleTodo: React.FC<Props> = ({todo, todos, settodos, index}) => {
  const [edit, setedit] = useState<boolean>(false);
  const [editTodo, seteditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit]);
  


  const handleDone = (id: number) => {
    settodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
  };

  const handleDelete = (id: number) => {
    settodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number) => {
    if(!edit && !todo.isDone) {
      setedit(!edit)
    }
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    settodos(todos.map((todo) => (
      todo.id === id ? {...todo, todo:editTodo} : todo
    )))

    setedit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form 
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
          onSubmit={(e) => handleSubmit(e, todo.id)} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}
        >
          {edit ? (
            <input ref={inputRef} value={editTodo} onChange={(e) => seteditTodo(e.target.value)} className="todos__single__text" />
          ): (
            todo.isDone ? (
              <s className="todos__single__text">{todo.todo}</s>
            ) : (
              <span className="todos__single__text">{todo.todo}</span>
      
            )
            
          )}

          <div>
            <span className="icon" onClick={() => handleEdit(todo.id)}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;