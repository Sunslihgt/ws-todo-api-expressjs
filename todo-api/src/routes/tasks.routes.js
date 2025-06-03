const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks.controller.js');

const requiredFields = require('../middlewares/requiredFields.middleware.js');
const authentification = require('../middlewares/authentification.middleware.js');

router.post('/', authentification, requiredFields(["title", "content"]), tasksController.createTask);
router.get('/', authentification, tasksController.getAllTask);
router.get('/:id', authentification, tasksController.getTaskById);
router.delete('/:id', authentification, tasksController.deleteTaskById);
router.put('/:id', authentification, tasksController.putTaskById);
router.patch('/:id', authentification, requiredFields(["title", "content", "compteted"]), tasksController.patchTaskById);

module.exports = router;