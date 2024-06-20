const axios = require('axios');
const Item = require('../models/Item');

const seedDatabase = async (req, res) => {
  try {
    const response = await axios.get(process.env.THIRD_PARTY_API_URL);
    const data = response.data;

    // Clear existing items
    await Item.deleteMany({});

    // Insert new items
    await Item.insertMany(data);

    res.status(200).json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to seed database', error: error.message });
  }
};

module.exports = { seedDatabase };
