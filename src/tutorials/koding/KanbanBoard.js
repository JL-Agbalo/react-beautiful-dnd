import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  return;
  <DragDropContext>
    <h2 style={{ textAlign: "center" }}>Progress Board</h2>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    ></div>
  </DragDropContext>;
}

export default KanbanBoard;
