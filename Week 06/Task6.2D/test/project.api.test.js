const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const routes = require('../routes/projects.route');
const { expect } = require('chai');

const app = express();
app.use(express.json());
app.use('/api/projects', routes);

let mongoServer;

const sampleProjectData = {
  title: 'Kitten Test',
  image: 'images/kitten_test.png',
  link: 'About Kitten Test',
  description: 'Demo description about kitten test',
};

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('API Tests - /api/projects', () => {
  let createdProjectId;

  it('POST / should create a project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send(sampleProjectData);

    expect(res.status).to.equal(200);
    expect(res.body.newProject.title).to.equal('Kitten Test');
    createdProjectId = res.body.newProject._id;
  });

  it('GET / should return all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).to.equal(200);
    expect(res.body.projects).to.be.an('array');
    expect(res.body.projects[0].title).to.equal('Kitten Test');
  });

  it('PUT /:id should update the project', async () => {
    const updatedData = { ...sampleProjectData, title: 'Updated Kitten Test' };

    const res = await request(app)
      .put(`/api/projects/${createdProjectId}`)
      .send(updatedData);

    expect(res.status).to.equal(200);
    expect(res.body.updatedProject.title).to.equal('Updated Kitten Test');
  });

  it('DELETE /:id should delete the project', async () => {
    const res = await request(app).delete(`/api/projects/${createdProjectId}`);
    expect(res.status).to.equal(200);
    expect(res.body.deletedProject.title).to.equal('Updated Kitten Test');
  });
});
