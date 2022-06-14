import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
import {
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import styled from "styled-components";

interface ToDoProps {
  props?: string;
}

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onDeleteTodo = () => {
    setToDos((data) => {
      const targetIndex = data.findIndex((todo) => todo.id === id);
      return [...data.slice(0, targetIndex), ...data.slice(targetIndex + 1)];
    });
  };

  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id: newCategory } = e.currentTarget;
    if (
      newCategory === "Todo" ||
      (newCategory !== "Doing" && newCategory !== "Done")
    )
      setToDos((data) => {
        const targetIndex = data.findIndex((todo) => todo.id === id);
        const newTodo = { text, id, category: "Doing" as any };
        return [
          ...data.slice(0, targetIndex),
          newTodo,
          ...data.slice(targetIndex + 1),
        ];
      });
    if (newCategory === "Doing")
      setToDos((data) => {
        const targetIndex = data.findIndex((todo) => todo.id === id);
        const newTodo = { text, id, category: "Done" as any };
        return [
          ...data.slice(0, targetIndex),
          newTodo,
          ...data.slice(targetIndex + 1),
        ];
      });
    if (newCategory === "Done")
      setToDos((data) => {
        const targetIndex = data.findIndex((todo) => todo.id === id);
        const newTodo = { text, id, category: "Todo" as any };
        return [
          ...data.slice(0, targetIndex),
          newTodo,
          ...data.slice(targetIndex + 1),
        ];
      });
  };

  return (
    <Container>
      <div onClick={handleChange} id={category}>
        {(category === "All" ||
          category === "Todo" ||
          (category !== "Doing" && category !== "Done")) && (
          <MdRadioButtonUnchecked
            values="Todo"
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
        )}
        {category === "Doing" && (
          <MdRadioButtonChecked
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
        )}
        {category === "Done" && (
          <MdOutlineCheckCircleOutline
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
        )}
      </div>

      <TodoTextBox>
        <TodoText props={category === "Done" ? "Done" : ""}>{text}</TodoText>
      </TodoTextBox>
      <DeleteButton name="Delete" onClick={onDeleteTodo}>
        Delete
      </DeleteButton>
    </Container>
  );
}

export default ToDo;

const Container = styled.li`
  display: flex;
  align-items: center;
  background-color: #3742fa;
  border-radius: 30px;
  padding: 5px;
  margin-bottom: 10px;
`;
const TodoTextBox = styled.div`
  background-color: "white";
`;

const TodoText = styled.span<ToDoProps>`
  margin-right: 10px;
  ${(props) => props.props === "Done" && "text-decoration: line-through"}
`;

const DeleteButton = styled.button`
  border-radius: 15px;
  border: none;
  padding: 5px 10px;
  background-color: #ff6b81;
`;
