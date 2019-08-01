const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/agent', require('./routes/api/agent'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/listing', require('./routes/api/listing'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/office', require('./routes/api/office'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));