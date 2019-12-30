const express = require('express')  /// Express
const expressLayouts = require('express-ejs-layouts') /// EJS
const mongoose = require('mongoose') /// Mongoose
const bodyParser = require('body-parser')

const app = express()

// DB config
const db = require('./config/keys').MongoURI

// Body parser
app.use(express.urlencoded({ extended: false }))

// connect Mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('mongodb connected'))
.catch(err => console.log('Error occured ', err))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Routes
app.use('/', require('./routes/index'))
app.use('/user', require('./routes/users'))

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('Server started on port => ', PORT))