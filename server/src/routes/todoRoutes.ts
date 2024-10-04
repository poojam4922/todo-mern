import express, { Request, Response } from "express";
import { addTodo, getTodoById, updateTodo, deleteTodo, getSearchTodos} from "../controllers/todoController";
const router = express.Router();
import { ValidateTodo, validate } from "../middleware/ValidateTodo";
router.post('/', ValidateTodo(), validate, addTodo)
router.get('/:id', getTodoById);
router.put('/:id', ValidateTodo(),validate, updateTodo);
router.delete('/:id', deleteTodo);
router.get('/', getSearchTodos)
// router.get('/fetchAll', fetchAllTodos)

export {
    router
}