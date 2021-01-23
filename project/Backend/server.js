
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routers = require('./api/routers/routers');
const requestParser = require('./db/requestParser');
const db = require('./db/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(requestParser());
app.use(cookieParser());

db.connect().then(() => {
  app.listen(3001, function() {
    console.log('listening on 3001')
  });
})

routers.setRouting(app);