const express = require('express');
const bodyParser = require('body-parser');
const routers=require('./routes/users');
const connectioninstance=require('./connection db/connectiondb');
const logger=require('morgan');
const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/',routers);
const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






