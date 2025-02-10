# 📌 Study Notes for `react-beautiful-dnd`

## 1⃣ What is `react-beautiful-dnd`?

`react-beautiful-dnd` is a React library created by Atlassian for implementing drag-and-drop (DND) functionality with smooth animations and accessibility features. It provides an intuitive API to handle reordering of lists and grids, making it easy to create interactive and user-friendly interfaces.

## 2⃣ Installation

You can install `react-beautiful-dnd` using npm or yarn:

```bash
npm install react-beautiful-dnd
```

or

```bash
yarn add react-beautiful-dnd
```

## 3⃣ Core Concepts

### 🏠 Components:

- **`DragDropContext`**: This is the top-level component that wraps all other DND components. It provides the context for drag-and-drop operations and handles the overall state and events.
- **`Droppable`**: This component defines the area where draggable items can be dropped. It acts as a container for `Draggable` components.
- **`Draggable`**: This component represents an item that can be dragged. It must be a child of a `Droppable` component.

### 🔄 Key Props:

- `onDragEnd`: A required function in `DragDropContext` that handles the logic when dragging stops. It receives a `result` object containing information about the drag event, such as the source and destination indices.
- `provided` & `snapshot`: These are objects provided by `Droppable` and `Draggable` components to style and manage state during dragging. `provided` contains properties and methods to be applied to the components, while `snapshot` contains information about the current drag state.

---

## 4⃣ Basic Example

Here is a basic example to demonstrate how to use `react-beautiful-dnd`:

```jsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Initial list of items
const initialItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
];

const DnDExample = () => {
  const [items, setItems] = useState(initialItems);

  // Function to handle the end of a drag event
  const handleDragEnd = (result) => {
    // If the item is dropped outside a droppable area, do nothing
    if (!result.destination) return;

    // Create a new array of items
    const newItems = Array.from(items);
    // Remove the dragged item from its original position
    const [movedItem] = newItems.splice(result.source.index, 1);
    // Insert the dragged item into its new position
    newItems.splice(result.destination.index, 0, movedItem);

    // Update the state with the new list of items
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "10px",
                      margin: "5px",
                      backgroundColor: "lightblue",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DnDExample;
```

## 5⃣ Key Takeaways

- Always wrap the DND components with `DragDropContext`.
- Every `Droppable` must have a unique `droppableId`.
- Each `Draggable` requires a unique `draggableId` and an `index`.
- Use `provided.innerRef` and `provided.draggableProps` for correct drag behavior.
- `onDragEnd` is **required** to update state after dragging ends.

## 6⃣ Useful Resources

- 📖 [Official Docs](https://github.com/atlassian/react-beautiful-dnd)
- 📹 [YouTube Tutorials](https://www.youtube.com/results?search_query=react+beautiful+dnd)
- 💻 [CodeSandbox Examples](https://codesandbox.io/s/react-beautiful-dnd)

## 7. Splice

- Array.prototype.splice(start, [deleteCount], [itemToAdd...])
- removes elements from an array
- will modify the exsiting array
- return a new array of the elements removed
