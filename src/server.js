const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require("fs")
const sequelize = require('./models/database');
const movieRoutes=require('./routes/movie.route');
const userRoutes=require('./routes/user.route');

const app = express();
dotenv.config();

sequelize.sync(true)
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/assets'));

app.use('/user', userRoutes);
app.use('/movie', movieRoutes);

app.get('/', (req, res) => res.send('Welcome to Home'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Running movie on Port ' + port);
});
