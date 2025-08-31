import { Router } from "express";
import { TodoRoutes } from "./todos/routes";
import { TodosController } from "./todos/controller";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
