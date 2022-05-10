require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const passport = require('passport');
const User = require('./models/user');
const router = require('./routes/index');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/drkice_db',
  { useNewUrlParser: true }
)
mongoose.connection.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose.');
})

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://192.168.0.12:3000']
}));
app.use( express.urlencoded({
    extended: false
  }) 
);
app.use( express.static('public') );
app.use( express.json() );
app.use( cookieParser(process.env.COOKIE_SECRET) );
app.use( expressSession({
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 86400000
  },
  resave: false,
  saveUninitialized: true
}) );
app.use(passport.session());
app.use(passport.initialize());

app.use( ( req, res, next ) => {
  console.log( req.session );
  next();
})

app.use('/', router);

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
})

const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000', 'htpp://192.168.0.12:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});
require('./controllers/chatController')(io);