import React, { useState } from "react";
import Column from "./Column";
import { initialData } from "../../data/initialData";
import { DragDropContext } from "react-beautiful-dnd";

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("result: ", result);
    if (!destination) {
      return;
    }

    const sourceColumn = columns.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = columns.find(
      (column) => column.id === destination.droppableId
    );

    const sourceItems = Array.from(sourceColumn.items);
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      const newColumns = columns.map((column) =>
        column.id === source.droppableId
          ? { ...column, items: sourceItems }
          : column
      );
      setColumns(newColumns);
    } else {
      const destinationItems = Array.from(destinationColumn.items);
      destinationItems.splice(destination.index, 0, removed);
      const newColumns = columns.map((column) => {
        if (column.id === source.droppableId) {
          return { ...column, items: sourceItems };
        } else if (column.id === destination.droppableId) {
          return { ...column, items: destinationItems };
        } else {
          return column;
        }
      });
      setColumns(newColumns);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
