import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd"; // Import Avatar from antd

const Container = styled.div`
  border-radius: 10px;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-right: 10px;
  margin-left: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2px;
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#fffada";
}

function Task({ task, index }) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                <div id={task.id}> </div>
              </small>
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <TextContent>{task.title}</TextContent>
          </div>
          <Icons>
            <Avatar
              src={"https://joesch.moe/api/v1/random?key=" + task.id}
            ></Avatar>
          </Icons>
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
