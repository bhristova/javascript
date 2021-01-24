
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routers = require('./api/routers/routers');
const db = require('./db/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());

db.connect().then(() => {
  app.listen(3001, function() {
    console.log('listening on 3001')
  });
});


routers.setRouting(app);