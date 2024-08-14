const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const db = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use('/api', router);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
