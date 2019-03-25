const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const uuidv4 = require('uuid/v4');


let blogsArray = [
					{			
						id : uuidv4(),
						title: "Titel1",
						content: "content1",
						author: "author1",
						publishDate: "22-03-2019"

					},
					{
						id : uuidv4(),
						title: "Titel2",
						content: "content2",
						author: "author2",
						publishDate: "23-03-2019"
					},
					{
						id : uuidv4(),
						title: "Titel3",
						content: "content3",
						author: "author3",
						publishDate: "24-03-2019"
					}
				];

app.get('/list-blogs', (req, res) => {
	res.status(200).json({
		message : "Successfully sent the list of blogs",
		status : 200,
		blogs : blogsArray
	});
});

app.get('/list-blogs/:author', (req, res) => {
	
	if(!('author' in req.params)){
		res.status(406).json({
			message : "Error with variables",
			status : 406
		});
	}

	let blogsAuthor = req.params.author;
	let AuthorBlogsPosts = [];

	blogsArray.forEach(item => {
		if (item.author == blogsAuthor){
				AuthorBlogsPosts.push(item);
		}
	});

	
	if(AuthorBlogsPosts.length != 0){
		res.status(200).json({
			message : "Posts from the author:",
			status : 200,
			blogs: AuthorBlogsPosts
		});
	}else{
		res.status(406).json({
			message : "There are no posts from the searched author",
			status : 406
		});
	}
});


app.post('/list-blogs', jsonParser, (req, res) => {
	
	let requiredFields = ['title', 'content','author','publishDate'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			}).send("Finish");
		}
	}


	let objectToAdd = {
		id : uuidv4(),
		title : req.body.title,
		content : req.body.content,
		author : req.body.author,
		publishDate : req.body.publishDate
	};

	blogsArray.push(objectToAdd);
	res.status(201).json({
		message : "Successfully added the blog",
		status : 201,
		blogs : objectToAdd
	});
});

app.delete('/list-blogs/:id', jsonParser, (req,res) => {

	if (!('id' in req.params)){
		res.status(406).json({
			message : "Error with variables",
			status : 406
		});
	}

	if (!('id' in req.body)){
		res.status(406).json({
			message : "Error with variables",
			status : 406
		});
	}

	if (req.params.id != req.body.id){
		res.status(404).json({
			message : "Both id must match",
			status : 404
		});
	}

	delID = req.body.id;

	blogsArray.forEach(function(item,index){
		if(item.id == delID)
		{
			blogsArray.splice(index, 1);
			res.status(204).json({
				message : "Blog deleted",
				status : 204
			});
		}
	});

	res.status(404).json({
			message : "The selected id is not associated to any blog",
			status : 404
	});
});

app.put('/list-blogs/:id', jsonParser, (req,res) => {

	if (!('id' in req.params))
	{
		res.status(406).json({
			message : "Error with variables",
			status : 406
		});
	}

	let putId = req.params.id;
	let bodyFields = 0;

	blogsArray.forEach(item => {
		if(item.id == putId)
		{
			if('title' in req.body)
			{
				bodyFields = 1;
				item.title = req.body.title;
			}
			if('author' in req.body)
			{
				bodyFields = 1;
				item.author = req.body.author;
			}
			if('content' in req.body)
			{
				bodyFields = 1;
				item.content = req.body.content;
			}
			if('publishDate' in req.body)
			{
				bodyFields = 1;
				item.publishDate = req.body.publishDate;
			}
		
			if(bodyFields)
			{
				res.status(200).json({
					message : "Blog list modified successfully",
					status : 200,
					post : item
				});
			}else
			{
				res.status(404).json({
					message : "No parameters in the body",
					status : 404
				});
			}
		}
	});
	res.status(404).json({
		message : "The id is not related to a blog",
		status : 404
	});
});


app.listen(8080, () => {
	console.log('Your app is running in port 8080');
});
