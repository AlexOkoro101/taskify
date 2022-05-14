import React from 'react';
import { Todo } from './model';
import SingleTodo from './SingleTodo';
import "./styles.css";
import {Droppable} from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  settodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setcompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, settodos, completedTodos, setcompletedTodos}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">
              Active Task
            </span>
            {todos.map((todo, index) => (
              <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} settodos={settodos} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">
              Completed Task
            </span>
            {completedTodos.map((todo, index) => (
              <SingleTodo index={index} todo={todo} key={todo.id} todos={completedTodos} settodos={setcompletedTodos} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>

  );
};

export default TodoList;