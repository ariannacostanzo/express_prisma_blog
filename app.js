//express
const express = require("express");
const app = express();
const postRouter = require('./routes/posts.js');
const categoryRouter = require('./routes/categories.js');
const tagRouter = require('./routes/tags.js');
const notFound = require("./middlewares/notFound.js");
const errorHandler = require("./middlewares/errorHandler.js");

//env
require("dotenv").config();
const port = 8000;

//per leggere i json
app.use(express.json()); 

//rotte
app.use('/posts', postRouter)
app.use('/categories', categoryRouter)
app.use('/tags', tagRouter)

//middlewares
app.use(notFound)
app.use(errorHandler);


//avvio del server
app.listen(port, ()=> { 
    console.log(`Server avviato su ${port}`)
})