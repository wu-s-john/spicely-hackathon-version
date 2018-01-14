const express = require('express');
const bodyParser = require("body-parser");
const sender = require("./spicely/arduino-sender");
const app = express();
const port = 3000;

const options = {
    index: "index.html"
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', express.static('/', options));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/fonts/roboto", express.static(__dirname + '/fonts/roboto'));

app.use('/dist', express.static(__dirname + '/dist'));


app.get('/', (request, response) => {
    response.sendfile('index.html');
});

app.get('/measuring.html', (request, response) => {
    response.sendfile('measuring.html');
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('my app is listening at http://%s:%s', host, port);
});


app.post("/arduino/input", (req, res) => {
    let data = req.body['i[]'];
    console.log(data);
    console.log(`Sending ${data} to audrino`);
    sender(data);
});
