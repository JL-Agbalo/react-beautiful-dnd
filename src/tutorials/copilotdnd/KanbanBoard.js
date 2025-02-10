import React, { useState } from "react";
import Column from "./Column";
import { initialData } from "../../data/initialData";
import { DragDropContext } from "react-beautiful-dnd";

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If there's no destination (dropped outside any droppable), do nothing
    if (!destination) return;

    // Find the source and destination columns
    const sourceColumn = columns.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = columns.find(
      (column) => column.id === destination.droppableId
    );

    // Create a copy of the items in the source column
    const sourceItems = Array.from(sourceColumn.items);
    // Remove the dragged item from the source column
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // If the item is dropped in the same column, insert it back to the new position
      sourceItems.splice(destination.index, 0, movedItem);
      // Update the columns state with the new items order
      const newColumns = columns.map((column) =>
        column.id === source.droppableId
          ? { ...column, items: sourceItems }
          : column
      );
      setColumns(newColumns);
    } else {
      // If the item is dropped in a different column
      // Create a copy of the items in the destination column
      const destinationItems = Array.from(destinationColumn.items);
      // Insert the item into the new position in the destination column
      destinationItems.splice(destination.index, 0, movedItem);
      // Update the columns state with the new items order in both columns
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
