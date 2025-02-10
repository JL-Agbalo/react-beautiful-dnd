import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
// import KanbanBoard from "./tutorials/koding/KanbanBoard";
// import Task from "./tutorials/koding/Task";
// import LaitureDnd from "./tutorials/laiture/laiture_dnd";
import KanbanBoard from "./tutorials/copilotdnd/KanbanBoard";

function App() {
  return (
    <div className="App bg-dark text-white min-vh-100">
      {/* <LaitureDnd /> */}
      {/* <KanbanBoard></KanbanBoard> */}
      <KanbanBoard />
    </div>
  );
}

export default App;
