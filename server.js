const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const Item = require('./models/Item'); // Adjust path as per your project structure

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Database connection error:', err));

// Calculate total sale amount of selected month

app.post('/api/total-sale-amountadd', async(req,res)=>{
  try {
    const { month } = req.query;
    const startDate = new Date(month);
    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1);

    const totalSaleAmount = await Item.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startDate,
            $lt: endDate,
          },
          sold: true,
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }
        }
      }
    ]);

    res.json({ totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0 });
  } catch (error) {
    console.error('Error calculating total sale amount:', error);
    res.status(500).json({ error: 'Failed to calculate total sale amount' });
  }
});


app.get('/api/total-sale-amount', async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(month);
    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1);

    const totalSaleAmount = await Item.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startDate,
            $lt: endDate,
          },
          sold: true,
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }
        }
      }
    ]);

    res.json({ totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0 });
  } catch (error) {
    console.error('Error calculating total sale amount:', error);
    res.status(500).json({ error: 'Failed to calculate total sale amount' });
  }
});

// Calculate total number of sold items of selected month
app.get('/api/total-sold-items', async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(month);
    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1);

    const totalSoldItems = await Item.countDocuments({
      dateOfSale: {
        $gte: startDate,
        $lt: endDate,
      },
      sold: true,
    });

    res.json({ totalSoldItems });
  } catch (error) {
    console.error('Error calculating total sold items:', error);
    res.status(500).json({ error: 'Failed to calculate total sold items' });
  }
});

// Calculate total number of not sold items of selected month
app.get('/api/total-not-sold-items', async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(month);
    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1);

    const totalNotSoldItems = await Item.countDocuments({
      dateOfSale: {
        $gte: startDate,
        $lt: endDate,
      },
      sold: false,
    });

    res.json({ totalNotSoldItems });
  } catch (error) {
    console.error('Error calculating total not sold items:', error);
    res.status(500).json({ error: 'Failed to calculate total not sold items' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
