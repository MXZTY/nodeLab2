const handleAllImages = (app, Image) => {
    app.route('/api/images')
        .get((req, resp) =>{
            Image.find({}, (err, data) => {
                if(err){
                    resp.json({message: "unable to connect to Images"});
                } else {
                    resp.json(data);
                }
            })
        });
};

const handleSingleImage = (app, Image) => {
    app.route('/api/images/:id')
        .get((req, resp) =>{
            Image.find({id: req.params.id}, (err, data) => {
                if(err){
                    resp.json({message: 'Image not found!'});
                } else{
                    resp.json(data);
                }
            });
        });
};

const handleImagesFromSingleCity = (app, Image) => {
    app.route('/api/images/city/:city')
        .get((req, resp) => {
            Image.find({'location.city': new RegExp(req.params.city, 'i')}, (err, data) => {
                if(err){
                    resp.json({message: 'images from city where not found'});
                } else {
                    resp.json(data);
                }
            });
        });
};

const handleImagesFromSingleCountry = (app, Image) => {
    app.route('/api/images/country/:country')
    .get((req, resp) => {
        Image.find({'location.country': new RegExp(req.params.country, 'i')}, (err, data) => {
            if(err){
                resp.json({message: 'images from country where not found'});
            } else {
                resp.json(data);
            }
        });
    });
};

const handlePageIndex = (app, Image) => {
    app.route('/')
        .get((req, resp) => {
            Image.find({}, (err, data)=>{
                if(err){
                    resp.json({message: 'Images where not found'})
                } else {
                    resp.render('index', {title: `Node Lab 2`, heading: 'Sample Pug File', imageList: data });
                }
            });
        });
};

const handleCountryList = (app, Image) => {
    app.route('/travel')
        .get((req, resp) => {
            Image.aggregate([
                {$group: {_id : '$location.country', image: {$push: "$location.country"}, count: {$sum:1}}},
                {$sort: { _id: 1 }} 
            ], (err, data) => {
                if(err){
                    resp.json({message: err});
                } else {
                    resp.render('list', {countryList: data});
                }
            });
        })
}

const showImagesFromSingleCountry = (app, Image) => {
    app.route('/travel/photos/:country')
    .get((req, resp) => {
        Image.find({'location.country': new RegExp(req.params.country, 'i')}, (err, data) => {
            if(err){
                resp.json({message: 'images from country where not found'});
            } else {
                resp.render('country-photos', {photos: data} );
            }
        });
    });
};

const showSingleImage = (app, Image) => {
    app.route('/travel/photo/:id')
        .get((req, resp) => {
            Image.find({id: req.params.id}, (err, data) => {
                if(err){
                    resp.json({message: 'Image not found!'});
                } else{
                    console.log(data);
                    resp.render('image', {imageData: data[0]});
                }
            });
        });
};

const handleAbout = (app, Image) => {
    app.route('/about')
        .get((req, resp) => {
            resp.render('about');
        });
};

module.exports = {
    handleAllImages,
    handleSingleImage,
    handleImagesFromSingleCity, 
    handleImagesFromSingleCountry, 
    handlePageIndex, 
    handleCountryList, 
    showImagesFromSingleCountry, 
    showSingleImage, 
    handleAbout, 
}
