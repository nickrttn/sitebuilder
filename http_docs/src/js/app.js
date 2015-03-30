// Drag & Drop Site Builder
// Copyleft 2015, Nick Rutten

// This initializes the Foundation JS framework, 
// used for animations, modals, tabs and accordion.
// bron: foundation.zurb.com
$(document).foundation();

// Initialize variables
var mySite;

// UI components I need to use for click handlers or to add content to
var newButton 	= document.querySelector('#newModal input[type="submit"');
var saveButton 	= document.querySelector('.save');
var title 		= document.querySelector('.name > h1 > a');
var builder 	= document.querySelector('.builder');
var code 		= document.querySelector('code');
var sidebar		= document.querySelector('.sidebar');

// Site constructor
function Site(name){
	this.name = name;
	this.content = '';
	this.snippets = {
		'header1': 'snippets/header1.html',
		'header2': 'snippets/header2.html',
		'header3': 'snippets/header3.html',
		'main1'	 : 'snippets/main1.html',
		'main2'  : 'snippets/main2.html',
		'main3'  : 'snippets/main3.html',
		'footer1': 'snippets/footer1.html',
		'footer2': 'snippets/footer2.html'
	};

	// change the title in the navbar
	this.changeTitle = function(){
		title.textContent = this.name;
	};

	// add the code to the code-tab and make it pretty by highlighting it with prism.js
	this.addCode = function(){
		code.textContent = this.content;
		Prism.highlightElement(code);
	};

	// initiates the AJAX call with a callback to call if it completes
	// bron: http://stackoverflow.com/questions/14220321/how-to-return-the-response-from-an-asynchronous-call
	this.loadContent = function(object, filename, callback){
		if (filename.length > 0){
			$.get(filename, function(responseText){
				console.log('GET ' + filename);
			}).done(function(responseText){
				callback(object, responseText);
			});
		} else {
			builder.innerHTML = this.content;
		}
	};

	// adds the content to the div, and triggers addCode and reflowPage
	this.addContent = function(object, content){
		if (content) {
			object.content += content;
			builder.innerHTML = object.content;
			object.addCode();
			object.reflowPage();
		}
	};

	// reinitialize the page for the Foundation framework (enables animation/js functionality on new page elements)
	this.reflowPage = function(){
		$(document).foundation();
	};
}

// add an event listener to the new site button in the new project modal
newButton.addEventListener('click', function(e){
	e.preventDefault();

	var name = document.querySelector('[name="sitename"]').value;

	mySite = new Site(name);
	mySite.addContent('');
	mySite.changeTitle();

	$('#newModal').foundation('reveal', 'close');
});

saveButton.addEventListener('click', function(e){
	e.preventDefault();
});

// add an event listener to the entire sidebar,
// which listens for clicks to articles using
// event delegation (events bubble up through the DOM)
// bron: http://davidwalsh.name/event-delegate
sidebar.addEventListener('click', function(e){

	var parent = e.target.parentNode;
	var snippet = parent.classList[0];
	var tag = e.target.parentNode.nodeName;
	var siteIsCreated = mySite instanceof Site;

	if (siteIsCreated && tag === 'ARTICLE'){
		mySite.loadContent(mySite, mySite.snippets[snippet], mySite.addContent);
	} else if (siteIsCreated && tag !== 'ARTICLE'){
		return;
	} else if (!siteIsCreated) {
		$('#createFirst').foundation('reveal', 'open');
	}

});