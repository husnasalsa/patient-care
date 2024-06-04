const express = require('express')
const cors = require('cors')
const sequelize = require('./seq');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser'); 
const app = express();
const router = require('./routers')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)

async function syncDatabase() {
    try {
      await sequelize.sync({ force: false });
      console.log('Database synced successfully');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }
  
syncDatabase();

module.exports = {
    app: app,
    syncDatabase: syncDatabase
  };
  
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, console.log(`Server is listening on port ${port}...`));
}
