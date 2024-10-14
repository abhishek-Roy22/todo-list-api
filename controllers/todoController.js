import { Todo } from '../models/todoModel.js';

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  await Todo.create({
    title,
    description,
    createdBy: req.user._id,
  });
  return res.status(201).redirect('/');
};

const getTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.render('Home', {
    user: req.user,
    Todos: todos,
  });
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    return res.render('Details', {
      user: req.user,
      Todo: todo,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Todo.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
  }
};

export { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
