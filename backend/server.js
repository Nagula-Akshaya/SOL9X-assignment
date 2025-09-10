require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./models');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.get('/', (req, res) => res.send('✅ Backend server is running...'));
const PORT = process.env.PORT || 5000;
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
