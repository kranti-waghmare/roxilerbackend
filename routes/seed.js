const express = require('express');
const { seedDatabase } = require('../controllers/seedController');
// const seedRoutes = require('./routes/seed');


const router = express.Router();

router.post('/seed', seedDatabase);

module.exports = router;
