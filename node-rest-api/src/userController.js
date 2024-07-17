const User = require('./userModel');
const haversine = require('haversine');

const getUsersWithinRadius = async (req, res) => {
  const { latitude, longitude } = req.query;
  const radius = 10; // Radius in kilometers

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const users = await User.find();
    const userDistances = users.map(user => {
      const start = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
      const end = { latitude: user.latitude, longitude: user.longitude };
      const distance = haversine(start, end, { unit: 'km' });
      return { user, distance };
    });

    const filteredUsers = userDistances.filter(item => item.distance <= radius);
    filteredUsers.sort((a, b) => a.distance - b.distance);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const resultUsers = filteredUsers.slice(startIndex, endIndex);

    res.json(resultUsers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createUser = async (req, res) => {
  const { name, latitude, longitude } = req.body;
  if (!name || !latitude || !longitude) {
    return res.status(400).json({ error: 'Name, latitude, and longitude are required.' });
  }

  try {
    const newUser = new User({ name, latitude, longitude });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getUsersWithinRadius, createUser };
