import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  console.log("category", category);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((data) => [
      {
        id: Date.now(),
        text: toDo,
        category: category === "All" ? "Todo" : category,
      },
      ...data,
    ]);
    setValue("toDo", "");
  };
  return (
    <FormContainer onSubmit={handleSubmit(handleValid)}>
      <ToDoInput
        {...register("toDo", {
          required: true,
        })}
        placeholder="Write a todo..."
      />
      <Button>Add</Button>
    </FormContainer>
  );
}

export default CreateToDo;

const FormContainer = styled.form`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToDoInput = styled.input`
  width: 85%;
  padding: 10px;
  margin-right: 5px;
  border-radius: 15px;
  border: none;
`;

const Button = styled.button`
  width: 15%;
  padding: 10px;
  background-color: ${(props) => props.theme.bgAccentColor};
  color: white;
  border: none;
  border-radius: 15px;
`;
