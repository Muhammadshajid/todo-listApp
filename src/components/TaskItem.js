// src/components/TaskItem.js
import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskContext } from './TaskContext';

const TaskItem = ({ task, index }) => {
  const { removeTask, toggleTask } = useContext(TaskContext);

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleRemove = () => {
    removeTask(task.id);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div style={{marginRight:300}}><li 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            border: snapshot.isDragging ? '2px dashed #1890ff' : 'none',
          }}
        >
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' ,}}>
          <b>Title:</b>{task.title}<br></br><b>durDate:</b>{task.dueDate}
          </span>
          <button onClick={handleToggle}>{task.completed ? 'Incomplete' : 'Complete'}</button>
          <button style={{marginLeft:-350}} onClick={handleRemove}>Remove</button>
        </li>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;

