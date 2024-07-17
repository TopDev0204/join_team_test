const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/userRoutes');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
