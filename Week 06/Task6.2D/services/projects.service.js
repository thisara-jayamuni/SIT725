const Project = require('../models/project');

exports.get = async () => {
  try {
    return await Project.find();
  } catch (error) {
    throw new Error('Could not fetch projects');
  }
};

exports.add = async (projectData) => {
  try {
    const project = new Project(projectData);
    return await project.save();
  } catch (error) {
    throw new Error('Could not add project');
  }
};

exports.update = async (id, projectData) => {
  try {
    return await Project.findByIdAndUpdate(id, projectData, { new: true });
  } catch (error) {
    throw new Error('Could not update project');
  }
};

exports.remove = async (id) => {
  try {
    return await Project.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Could not delete project');
  }
};
