const express = require('express');
const router = express.Router();
const { projectsController } = require('../controllers');

router.get('/', projectsController.getProjects);
router.post('/', projectsController.addProject);
router.put('/:id', projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

module.exports = router;
