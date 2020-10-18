require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser =  require('body-parser');
const router = require('./app/routes/app.route').router;

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Main route
app.use('/app/v1', router);

app.listen(process.env.APP_PORT, () => console.log('Server run on ' + process.env.APP_PORT));