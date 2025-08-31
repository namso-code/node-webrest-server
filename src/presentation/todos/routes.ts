import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const todosController = new TodosController();

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodosById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodoById);
       router.delete("/:id", todosController.deleteTodoById);
    return router;
  }
}
