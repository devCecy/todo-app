import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IToDo {
  text: string;
  id: number;
  category: string;
}
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const allCategoryState = atom<string[]>({
  key: "allCategory",
  default: ["All", "Todo", "Doing", "Done"],
  effects_UNSTABLE: [persistAtom],
});
export const categoryState = atom<string>({
  key: "category",
  default: "All",
});

export const toDoSelecter = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return category === "All"
      ? toDos
      : toDos?.filter((toDo) => toDo?.category === category);
  },
});

export const isDarkAtom = atom({
  key: "isDarkMode",
  default: false,
});
