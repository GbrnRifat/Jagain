const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Static folder untuk HTML
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const storedPasswordsRoutes = require('./routes/storedPasswords');
app.use('/api/stored-passwords', storedPasswordsRoutes);

// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
