require('./config/config');

const express = require('express');
const body_parser = require('body-parser');

const {TodoRoutes} = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(body_parser.json());

app.use('/', TodoRoutes);

app.listen(port, () => console.log(`Started on port ${port}.`));

module.exports = {app};