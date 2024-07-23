const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
    try {
        const toDo = await ToDoModel.find();
        res.send(toDo);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching to-do items");
    }
};

module.exports.saveToDo = async (req, res) => {
    const { text } = req.body;

    try {
        const data = await ToDoModel.create({ text });
        console.log("Added successfully.");
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving to-do item");
    }
};

module.exports.updateToDo = async (req, res) => {
    const {_id, text } = req.body;

    try {
        const result = await ToDoModel.findByIdAndUpdate(_id, { text }, { new: true });
        if (result) {
            res.send("Updated successfully.");
        } else {
            res.status(404).send("To-do item not found.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating to-do item");
    }
};

module.exports.deleteToDo = async (req, res) => {
    const {_id } = req.body;

    try {
        const result = await ToDoModel.findByIdAndDelete(_id);
        if (result) {
            res.send("Deleted successfully.");
        } else {
            res.status(404).send("To-do item not found.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting to-do item");
    }
};
