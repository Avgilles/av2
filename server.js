const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles')
const app = express();

mongoose.connect('mongodb://localhost/newDB', {
    useNewUrlParser: true,
    useUnifiedTopology:true
});
mongoose.connection.once('open', function (){
    console.log('connection is made');
}).on('error', function (error){
    console.log("connection error", error);
})


app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles });
})

app.use('/articles', articleRouter);

app.listen(5000);
