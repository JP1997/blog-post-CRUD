const express = require('express');
const bodyParser = require('body-parser');
const blogsRouter = require('./blog-post-router');
const app = express();
const jsonParser = bodyParser.json();

app.use('/blogs',jsonParser, blogsRouter);

app.listen(8080, () => {
	console.log('Your app is running in port 8080');
});
