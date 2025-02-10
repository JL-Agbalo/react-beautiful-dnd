import React from "react";

const Task = ({ task }) => {
  return (
    <div className="card bg-dark text-white mb-2">
      <div className="card-body text-center">
        <p className="card-text">{task.name}</p>
      </div>
    </div>
  );
};

export default Task;
