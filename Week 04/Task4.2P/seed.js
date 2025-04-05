const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

const sampleData = [
  {
    title: 'Kitten 2',
    image: 'images/kitten2.png',
    link: 'About Kitten 2',
    description: 'Demo description about kitten 2',
  },
  {
    title: 'Kitten 3',
    image: 'images/kitten3.png',
    link: 'About Kitten 3',
    description: 'Demo description about kitten 3',
  },
];

async function seedDB() {
  try {
    await Project.deleteMany({});
    console.log('Old data removed');

    await Project.insertMany(sampleData);
    console.log('Sample data inserted');

    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  }
}

seedDB();
