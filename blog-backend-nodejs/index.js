const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();


// upload file in cloudinary
app.use(fileUpload({
    useTempFiles: true
}));


// import ERROR from middleware
const errorHandler = require('./middleware/error')



// IMPORT DATABSE
require('./database/db');


// IMPORT ROUTES
const authRoutes = require('./routes/authRoutes');
const postRoute = require('./routes/postRoute');
const commonRoute = require('./routes/commonRoute');


// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors( {
    // origin: 'https://blog-mern-9ivr.vercel.app/',
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());



// END POINT ROUTES - ROUTES MIDDLEWARE
app.use('/api', authRoutes)
app.use('/api', postRoute)
app.use('/api', commonRoute)



// ERROR MIDDLEWARE
app.use(errorHandler);



// TESTING SERVER WORKING
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Testing success server running' })
})

app.get('/test1', (req, res) => {
    res.send({ code: '200', message: 'Testing success server running test1' })
})


// SERVER RUNNING ON THIS PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
