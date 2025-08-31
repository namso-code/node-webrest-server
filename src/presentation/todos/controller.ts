import { Request, Response } from "express";

interface Todo {
  id: number;
  text: string;
  completedAt: Date | undefined;
}
const todos: Todo[] = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy milk", completedAt: new Date() },
  { id: 3, text: "Buy milk", completedAt: new Date() },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodosById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "not a number" });

    const todo = todos.find((todo) => todo.id === id);

    todo ? res.json(todo) : res.status(404).json({ error: "todo not found" });

    return res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const newTodo: Todo = {
      id: todos.length + 1,
      text: text,
      completedAt: undefined,
    };

    todos.push(newTodo);

    return res.json(newTodo);
  };

  public updateTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "not a number" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(400).json({ error: `todo with id ${id} not found` });

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;

    completedAt === "null"
      ? (todo.completedAt = undefined)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(todo);
  };

  public deleteTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: "not a number" });

    const todoDeleted = todos.find((todo) => todo.id === id);
    if (!todoDeleted)
      return res.status(400).json({ error: `todo with id ${id} not found` });

    todos.splice( todos.indexOf(todoDeleted), 1 )

    return res.json(todos);
  };
}
