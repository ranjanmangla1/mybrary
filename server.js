if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// importing express library
const express = require('express')
// to get the app portion of that by calling the express function
const app = express()
// to get express layouts package
const expressLayouts = require('express-ejs-layouts')

// hook our application to router
const indexRouter = require('./routes/index')
const authorRouter = require(''./routes/authors')

// set our view engine, in this case, we are gonna use ejs as our view engine
app.set('view engine','ejs')

// to set our views will be coming from, we are going to put them into views directory
// __dirname gets our current directory name and adds views directory to the path to get views
app.set('views', __dirname + '/views')

// what our layout file is gonna be
// the idea behind a layout file is that every single file is going to be inside this layout file
// so, we don't have duplicate all of the beginning html and ending HTML such as header or footer
app.set('layout', 'layouts/layout')

// we want to use expressLayouts
app.use(expressLayouts)
// tell express where our public files is going to be (that includes all the html, js, styles)
// public is very common name
app.use(express.static('public'))




// using mongoose library used for mongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',() => console.log('Connected to Mongoose'))



// to use route path and router
app.use('/', indexRouter)

app.use('/authors', authorRouter)

// we want our app to listen to a certain port
app.listen(process.env.PORT || 3000)
// which is going to pull from an environment variable when we deploy
// the server is gonna tell us what port it is listening to, not us!
// but for development we are going to default it to 3000, since server is not telling anything for our hosting platform

// if we run our application at this stage, it is showing 'cannot GET/'
// because we have no routes set up in our application


// small application set up their routes in server.js, but for larger applications like this application, it becomes very hard to manage

// so we are going to use mvc to layout over application to put all of our routes which could also be called controllers inside of a routes folder, so we can just create here here a routes folder and all of our routes are going to go inside this folder 

// we are using word 'routes' instead of 'Controllers' because in node.js and express land, most people usually refer to controllers as routes 
// you can think both of them as the exactly same thing