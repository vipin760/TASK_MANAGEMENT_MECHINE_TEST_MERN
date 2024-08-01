const express = require("express");
const {
  createTask,
  fetchTask,
  deleteTask,
  updateTask,
} = require("../controller/task.controller");
const router = express();

router
  .route("/")
  .post(createTask)
  .get(fetchTask)
  .delete(deleteTask)
  .put(updateTask);

module.exports = router;
