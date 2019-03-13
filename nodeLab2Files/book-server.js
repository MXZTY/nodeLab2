require('./handlers/dataConnector.js').connect();


let port = 8080;
app.listen(port, function() {
    console.log("server is running at port = " + port);
})