//? Aquí estarán todas las rutas

const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js"); 


//* - POST /create: Endpoint para crear una tarea.

router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(
            { 
            ...req.body, // el titulo se lo pido al usuario
            completed : false // al crear la tarea, lo ponemos por defecto en -false-
            }
        );
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});

//* - GET /: Endpoint para traer todas las tareas.

router.get("/", async(req, res) => {
    try {
        const tasks = await Task.find(); //find() Finds all documents that match a query. Returns an array.
        res.status(200).json(tasks); 
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying get all the tasks" });
    }
});

//* - GET /id/:_id: Endpoint para buscar tarea por id.

router.get("/id/:_id", async (req, res) => {
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
});

//* PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.

router.put('/markAsCompleted/:_id', async (req, res) => {
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
});


//! PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo  “completed” desde este endpoint, sino solo, el título.

router.put("/id/:_id", async (req, res) => {
    try {
        const id = req.params._id; // i ask the user for this param
        const { title } = req.body; //i get the title from the body

        // Ensure title is provided
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // Update only the title
        const updatedTask = await Task.updateOne(
            { _id: id }, // Find the task by ID
            { $set: { title } } // Only update the title field
        );

        // Check if a document was modified
        if (updatedTask.modifiedCount === 0) {
            return res.status(404).json({ message: "Task not found or title was not changed" });
        }

        const task = await Task.findById(id);
        res.status(200).json(task);

    } catch (error) {
        console.error("Error updating task title:", error);
        res.status(500).json({ message: "There was a problem trying to update the task title" });
    }
});

//* - DELETE /id/:_id: Endpoint para eliminar una tarea.

router.delete('/id/:_id', async (req, res) => {
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
});

module.exports = router;