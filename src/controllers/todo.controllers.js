import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Todo } from "../models/todo.models.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const todo = new Todo({
    title,
    description,
    owner: req.user._id,
    status, //optional
    dueDate: dueDate ? new Date(dueDate) : undefined,
  });

  todo.save();

  return res
    .status(201)
    .json(new ApiResponse(201, todo, "Todo created successfully!"));
});

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({
    owner: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, todos, "All todos get successfully."));
});

const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found.");
  }

  if (todo.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo get successfully."));
});

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found.");
  }

  if (todo.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized");
  }

  const { title, description, status, dueDate } = req.body;

  if (title) {
    todo.title = title;
  }

  if (description) {
    todo.description = description;
  }

  if (status) {
    todo.status = status;
  }
  if (dueDate) {
    todo.dueDate = dueDate ? new Date(dueDate) : null;
  }

  await todo.save();

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo updated successfully."));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, "Todo not found.");
  }

  if (todo.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized.");
  }

  await todo.deleteOne();

  return res
    .status(204)
    .json(new ApiResponse(204, null, "Todo deleted successfully."));
});

export { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
