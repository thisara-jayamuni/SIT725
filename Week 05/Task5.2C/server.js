const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB!');
});

// Routes
const projectsRoute = require('./routes/projects.route');
app.use('/api/projects', projectsRoute);

app.listen(port, () => {
  console.log('App listening to: ' + port);
});
