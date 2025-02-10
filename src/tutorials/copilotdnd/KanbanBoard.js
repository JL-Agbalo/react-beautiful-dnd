import React, { useState } from "react";
import Column from "./Column";
import { initialData } from "../../data/initialData";

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);

  return (
    <div className="container mt-4 bg-dark text-white">
      <h1 className="text-center mb-4">Kanban Board</h1>
      <div className="row">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
