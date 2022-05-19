const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const { join } = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const routes = require('./routes');
const session = require('express-session');

const port = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, '..', 'views'));

app.use(express.static(join(__dirname, '..', 'public')))
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'VerySecretKey',
    resave: true,
    saveUninitialized: true
}));

app.use(routes);
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('error', err => console.log('[error]', 'Error connecting to database:', err.messages))
mongoose.connection.once('open', () => {
    console.log('[info]', 'Connected to database');
    app.listen(port, () => console.log('[info]', `App started at http://localhost:${port}`));
});