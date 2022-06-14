import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelecter } from "../atoms";
import Category from "./Category";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelecter);
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  return (
    <Container>
      <Title>Cecy's Todo List</Title>
      <Today>{`${year}년 ${month}월 ${date}일`}</Today>
      <CreateToDo />
      <Category />
      <ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Container>
  );
}

export default ToDoList;

const Container = styled.div`
  padding: 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.title`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const Today = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
