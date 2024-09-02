const express = require('express');
const cors = require('cors');  // Import the CORS package
const cron = require('node-cron');
const app = express();
const port = 3000;

// Disable CORS errors by allowing all origins
app.use(cors());


let cronTask = null;

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



// Endpoint to start the cron job
app.get('/start-cron', (req, res) => {
    if (!cronTask) {
        cronTask = cron.schedule('*/5 * * * * *', () => {
            console.log('Cron job is running every 5 seconds');
        });
        res.send('Cron job started.');
    } else {
        res.send('Cron job is already running.');
    }
});

// Endpoint to stop the cron job
app.get('/stop-cron', (req, res) => {
    if (cronTask) {
        cronTask.stop();
        cronTask = null;
        res.send('Cron job stopped.');
    } else {
        res.send('No cron job is running.');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

