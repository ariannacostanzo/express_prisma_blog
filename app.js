//express
const express = require("express");
const app = express();
const cors = require("cors")

//router
const postRouter = require('./routes/posts.js');
const categoryRouter = require('./routes/categories.js');
const tagRouter = require('./routes/tags.js');
const authRouter = require('./routes/auth.js');


//middleware
const notFound = require("./middlewares/notFound.js");
const errorHandler = require("./middlewares/errorHandler.js");
const auth = require("./middlewares/auth.js");

//env
require("dotenv").config();
const port = 8000;


//per leggere i json
app.use(express.json()); 

//cors
const corsOptions = {
    origin: 'https://localhost:8000'
}
app.use(cors(corsOptions))

//rotte
app.use('/auth', authRouter)

app.use('/posts', auth, postRouter)
app.use('/categories', auth, categoryRouter)
app.use('/tags', auth, tagRouter)

//middlewares
app.use(notFound)
app.use(errorHandler);


//avvio del server
app.listen(port, ()=> { 
    console.log(`Server avviato su ${port}`)
})