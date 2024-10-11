import React, { SetStateAction } from "react";
import { Todo } from "../page";
import { LuPencil, LuTrash2 } from "react-icons/lu";

type Props = {
  todo: Todo;
  index: number;
  handleCheck: (index: number) => void;
  handleDel: (index: number) => void;
  setSelectedTodoIndex: (value: SetStateAction<number | null>) => void;
  setTodoInput: (value: SetStateAction<string>) => void;
};

const TodoItem = ({
  todo,
  index,
  handleCheck,
  handleDel,
  setSelectedTodoIndex,
  setTodoInput,
}: Props) => {
  return (
    <div className="flex justify-between items-center mb-2" key={index}>
      {/* Checkbox */}
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            handleCheck(index);
          }}
          id={`${index}`}
          className="h-5 w-5 rounded transition bg-gray-300 checked:text-indigo-600 checked:border-none border-none focus:ring-0 focus:ring-offset-0"
        />
        <label
          htmlFor={`${index}`}
          className={`text-xl ${todo.completed ? "line-through" : ""}`}
        >
          {todo.name}
        </label>
      </div>

      {/* Edit & Delete Btn */}
      <div className="flex gap-4 text-xl">
        <button
          data-testid="edit-btn" //for testing
          className="hover:text-green-600 transition-colors"
          onClick={() => {
            setSelectedTodoIndex(index);
            setTodoInput(todo.name);
          }}
        >
          <LuPencil />
        </button>
        <button
          data-testid="delete-btn" //for testing
          className="hover:text-red-600 transition-colors"
          onClick={() => handleDel(index)}
        >
          <LuTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
