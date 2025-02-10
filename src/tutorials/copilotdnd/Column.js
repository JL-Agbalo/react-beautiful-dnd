import React from "react";
import Task from "./Task";

const Column = ({ column }) => {
  return (
    <div className="col-md-3">
      <div className={`card bg-secondary text-white mb-4 tint-${column.tint}`}>
        <div className="card-body text-center">
          <h2 className="card-title">{column.name}</h2>
          <div className="tasks">
            {column.items &&
              column.items.map((task) => <Task key={task.id} task={task} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;
