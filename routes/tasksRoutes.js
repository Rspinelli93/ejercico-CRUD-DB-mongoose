//? Aquí estarán todas las rutas

const express = require("express");
const router = express.Router();
 
const { create, getAll, getById, markAsCompleted, changeTitle, deleteTask } = require("../controllers/taskControllers.js")

router.post("/create", create);
router.get("/", getAll);
router.get("/id/:_id", getById);
router.put('/markAsCompleted/:_id', markAsCompleted);
//!router.put("/id/:_id", changeTitle);
router.delete('/id/:_id', deleteTask);

module.exports = router;