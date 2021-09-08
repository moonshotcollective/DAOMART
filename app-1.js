const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// parse application/json
app.use(express.json());

app.use(express.static(path.join(__dirname, 'daomart', 'build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'daomart', 'build', 'index.html'))
);
app.listen(4442);
