const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./Users');

const loginRoutes = require('./login');
const storedPasswordsRoutes = require('./routes/storedPasswords');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/stored-passwords', storedPasswordsRoutes);
app.use('/api', userRoutes);
app.use('/api', loginRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
