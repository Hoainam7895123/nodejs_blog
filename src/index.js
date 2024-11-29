const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Đảm bảo bạn import đúng cách
const methodOverride = require('method-override')

const SortMiddleware = require('./app/middleware/sortMiddleware')

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware)

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars')
    }),
);
app.set('view engine', 'hbs'); // Cài đặt view engine là handlebars
app.set('views', path.join(__dirname, 'resources', 'views'));

// HTTP logger
// app.use(morgan('combined'))

app.get('/middleware',
    function(req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.face = 'Gach gach gach!!!'
            return next(); // middleware 1 check => ok, function next() cho xuong middleware2
        } else {
            res.status(403).json({ message: 'Access denied ' })
        }
    }, 
    function(req, res, next) {
        res.json({
            message: 'Successfully!',
            face: req.face
        })
    }
)

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
