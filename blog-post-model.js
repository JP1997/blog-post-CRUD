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

const blogsList = {
	get : function(){
		return blogsArray;
	},
	getAuthor : function(autor){
		let authorBlog = [];

		blogsArray.forEach(item => {
			if (item.author == autor){
				authorBlog.push(item);
			}
		});
		if (authorBlog.length != 0){
			return authorBlog;
		}
		return 1;
	},
	add : function(fTitle,fContent,fAuthor,fPublishDate){
		let newItem = {
			id : uuidv4(),
			title : fTitle,
			content : fContent,
			author : fAuthor,
			publishDate : fPublishDate
		};
		blogsArray.push(newItem);
		return newItem;
	},
	delete : function(deleteItem){
		let result = false;
		blogsArray.forEach(function(item,index){
			if (item.id == deleteItem){
				blogsArray.splice(index,1);
				result = true;
			}
		});
		
		return result;
	},
	checkId: function(searchId){
		let resul = false;
		blogsArray.forEach(item => {
			if(searchId == item.id)
				resul = true;
		});
		return resul;
	},
	place : function(postId, body){
		let bodyFields = false;
		let sendArray = [];
		let result = 0;
		blogsArray.forEach(item =>{
			if(item.id == postId)
			{
				if('title' in body){
					bodyFields = true;
					item.title = body.title;
				}
				if('author' in body){
					bodyFields = true;
					item.author = body.author;
				}
				if('content' in body){
					bodyFields = true;
					item.content = body.content;
				}
				if('publishDate' in body){
					bodyFields = true;
					item.publishDate = body.publishDate;
				}
				if(bodyFields){
					sendArray = item;
					result = 1;
				}
			}
		});
		if (result == 1){
			return sendArray;
		}
		else{
			return 1;
		}
	}
}

module.exports = {blogsList};