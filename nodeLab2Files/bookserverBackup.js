require('./handlers/dataConnector.js').connect();

const express = require('express');
const parser = require('body-parser');

//create an express app
const app = express();
//get the data model:
const Book = require('./models/Book');

//tell node to use json and HTTP header features in body-parser
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

const bookRouter = require('./handlers/bookRouter.js');
bookRouter.handleAllBooks(app, Book);
bookRouter.handleSingleBook(app, Book);
bookRouter.handleBooksByPageRange(app, Book);
bookRouter.handleAllCategories(app, Book);

let port = 8080;
app.listen(port, function() {
    console.log("server is running at port = " + port);
});