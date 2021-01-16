$(document).ready(function() {
	
	/* ======= Highlight.js Plugin ======= */ 
    /* Ref: https://highlightjs.org/usage/ */     
    $('pre code').each(function(i, block) {
	    hljs.highlightBlock(block);
	 });

});

const convertToJSON = () => {
	const title = document.getElementById('title').innerHTML;
	const date = document.getElementById('date').innerHTML;
	const time = document.getElementById('time').innerHTML;
	const path = document.getElementById('path').content;
	const image = document.getElementById('image').content;
	const preview = document.getElementById('preview').content;

	console.log(image);

  
	const jsonObject = {
	  "Title": title,
	  "Date": date,
	  "Time": time,
	  "Path": path,
	  "ImageAddress": image,
	  "Preview": preview
	}
	readLibraryFile(jsonObject);
    }
  
const BlogPost = () => {
	convertToJSON();
  }

const readLibraryFile = (jsonObject) => {
	let parsedJson;
	let JSONArray;
	fetch('https://api.github.com/gists/29e0f6a3d3baaeea9307195ea4d90992')
	.then(function(response) {
		return response.text();
	})
	.then(function(text) {
		parsedJson = JSON.parse(text);
		let array = parsedJson.files.Library.content;
		JSONArray = JSON.parse(array);
		compareJsonFiles(JSONArray, jsonObject);
	});
}

const compareJsonFiles = (JSONArray, jsonObject) => {
	let localBool = false;
	const localTitle = jsonObject.Title;
	const localDate = jsonObject.Date;
	const localTime = jsonObject.Time;
	const localPath = jsonObject.Path;
	const localImage = jsonObject.ImageAddress;
	const localPreview = jsonObject.localPreview;

	if(Array.isArray(JSONArray) == true){
		for (var i = 0; i < JSONArray.length; i++){
		  if (JSONArray[i].Title == localTitle){
			if(JSONArray[i].Date != localDate || JSONArray[i].Time != localTime || JSONArray[i].Path != localPath || JSONArray[i].ImageAddress != localImage || JSONArray[i].Preview != localPreview){
				JSONArray[i] = jsonObject;
				writeLibraryFile(JSONArray);
				if(JSONArray[i] == jsonObject){
					console.log(true);
					localBool = true;
				}
			}
		  }
		  if(localBool == false && i == JSONArray.length-1){
			JSONArray[i] = jsonObject;
			writeLibraryFile(JSONArray);
			console.log('new item added :)')
		  }
		}
	}else{
		console.log('ITEM IS NOT AN ARRAY');
	}	
}

const writeLibraryFile = (JSONArray) => {
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const targetUrl = 'https://hook.integromat.com/ube8bwwmtnxyb94ugxa16tkxvksbt32o';
	const url = proxyUrl + targetUrl;
	fetch(url, {
		method: 'post',
		headers: {
		  "Content-type": "application/javascript"
		},
		body: JSON.stringify(JSONArray)
	  })
	  .then(function (data) {
		console.log('Request succeeded with JSON response', data);
	  })
	  .catch(function (error) {
		console.log('Request failed', error);
	  });
}


const dateFormat = () => {

	const hiddenDate = document.getElementById('date').textContent;
	let articleDate;
	const postDate = hiddenDate.split("/");
	const formattedDate = todaysDate().split("/");

	if(postDate[2] < formattedDate[2] && parseInt(postDate[2]) !== parseInt(formattedDate[2]) - 1){
		let years = formattedDate[2] - postDate[2];
		articleDate = "Published " + years + " year(s) ago";		
	}
	if(postDate[2] == formattedDate[2] || parseInt(postDate[2]) == parseInt(formattedDate[2]) - 1){
		let absMonth = Math.abs(parseInt(postDate[0]) - parseInt(formattedDate[0]));
			let months = 12 - absMonth;
			articleDate = "Published " + months + " month(s) ago";
		if(postDate[0] == formattedDate[0]){
			if(postDate[1] < formattedDate[1]){
				let days = formattedDate[1] - postDate[1];
				articleDate = "Published " + days + " day(s) ago";
			}
			if(postDate[1] == formattedDate[1]){
				articleDate = "Published Today!"
			}
		}
	}
	document.getElementById('date').textContent = articleDate;
}
const todaysDate = () => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();
	const parsedToday = mm + '/' + dd + '/' + yyyy;
	return parsedToday;
}


const randomBlogPost = (libraryArray) => {
	const fetchedArray = libraryArray;	
	const randomPost = Math.floor((Math.random() * fetchedArray.length));
	const postPath = fetchedArray[randomPost];
	if(postPath != undefined){
		window.open(postPath.Path);
	}
}

const fetchLibraryArray = (secondaryFunction) => {
	let placeHolder;
	let libraryArray;
	fetch('https://api.github.com/gists/29e0f6a3d3baaeea9307195ea4d90992')
	.then(function(response) {
		return response.text();
	})	.then(function(text) {
		placeHolder = JSON.parse(text);
		let array = placeHolder.files.Library.content;
		libraryArray = JSON.parse(array);
		if(secondaryFunction != undefined && libraryArray != undefined && secondaryFunction == 'randomBlogPost'){
			randomBlogPost(libraryArray);
		}
		if(secondaryFunction != undefined && libraryArray != undefined && secondaryFunction == 'blogList'){
			blogList(libraryArray);
		}
		console.log(libraryArray);
		return libraryArray;
	});	
}

const blogList = (libraryArray) => {

	for(let i=0; i<libraryArray.length; i++){
	let readMore = document.getElementById('readMore'+i);
	let redirect = document.getElementById('redirect'+i);
	let date = document.getElementById('date'+i);
	let time = document.getElementById('time'+i);
	let image = document.getElementById('image'+i);
	let preview = document.getElementById('preview'+i);

	console.log(libraryArray[i]);

	image.src = libraryArray[i].Preview;
	console.log(libraryArray)
	image.style = "image-size: 300px, 300px;";
	readMore.href = libraryArray[i].Path;
	redirect.href = libraryArray[i].Path;
	redirect.innerHTML = libraryArray[i].Title;
	date.innerHTML = libraryArray[i].Date;
	time.innerHTML = libraryArray[i].Time;

	}
}
