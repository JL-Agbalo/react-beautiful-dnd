import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const tasks = Array.isArray(json) ? json : [json];
        setCompleted(tasks.filter((task) => task.completed));
        setIncomplete(tasks.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;
    //  Remove from srouce array
    if (source.droppableId === 2) {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    function findItemById(id, array) {
      return array.find((item) => item.id === id);
    }

    function removeItemById(id, array) {
      return array.filter((item) => item.id !== id);
    }

    // GET ITEM
    const task = findItemById(draggableId, [...incomplete, ...completed]);

    // ADD ITEM
    if (destination.droppableId === 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>Progress Board</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Column title="To Do" task={incomplete} id={"1"} />
        <Column title="Done" task={completed} id={"2"} />
        <Column title="Backlog" task={[]} id={"3"} />
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
