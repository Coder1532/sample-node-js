const express = require('express');
const cors = require('cors');  // Import the CORS package
const app = express();
const port = 3000;

// Disable CORS errors by allowing all origins
app.use(cors());

// POST endpoint to create a new user with inline JSON parsing
app.post('/user', express.json(), (req, res) => {
  const { name, age } = req.body;
  
  if (!name || !age) {
    return res.status(400).send('Name and age are required.');
  }
  
  res.status(201).send(`User ${name} aged ${age} has been created.`);
});

// GET endpoint to retrieve user information
app.get('/user', (req, res) => {
  const { name, age } = req.query;
  
  if (!name || !age) {
    return res.status(400).send('Name and age are required.');
  }
  
  res.send(`User ${name} is ${age} years old.`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
