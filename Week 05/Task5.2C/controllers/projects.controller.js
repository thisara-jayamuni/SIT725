const { get, add, update, remove } = require('../services/projects.service');

const getProjects = async (req, res) => {
  try {
    const projects = await get();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: { error } });
  }
};

const addProject = async (req, res) => {
  try {
    const newProject = await add(req.body);
    res.status(200).json({ newProject });
  } catch (error) {
    res.status(500).json({ message: { error } });
  }
};

const updateProject = async (req, res) => {
  try {
    const updatedProject = await update(req.params.id, req.body);
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ updatedProject });
  } catch (error) {
    res.status(500).json({ message: { error } });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await remove(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ deletedProject });
  } catch (error) {
    res.status(500).json({ message: { error } });
  }
};

module.exports = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
};
