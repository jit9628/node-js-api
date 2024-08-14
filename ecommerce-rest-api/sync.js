const sequelize = require('./config/db');
const User = require('./models/userModel');

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
  sequelize.close(); 
});
