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
  
	const jsonObject = {
	  "Title": title,
	  "Date": date,
	  "time": time
	}
	//writeToFile(jsonObject);
	writeLibraryFile(jsonObject);
  
	// document.getElementById('output').value = JSON.stringify(jsonObject)
  }
  
const BlogPost = () => {
	// dateFormat();
	//readLibraryFile();
	convertToJSON();

  }

const writeToFile = (jsonObject) => {

    let fso;

	if (window.DOMParser)
		{ // Firefox, Chrome, Opera, etc.
			fso = new DOMParser("Scripting.FileSystemObject");
			//xmlDoc=parser.parseFromString(xml,"text/xml");
		}
		else // Internet Explorer
		{
			fso = new ActiveXObject("Scripting.FileSystemObject");
			//xmlDoc.async=false;
			//xmlDoc.loadXML(xml); 
		} 
	let fh = fso.openTextFile("data.txt", 8, false, 0);

    fh.WriteLine(jsonObject);
    fh.Close();
}

const readLibraryFile = () => {
	fetch('https://hook.integromat.com/cn71i0rbo0l0ms6zqxspulbs5z0udpcp')
	.then(function(response) {
		return response.text();
	})
	.then(function(text) {
		console.log(text);
	});
}

const writeLibraryFile = (jsonObject) => {
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const targetUrl = 'https://hook.integromat.com/ube8bwwmtnxyb94ugxa16tkxvksbt32o';
	console.log(jsonObject);
	const url = proxyUrl + targetUrl;
	fetch(url, {
		method: 'post',
		headers: {
		  "Content-type": "application/javascript"
		},
		body: JSON.stringify(jsonObject)
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


