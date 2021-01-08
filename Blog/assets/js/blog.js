$(document).ready(function() {
	
	/* ======= Highlight.js Plugin ======= */ 
    /* Ref: https://highlightjs.org/usage/ */     
    $('pre code').each(function(i, block) {
	    hljs.highlightBlock(block);
	 });

});

const BlogPost = () => {
	this.title = document.title;
	this.date = document.date;
	this.keywords = document.keywords;
	//get the old map

	console.log(directory instanceof Map);

	//creation of new map
	const newDirectory = directory;
	newDirectory.set(title, {date: date, keywords: keywords});
	const articleEntry = newDirectory.get(title, {date: date, keywords: keywords});

	if (compareMaps(directory, newDirectory) === false){
		directory = newDirectory;
	}
	
	console.log(newDirectory);
	console.log(directory);
	console.log(newDirectory.title.date);

	//write the new map to the directory file 


	console.log(title);
}

const compareMaps = (map1, map2) => {
    var testVal;
    if (map1.size !== map2.size) {
        return false;
    }
    for (var [key, val] of map1) {
        testVal = map2.get(key);
        // in cases of an undefined value, make sure the key
        // actually exists on the object so there are no false positives
        if (testVal !== val || (testVal === undefined && !map2.has(key))) {
            return false;
        }
    }
    return true;
}

//add singular word year month and day if you want

const dateFormat = () => {

	const hiddenDate = document.getElementById('date').textContent;
	console.log(hiddenDate);
	let articleDate;
	const postDate = hiddenDate.split("/");
	const formattedDate = todaysDate().split("/");

	if(postDate[2] < formattedDate[2] && parseInt(postDate[2]) !== parseInt(formattedDate[2]) - 1){
		let years = formattedDate[2] - postDate[2];
		articleDate = "Published " + years + " year(s) ago";		
	}
	if(postDate[2] == formattedDate[2] || parseInt(postDate[2]) == parseInt(formattedDate[2]) - 1){
		let absMonth = Math.abs(parseInt(postDate[0]) - parseInt(formattedDate[0]));
		if(postDate[0] < formattedDate[0]){
			let months = 12 - absMonth;
			articleDate = "Published " + months + " month(s) ago";
		}
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
	console.log(articleDate);
}

//today's date but parsed in the MM/DD/YYY format
const todaysDate = () => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	const yyyy = today.getFullYear();
	
	const parsedToday = mm + '/' + dd + '/' + yyyy;
	console.log(parsedToday);

	return parsedToday;
}

//date maker
//assign a number to the blog post, that represents how many days ago it was posted then divide to simplify the date to days months or years depending on time
