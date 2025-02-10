const Task = require("../models/Task.js"); 

//* - POST /create: Endpoint para crear una tarea.

const create = async(req, res) => {
    try {
        const task = await Task.create(
            { 
            title: req.body.title, // el titulo se lo pido al usuario
            completed : false // al crear la tarea, lo ponemos por defecto en -false-
            }
        );
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
}

//* - GET /: Endpoint para traer todas las tareas.

const getAll = async(req, res) => {
    try {
        const tasks = await Task.find(); //find() Finds all documents that match a query. Returns an array.
        res.status(200).json(tasks); 
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying get all the tasks" });
    }
}

//* - GET /id/:_id: Endpoint para buscar tarea por id.

const getById = async (req, res) => {
    try {
        const id = req.params._id;  // Extract ID from route parameters

        // findById() is a Mongoose method used to find a document by its id.
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to get this task" });
    }
}

//* PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.

const markAsCompleted = async (req, res) => {
    try {
        const id = req.params._id;  // Extract ID from route parameters

        // findByIdAndUpdate() Updates and returns the old document (use { new: true } to return the updated one).
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { completed: true },
            { new: true } // Return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to mark it as complete" });
    }
}

//* PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo  “completed” desde este endpoint, sino solo, el título.
//! Esto no funciona

const changeTitle = async (req, res) => {
    try {
        const id = req.params_id; // Ensure it's `id`, not `_id`
        const {titleMod} = req.body.title; // get from body
            console.log('Este es', {titleMod});
            
        // Validate input
        if (!titleMod) {
            return res.status(400).json({ message: "Title is required" });
        }

        // Find and update the task in a single query
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: { title: titleMod } }, 
            { new: true } // Return updated task
        );

        // Check if the task exists
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task title:", error);
        res.status(500).json({ message: "There was a problem updating the task title" });
    }
};


//* - DELETE /id/:_id: Endpoint para eliminar una tarea.

const deleteTask = async (req, res) => {
    try {
        const id = req.params._id;  // Extract ID from route parameters

        // deleteOne() Deletes the first document that matches the query.
        const deletedTask = await Task.deleteOne({ _id: id });

        if (deletedTask === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(deletedTask);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to delete the task" });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    markAsCompleted,
    changeTitle, 
    deleteTask
}