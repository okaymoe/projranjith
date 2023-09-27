// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// routes
const authRoutes = require('./routes/auth');
const stocksRoutes = require('./routes/stocks'); 

app.use('/auth', authRoutes);
app.use('/stocks', stocksRoutes); 

// Start servr
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
