const express = require('express');
const router = express.Router();
const {blogsList} = require('./blog-post-model');

router.get('/list-blogs', (req, res, next) => {
	let data = blogsList.get();

	if(data){
		res.status(200).json({
			message : "Successfully sent the list of blogs",
			status : 200,
			blogs : data
		});
		return next();
	}	
});

router.get('/list-blogs/:author', (req, res,next) => {
	
	if(!('author' in req.params)){
		res.status(406).json({
			message : "Error with variables",
			status : 406
		});
		return next();
	}

	let blogsAuthor = req.params.author;
	let AuthorBlogsPosts = blogsList.getAuthor(blogsAuthor);

	
	if(AuthorBlogsPosts != 1){
		res.status(200).json({
			message : "Posts from the author:",
			status : 200,
			blogs: AuthorBlogsPosts
		});
		return next();
	}else{
		res.status(406).json({
			message : "There are no posts from the searched author",
			status : 406
		});
		return next();
	}
});

router.post('/list-blogs', (req, res,next) => {
	
	let requiredFields = ['title', 'content','author','publishDate'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

		let tTitle = req.body.title;
		let tContent = req.body.content;
		let tAuthor = req.body.author;
		let tPublishDate = req.body.publishDate;

		let nEntry = blogsList.add(tTitle,tContent,tAuthor,tPublishDate);
	
	if (nEntry){
			res.status(201).json({
				message : "Successfully added the blog",
				status : 201,
				blogs : nEntry
			});
		return next();
	}
});

router.delete('/list-blogs/:id', (req,res,next) => {

	if (!('id' in req.params)){
		res.status(406).json({
			message : "Error with variables",
			status : 406
		});
		return next();
	}

	if (!('id' in req.body)){
		res.status(407).json({
			message : "Error with variables",
			status : 407
		});
		return next();
	}

	if (req.params.id != req.body.id){
		res.status(404).json({
			message : "Both id must match",
			status : 404
		});
		return next();
	}

	let deleteID = req.body.id;
	let deletedBlog = blogsList.delete(deleteID);


	if(deletedBlog){
				res.status(204).json({
				message : "Blog deleted",
				status : 204
			});
			return next();
	}else {
		res.status(404).json({
				message : "The selected id is not associated to any blog",
				status : 404
		});
		return next();
	}
});

router.put('/list-blogs/:id', (req,res,next) => {

	if (!('id' in req.params))
	{
		res.status(406).json({
			message : "Error with variables",
			status : 406
		});
		return next();

	}

	let putId = req.params.id;
	let check = blogsList.checkId(putId);

	if (!(check)){
		res.status(404).json({
			message : "The id is not related to a blog",
			status : 404
		});
		return next();
	}

	let bodyId = req.body;
	let modEntry = blogsList.place(putId,bodyId);

	if(modEntry != 1){
				res.status(200).json({
					message : "Blog list modified successfully",
					status : 200,
					post : modEntry
				});
				return next();
	}else{
				res.status(404).json({
					message : "No parameters in the body",
					status : 404
				});
				return next();
	}


});


module.exports = router;

