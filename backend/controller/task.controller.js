const Task = require("../model/task.model");

exports.createTask = async (req, res) => {
  try {
    await Task.create(req.body).then((data) => {
      res.status(201).send({ data: data, message: "task created success..." });
    });
  } catch (error) {
    res.status(500).send({ message: "internal server down" });
  }
};

exports.fetchTask = async (req, res) => {
  try {
    const task = await Task.find();
    if (task) {
      res.status(200).send({ data: task });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server down" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.query.id).then((data) => {
      res.status(200).send({ message: "task deleted..." });
    });
  } catch (error) {
    res.status(500).send({ message: "internal server down" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.body._id, req.body).then((data) => {
      res.status(200).send({ message: "task updated..." });
    });
  } catch (error) {
    res.status(500).send({ message: "internal server down" });
  }
};
