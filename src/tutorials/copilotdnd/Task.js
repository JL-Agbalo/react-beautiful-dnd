import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="card bg-dark text-white mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-body text-center">
            <p className="card-text">{task.name}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
