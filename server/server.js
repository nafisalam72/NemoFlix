require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
// Note: We bypass connectDB for now if MONGO_URI isn't set, to allow it to run without a local Mongo instance for the user easily
if(process.env.MONGO_URI) { connectDB(); }

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/contact', require('./routes/contactRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NemoFlix API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
