const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = 'ck5ij3hr01qls0um7kjgck5ij3hr01qls0um7kk0'; 

router.get('/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return res.status(500).json({ error: 'An error occurred while fetching stock data' });
  }
});

module.exports = router;
