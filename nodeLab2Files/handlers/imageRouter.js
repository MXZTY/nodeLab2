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
            resp.render('index', {title: `Node Lab 2`, heading: 'Sample Pug File'});
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
                    console.log(data);
                    resp.render('list', {countryList: data});
                }
            });
        })
}

module.exports = {
    handleAllImages,
    handleSingleImage,
    handleImagesFromSingleCity, 
    handleImagesFromSingleCountry, 
    handlePageIndex, 
    handleCountryList
}
