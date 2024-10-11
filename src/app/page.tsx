"use client";

import { ChangeEventHandler, FormEvent, useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import TodoItem from "./components/todo-item";

export interface Todo {
  name: string;
  completed: boolean;
}

export default function Home() {
  // To-do state
  const [todos, setTodos] = useState<Todo[]>([]);

  // For editing a todo
  const [selectedTodoIndex, setSelectedTodoIndex] = useState<number | null>(
    null
  );

  // to-do input
  const [todoInput, setTodoInput] = useState<string>("");

  // handle Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoInput) {
      // edit a todo
      if (selectedTodoIndex != null) {
        console.log(selectedTodoIndex);

        let tempTodos = todos;
        tempTodos[selectedTodoIndex].name = todoInput;
        setTodos([...tempTodos]);
        setTodoInput("");
        setSelectedTodoIndex(null);
        return;
      }

      // add new todo
      setTodos([...todos, { name: todoInput, completed: false }]);
      setTodoInput("");
    }
  };

  // Handle Check
  const handleCheck = (index: number) => {
    let tempTodos = todos;
    tempTodos[index].completed = !tempTodos[index].completed;
    setTodos([...tempTodos]);
  };

  // Handle Delete
  const handleDel = (index: number) => {
    let tempTodos = todos;
    tempTodos.splice(index, 1);
    setTodos([...tempTodos]);
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <section className="shadow max-h-[75vh] min-h-[50vh] max-w-screen-sm w-full bg-white p-10 flex flex-col items-center">
        <h1 className="font-bold text-4xl mb-10">To-Do List</h1>

        {/* todo input */}
        <form
          className="w-full mb-10"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="flex justify-center">
            <div className="w-1/2">
              <input
                data-testid="todo-input"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                type="text"
                name="text"
                id="text"
                className="bg-gray-200 border-none focus:outline-none focus:border-none focus:ring-0 w-full"
              />
            </div>
            <button
              data-testid="add-edit-btn"
              type="submit"
              className="py-1 px-4 bg-orange-400 hover:opacity-75 transition-opacity"
            >
              {selectedTodoIndex != null ? "EDIT" : "ADD"}
            </button>
          </div>
        </form>

        {/* todo display */}
        <div className="max-h-[75%] overflow-y-scroll w-3/4">
          {/* use map to loop through todos and display each todo as todo item */}
          {todos.map((todo, index) => {
            return (
              <TodoItem
                todo={todo}
                index={index}
                setTodoInput={setTodoInput}
                handleCheck={handleCheck}
                handleDel={handleDel}
                setSelectedTodoIndex={setSelectedTodoIndex}
                key={index}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
