const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser'); 
const app = express();
const router = require('./routers')
const PORT = 3000

app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
