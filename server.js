const dotenv = require('dotenv').config();
const path = require('path')
const express = require('express');
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController/errorController')
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger, errHandler } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js')
const multer = require('multer')
const upload = multer({dist:'public/img/users'})
const PORT = process.env.PORT || 3500;
const API_URL = process.env.API_URL;
//db connection strings - 
connectDB()
// custom middleware logger -
app.use(logger);
// Handle options credentials check - before CORS! -
// and fetch cookies credentials requirement -
app.use(credentials);
// Cross Origin Resource Sharing -
app.use(cors(corsOptions));
// built-in middleware to handle urlencoded form data -
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json -
app.use(express.json());
//middleware for cookies -
app.use(cookieParser());
//serve static files -

app.use('/', express.static(path.join(__dirname, '/public')));
//routes -

app.use('/', require('./routes/root'))
//general routes -

app.use('/api/v1/auth', require('./routes/auth/root'))

app.use(verifyJWT);
app.use('/api/v1/user', require('./routes/user/root.js'))
//students routes -

app.use('/api/v1/students', require('./routes/students/root'))
app.use('/api/v1/subjects', require('./routes/subjects/root'))
app.use('/api/v1/units', require('./routes/units/root'))
app.use('/api/v1/streams', require('./routes/streams/root'))
app.use('/api/v1/academicterm', require('./routes/academicterm/root'))
app.use('/api/v1/academicyear', require('./routes/academicyear/root'))
app.use('/api/v1/exams', require('./routes/exams/root'))
app.use('/api/v1/teachers', require('./routes/teachers/root'))
app.use('/api/v1/parents', require('./routes/parents/root'))
app.use('/api/v1/roles', require('./routes/roles/root'))
app.use('/api/v1/school', require('./routes/school/root'))
app.use('/api/v1/school', require('./routes/school/root'))
app.all('*',(req,res,next)=>{ 
    next(new AppError(`Can't find ${req.originalUrl} on this server!`));
})
app.use(globalErrorHandler)
mongoose.connection.once('open',() => {
    //console.log('Connected to MongoDB');
    app.listen(PORT);
})

