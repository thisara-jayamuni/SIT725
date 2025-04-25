const chai = require('chai');
const sinon = require('sinon');
const Project = require('../models/project');
const service = require('../services/projects.service');

const { expect } = chai;

describe('Project Service - Unit Tests', () => {
  const sampleProjectData = {
    title: 'Kitten Test',
    image: 'images/kitten_test.png',
    link: 'About Kitten Test',
    description: 'Demo description about kitten test',
  };

  afterEach(() => sinon.restore());

  it('should return all projects', async () => {
    const stubData = [sampleProjectData];
    sinon.stub(Project, 'find').resolves(stubData);

    const result = await service.get();
    expect(result).to.eql(stubData);
  });

  it('should add a project', async () => {
    sinon.stub(Project.prototype, 'save').resolves(sampleProjectData);

    const result = await service.add(sampleProjectData);
    expect(result).to.eql(sampleProjectData);
    expect(result.title).to.equal('Kitten Test');
  });

  it('should update a project', async () => {
    const updatedData = { ...sampleProjectData, title: 'Updated Kitten Test' };
    sinon.stub(Project, 'findByIdAndUpdate').resolves(updatedData);

    const result = await service.update('123abc', updatedData);
    expect(result.title).to.equal('Updated Kitten Test');
  });

  it('should delete a project', async () => {
    sinon.stub(Project, 'findByIdAndDelete').resolves(sampleProjectData);

    const result = await service.remove('123abc');
    expect(result.title).to.equal('Kitten Test');
  });
});
