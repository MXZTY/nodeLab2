require('./handlers/dataConnector.js').connect();

const express = require('express');
const parser = require('body-parser');

const app = express();

/* --- MiddleWare Section --- */
app.set(`views`, `./image-views`);
app.set(`view engine`, `pug`);

app.use(express.static(`public`));
app.use('/static', express.static(`public`));


const Image = require('./models/Image');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

const imageRouter = require('./handlers/imageRouter.js');
imageRouter.handleAllImages(app, Image);
imageRouter.handleSingleImage(app, Image);
imageRouter.handleImagesFromSingleCity(app, Image);
imageRouter.handleImagesFromSingleCountry(app, Image);
imageRouter.handlePageIndex(app, Image);
imageRouter.handleCountryList(app, Image);
imageRouter.showImagesFromSingleCountry(app, Image);
imageRouter.showSingleImage(app, Image);
imageRouter.handleAbout(app, Image);

let port = 8080;
app.listen(port, function(){
    console.log("server is running at port = " + port);
});