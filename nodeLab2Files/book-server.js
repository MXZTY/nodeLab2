require('./handlers/dataConnector.js').connect();

const express = require('express');
const parser = require('body-parser');

//create an express app
const app = express();

/* --- Middleware Section --- */

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');

//serves up static files from the public folder
app.use(express.static('public'));
app.use('/static', express.static('public'));



//get the data model:
const Book = require('./models/Book');

//tell node to use json and HTTP header features in body-parser and convert raw requests into usable data
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

const bookRouter = require('./handlers/bookRouter.js');
bookRouter.handleAllBooks(app, Book);
bookRouter.handleSingleBook(app, Book);
bookRouter.handleBooksByPageRange(app, Book);
bookRouter.handleAllCategories(app, Book);
bookRouter.handleCreateBook(app, Book);
bookRouter.handlePageIndex(app, Book);
bookRouter.handlePageBooks(app, Book);
bookRouter.handlePageSingleBook(app, Book);

app.use((req, resp, next) => {
    resp.status(404).send("sorry can't find what your looking for!");
});



let port = 8080;
app.listen(port, function() {
    console.log("server is running at port = " + port);
});