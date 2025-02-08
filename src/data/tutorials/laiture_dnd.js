import React, { useState } from "react";
import { initialData } from "../initialData";
import "./laiture_dnd.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Laiture_dnd() {
  const [stores, setStores] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);
      setStores(reorderedStores);
    } else {
      const storeSourceIndex = stores.findIndex(
        (store) => store.id === source.droppableId
      );

      const storeDestinationIndex = stores.findIndex(
        (store) => store.id === destination.droppableId
      );

      const newSourceItems = [...stores[storeSourceIndex].items];
      const newDestinationItems =
        source.droppableId !== destination.droppableId
          ? [...stores[storeDestinationIndex].items]
          : newSourceItems;
      const [deletedItem] = newSourceItems.splice(source.index, 1);
      newDestinationItems.splice(destination.index, 0, deletedItem);

      const newStores = [...stores];
      newStores[storeSourceIndex] = {
        ...stores[storeSourceIndex],
        items: newSourceItems,
      };
      if (source.droppableId !== destination.droppableId) {
        newStores[storeDestinationIndex] = {
          ...stores[storeDestinationIndex],
          items: newDestinationItems,
        };
      }
      setStores(newStores);
    }
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
                      >
                        <StoreList {...store} />
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

function StoreList({ name, items = [], id }) {
  return (
    <Droppable droppableId={id} type="item">
      {(provided) => (
        <div
          className="store"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="store-container">
            <h3>{name}</h3>
          </div>
          <div className="item-container">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Laiture_dnd;
