// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const dotenv = require('dotenv');
dotenv.config();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder

app.use(express.static('dist'))

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

//Setting the port
const port = 8080;
app.listen(port, listening);
// Setup Server
function listening() {
    console.log(`running on localhost: ${port}`);
}


app.get('/getData', function(req, res) {
    res.send(projectData)
})
//Posting the data
app.post('/addData',function (req, res) {

// Setting values to projectData object
    const {
        destination,
        country,
        temperature,
        weatherInfo,
        weatherPressure,
        largeImg
    } = req.body;
    projectData.name = destination;
    projectData.countryName = country;
    projectData.temp = temperature;
    projectData.description = weatherInfo;
    projectData.pres = weatherPressure;
    projectData.largeImageURL = largeImg;
    res.end('success');
    console.log(projectData)
})
