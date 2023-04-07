import { Router } from "express";
import { categoriesProjectRoutes } from "./categoryProject.routes";

const router = Router();
router.use('/categories-project', categoriesProjectRoutes);

export { router };