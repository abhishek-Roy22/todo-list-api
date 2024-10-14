import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '../controllers/todoController.js';

const todoRoute = Router();

todoRoute.get('/create', (req, res) => {
  res.render('Create', {
    user: req.user,
  });
});

todoRoute.post('/create', createTodo);
todoRoute.get('/:id', getTodo);
todoRoute.put('/:id', updateTodo);
todoRoute.delete('/:id', deleteTodo);
todoRoute.get('/', getTodos);

export default todoRoute;
