import { statusTodoSeed } from "./status-todo";
import { categoryProjectSeed } from "./category-project";

statusTodoSeed().then(() => console.log("Status Was Created!"))
categoryProjectSeed().then(() => console.log("Category was Created!"));
