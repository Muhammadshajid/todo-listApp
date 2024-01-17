// src/components/TaskList.js
import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TaskContext } from './TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, reorderTasks } = useContext(TaskContext);

  const handleDragEnd = result => {
    console.log('Drag End:', result);
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided, snapshot) => (
          <ul
          
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ background: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent' ,marginLeft:50,marginRight:100}}
          >
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
