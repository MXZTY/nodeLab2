const handlePageSingleBook = (app, Book) => {
    app.route('/site/book/:isbn')
        .get((req, resp) => {
            Book.find({isbn10: req.params.isbn}, (err, data) => {
                if(err) {
                    resp.render('error', {page: 'site/book'});
                } else {
                    resp.render('book', {bookData: data[0]});
                }
            });
        });
};

const handlePageIndex = (app, Book) => {
    app.route('/')
        .get( (req, resp) => {
            resp.render('index', {title: 'Node Lab 2', heading: 'Sample Pug File' })
        });
};

const handlePageBooks = (app, Book) => {
    app.route('/site/list')
        .get((req, resp) => {
            Book.find({}, (err, data) => {
                if(err){
                    resp.render('error', {page: 'site/list'});
                } else {
                    resp.render('list', {bookData: data});
                }
            });
        });
};

const handleAllBooks = (app, Book) => {
    app.route('/api/books')
        .get((req, resp) => {
            Book.find({}, (err, data) => {
                if(err){
                    resp.json({message: "Unable to connect to books"});
                } else {
                    resp.json(data);
                }
            });
        });
};

const handleSingleBook = (app, Book) => {
    app.route('/api/books/:isbn')
        .get((req, resp) => {
            Book.find({isbn10: req.params.isbn}, (err, data) => {
                if(err){
                    resp.json({message: "Book not found!"});
                } else {
                    resp.json(data);
                }
            });
        });
};

const handleBooksByPageRange = (app, Book) => {
    app.route('/api/books/pages/:min/:max')
        .get((req, resp) => {
            Book.find().where('production.pages')
            .gt(req.params.min)
            .lt(req.params.max)
            .sort({title: 1})
            .select('title isbn10')
            .exec( (err, data) => {
                if(err) {
                    resp.json({message: "Books not found!"});
                } else {
                    resp.json(data);
                }
            });
        });
};

const handleAllCategories = (app, Book) => {
    app.route('/api/categories')
        .get((req, resp) => {
            Book.aggregate([
                {$group: {_id: "$category.main", count: {$sum:1}}}, 
                {$sort: { _id:1 }}
            ], (err, data) => {
                if(err){
                    resp.json({message: 'Unable to connect to books'});
                } else {
                    resp.json(data);
                }
            });
        });
};

const handleCreateBook = (app, Book) =>{
    app.route('/api/create/book')
        .post((req, resp)=>{
            const aBook = {
                isbn10: req.body.isbn10, 
                isbn13: req.body.isbn13,
                title: req.body.title, 
                year: req.body.year, 
                publisher: req.body.publisher, 
                production: {
                    pages: req.body.pages
                }
            };

            Book.create(aBook, (err, data) => {
                if(err) {
                    resp.json({message: 'Unagle to add the item to books'});
                } else {
                    const msg = `New Book was saved isbn=${aBook.isbn10}`;
                    console.log(aBook.isbn10);
                    resp.json({message: msg});
                }
            });

        });
};

module.exports = {
    handleAllBooks,
    handleSingleBook, 
    handleBooksByPageRange, 
    handleAllCategories, 
    handleCreateBook, 
    handlePageIndex, 
    handlePageBooks, 
    handlePageSingleBook
};