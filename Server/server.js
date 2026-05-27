const express = require('express');
const cors = require('cors');
require('dotenv').config();


require('./connection');


const authRoutes = require('./routes/authRoutes');
const familyRoutes = require('./routes/familyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.json()); 

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('API is running ');
});

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});