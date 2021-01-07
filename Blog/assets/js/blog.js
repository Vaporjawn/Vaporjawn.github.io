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
	const newDirectory = new Map();
	newDirectory.set(title, {date: date, keywords: keywords})
	
	console.log(newDirectory);

	//write the new map




	console.log(title);
}