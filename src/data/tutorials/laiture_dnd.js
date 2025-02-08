import React, { useState } from "react";
import { initialData } from "../initialData";
import "./laiture_dnd.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Laiture_dnd() {
  const [stores, setStores] = useState(initialData);

  const onDragEnd = (result) => {
    // Handle drag end logic here
    console.log("Drag ended", result);
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="header">
            <h1>Shopping List</h1>
          </div>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    index={index}
                    key={store.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="store-container"
                      >
                        <h3>{store.name}</h3>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Laiture_dnd;
