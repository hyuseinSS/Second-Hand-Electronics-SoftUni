const express = require('express');
const { initializeDatabase } = require('./config/initializeDB');
const { initializeHandlebars } = require('./config/initializeHandlebars');
const cookieParser = require('cookie-parser');
const routes = require('./routes')
const { auth } = require('./middlewares/authMiddleware');

const app = express();

initializeDatabase(app)
initializeHandlebars(app)
app.use('/public', express.static('public'));
app.use(cookieParser())
app.use(auth)
app.use(express.urlencoded({ extended: false }));
app.use(routes)