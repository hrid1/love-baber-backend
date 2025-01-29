const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (todos.length === 0) {
      return res.status(204).json({
        success: false,
        message: "No Todos are available!",
      });
    }
    res.status(200).json({
      success: true,
      data: todos,
      message: "Entire Todo data is here",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal Error",
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "No Data Found!",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo-${id} Data Successfully Fetched`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal Error",
    });
  }
};
