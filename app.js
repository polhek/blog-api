const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

// routes
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();
app.use(cors());
// mongoose connection!
const mongoDB_url = process.env.MONGO_URL;
const mongoDB = process.env.MONGODB_URI || mongoDB_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./models/user');

require('./passport/passport')(passport);

app.use(compression());
app.use(passport.initialize());

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);

module.exports = app;
