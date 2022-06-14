import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { allCategoryState, categoryState } from "../atoms";
import styled from "styled-components";
interface ICategory {
  newCategory: string;
}
interface CategoryProps {
  props?: string;
}
function Category() {
  const [allCategory, setAllCategory] = useRecoilState(allCategoryState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [isCategoryInputShowed, setIsCategoryInputShowed] = useState(false);

  const { register, handleSubmit, setValue } = useForm<ICategory>();

  const onCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.value as string);
  };

  const handleValid = ({ newCategory }: ICategory) => {
    setAllCategory((oldCategory) => [...oldCategory, newCategory]);
    setValue("newCategory", "");
    setIsCategoryInputShowed(!isCategoryInputShowed);
  };

  return (
    <Cointainer>
      <CategoryBox>
        {allCategory.map((aCategory, idx) => (
          <CategoryItem
            props={aCategory === category ? "selected" : ""}
            key={idx}
            value={aCategory}
            onClick={onCategoryClick}
          >
            {aCategory}
          </CategoryItem>
        ))}
      </CategoryBox>
      {isCategoryInputShowed ? (
        <form onSubmit={handleSubmit(handleValid)}>
          <CategoryInput
            {...register("newCategory", {
              required: true,
            })}
            placeholder="카테고리 추가!"
          />
        </form>
      ) : (
        <CategoryAddButton
          onClick={() => setIsCategoryInputShowed(!isCategoryInputShowed)}
        >
          +
        </CategoryAddButton>
      )}
    </Cointainer>
  );
}

export default Category;

const Cointainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CategoryBox = styled.div`
  padding: 10px;
`;

const CategoryItem = styled.button<CategoryProps>`
  padding: 10px;
  background-color: ${(props) =>
    props.props === "selected" ? "#ff7f50" : props.theme.bgAccentColor};
  color: white;
  border-radius: 30px;
  border: none;
  margin-right: 10px;
`;

const CategoryAddButton = styled(CategoryItem)`
  padding: 8px 15px;
  font-size: 15px;
`;

const CategoryInput = styled.input`
  padding: 10px;
  border-radius: 15px;
  border: none;
`;
