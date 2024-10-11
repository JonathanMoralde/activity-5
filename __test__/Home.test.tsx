import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";

describe("Todo List", () => {
  // Test if H1 is properly rendered
  it("should render the heading", () => {
    render(<Home />);
    const heading = screen.getByText(/To-Do List/i);
    expect(heading).toBeInTheDocument();
  });

  //   Test if add button is working
  it("should add a new todo item", () => {
    render(<Home />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-edit-btn");

    // Add a new todo item
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    // Make sure that the todo item was successfully added
    const todoItem = screen.getByText(/New Todo/i);
    expect(todoItem).toBeInTheDocument();
  });

  //   Test if checkbox state is being toggled properly
  it("should toggle a todo item as completed", () => {
    render(<Home />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-edit-btn");

    // Add a new todo item
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    // perform a click on the checkbox
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Checks if the item has the 'line-through' class after being marked as completed
    const todoItem = screen.getByText(/New Todo/i);
    expect(todoItem).toHaveClass("line-through");
  });

  //   test if an item is deleted properly
  it("should delete a todo item", () => {
    render(<Home />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-edit-btn");

    // Add a new todo item
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    // grab delete button and fire a click event
    const deleteButton = screen.getByTestId("delete-btn");
    fireEvent.click(deleteButton);

    // make sure that todo item was deleted
    const todoItem = screen.queryByText(/New Todo/i);
    expect(todoItem).not.toBeInTheDocument();
  });
});

// test if an item is being edited
it("should edit a todo item", () => {
  render(<Home />);

  const input = screen.getByTestId("todo-input");
  const submitButton = screen.getByTestId("add-edit-btn");

  // Add a new todo item first
  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(submitButton);

  //   grab edit button, change the value, and submit
  const editButton = screen.getByTestId("edit-btn");
  fireEvent.click(editButton);
  fireEvent.change(input, { target: { value: "Edited Todo" } });
  fireEvent.click(submitButton);

  //   make sure the todo item was edited successfully
  const todoItem = screen.queryByText(/Edited Todo/i);
  expect(todoItem).toBeInTheDocument();
});
