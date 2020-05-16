const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize} = require('./models');
const config = require('./config/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

require('./routes')(app);

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`server started on port ${config.port}`)
  });
