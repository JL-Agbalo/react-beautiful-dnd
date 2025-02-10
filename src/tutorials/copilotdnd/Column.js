import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column }) => {
  return (
    <div className="col-md-3">
      <div className={`card bg-secondary text-white mb-4 tint-${column.tint}`}>
        <div className="card-body text-center">
          <h2 className="card-title">{column.name}</h2>
          <Droppable droppableId={column.id}>
            {(provided) => (
              <div
                className="tasks"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {column.items &&
                  column.items.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default Column;
