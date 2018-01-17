const express = require('express');
const bodyParser = require("body-parser");
const sender = require("./spicely/arduino-sender");
const app = express();
const port = 3000;

const options = {
    index: "index.html"
};

const usePath = function (directory) {
    app.use(directory, express.static(__dirname + directory));
};


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static('/', options));

usePath("/node_modules");
usePath("/fonts/roboto");
usePath("/js");
usePath("/styles");

app.get('/', (request, response) => {
    response.sendfile('html/index.html');
});

app.get('/measuring.html', (request, response) => {
    response.sendfile('html/measuring.html');
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
