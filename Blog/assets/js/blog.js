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
