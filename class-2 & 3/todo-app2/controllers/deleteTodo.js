const Todo = require("../models/Todo");

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete({ _id: id });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Todo not Found!",
      });
    }
    res.status(200).json({
      success: true,
      data: result,
      message: "Successfully Deleted Todo",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal Error",
    });
  }
};
