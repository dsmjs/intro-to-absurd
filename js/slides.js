var absurd = Absurd();

var MarkdownComponent = absurd.component("markdown", {
	html: {
		div: "<% this.text %>"
	},
	constructor: function(text) {
		this.text = markdown.toHTML(text);
		this.populate();
	}
});

var PrettyComponent = absurd.component("pretty", {
	html: {
		pre: "<% this.text %>"
	},
	constructor: function(text) {
		if (text) {
			this.text = prettyPrintOne(text);
			this.populate();
		}
	}
});

var slideIndex = 0;

var SlideComponent = absurd.component("slide", {
	css: {
		".slide": {
			"pos": "a",
			"top": 0,
			"left": 0,
			"right": 0,
			"bottom": 0,
			"pad": "1em",
			"d": "n"
		},
		".open": {
			"d": "b"
		},
		".next": {
			"pos": "a",
			"bottom": "1em",
			"right": "1em",
			"pad": "0.5em 1em",
			"bg": "#099",
			"color": "#fff",
			"ted": "n",
			"bdrsa": "0.25em"
		}
	},
	html: {
		".slide": {
			"h1.slide-title": "<% this.title %>",
			".slide-content": "<% this.child('content') %>",
			".slide-code": "<% this.child('code') %>",
			"a.next[href='#'][data-absurd-event=click:next]": "Next"
		}
	},
	constructor: function(title, content, code) {
		this.title = title;
		this.set("children", {
			content: MarkdownComponent(content),
			code: PrettyComponent(code)
		});

		slideIndex++;
		this.set("parent", this.qs("body")).populate();
		this.el.id = "slide-" + slideIndex;
		this.qs(".next").href = "#slide-" + (slideIndex + 1);
	},
	next: function(e) {
		this.el.nextSibling.classList.add("open");
		this.el.classList.remove("open");
	}
});

// slides
var slide1 = SlideComponent(
	"Intro To Absurd",
	"by Eric Ponto"
);

var slide2 = SlideComponent(
	"Absurd is...",
	"* a CSS preprocessor \n" + 
	"* an HTML preprocess \n" + 
	"* a component based JavaScript framework"
);

var slide3 = SlideComponent(
	"CSS Preprocessor",
	"JavaScript objects --> CSS",
	"{ \n  body: { \n" +
	"    color: \"#333\", \n" +
	"    padding: \"1em\" \n\n" +
	"    h1: { \n" +
	"      color: \"#f00\" \n" +
	"    } \n" +
	"} \n\n" +
	"/\/\ --> \n\n" +
	"body { \n  color: #333; \n  padding: 1em; \n} \n\n" +
	"body h1 { \n  color: #f00; \n}"
);

var slide4 = SlideComponent(
	"Variables",
	"It's super easy now. Just create regular JavaScript variables and use them.",
	"var myColor = '#099';\n" +
	"absurd.add({\n" +
	"  body: {\n" + 
	"    color: myColor\n" + 
	"  }\n" + 
	"}).compile();"
);

var slide5 = SlideComponent(
	"Mixins and plugins",
	"Mixins and plugins are forms of functions for your CSS. Mixins are just a plain old functions, while plugins act as a custom CSS property",
	"var highlight = function(color, bg) {\n" +
	"  return {\n" +
	"    color: color,\n" +
	"    background: bg\n" +
	"  };\n" +
	"};\n\n" +
	"absurd.plugin('centerWide', function(api, width) {\n" +
	"  return {\n" +
	"    margin: \"0 auto\",\n" +
	"    display: \"block\",\n" +
	"    width: width\n" +
	"  };\n" +
	"});\n\n" +
	"absurd.add({\n" +
	"  body: [\n" + 
	"    highlight('#fff', '#036')\n" + 
	"  ],\n" + 
	"  main: {\n" +
	"    centerWide: \"800px\"\n" +
	"  }\n" +
	"}).compile();"
);

var slide6 = SlideComponent(
	"Reusable and Configurable CSS",
	"Create defaults, then extend them like you would for any JavaScript component.",
	"var button = {\n" +
	"	background: \"#c60\"\n" +
	"	color: \"#fff\",\n" +
	"	padding: \"5px 10px\"\n" +
	"};\n" +
	"\n" +
	"absurd.add({\n" +
	"	\".button\": _.extend(button, {\n" +
	"		background: \"#036\",\n" +
	"		border: \"1px solid #000\"\n" +
	"	})\n" +
	"});\n"
);

var slide7 = SlideComponent(
	"The Possibilities are Endless",
	"Loops, dependency management, etc..."
);

var slide8 = SlideComponent(
	"HTML Preprocessing is the Same",
	"JavaScript objects to HTML.",
	"\"#thing\": {\n" +
	"	\"h1\": \"Hello, World\",\n" +
	"	\".container\": {\n" +
	"		\"a[href=\"link.html\"]\": \"Click me!\"\n" +
	"	}\n" +
	"}\n\n" +
	"&lt;div id=\"thing\">\n" +
	"	&lt;h1>Hello, World&lt;/h1>\n" +
	"	&lt;div class=\"container\">\n" +
	"		&lt;a href=\"link.html\">Click me!&lt;/a>\n" +
	"	&lt;/div>\n" +
	"&lt;/div>" 
);

var slide9 = SlideComponent(
	"Templating",
	"Absurd uses a similar style to underscore, wrapping basically any JavaScript with <% my code goes here %>.",
	"absurd.morph(\"html\").add({\n" +
	"	h1: \"Hello, <% this.name %>\"\n" +
	"}).compile(function(err, html) {\n" +
	"	// do stuff\n" +
	"}, { name: \"Eric\" });"
);

var slide10 = SlideComponent(
	"Putting it Together",
	"Absurd has components that combine CSS, HTML, and your typcial view code.",
	"var MyComponent = absurd.component(\"myComponent\", {\n" +
	"	css: {},\n" +
	"	html: {},\n" +
	"	constructor: function(el) {\n" +
	"		this.set(\"parent\", el)\n" +
	"			.populate();\n" +
	"	}\n" +
	"});\n" +
	"\n" +
	"MyComponent(document.body);\n"
);

var slide11 = SlideComponent(
	"Events",
	"Attach events via the data-absurd-event attribute. There is also a `addEventListener` method on a component instance that allows you to do event hanlders.",
	"var MyComponent = absurd.component(\"myComponent\", {\n" +
	"	html: {\n" +
	"		\"a[data-absurd-event=\\\"click:doStuff\\\"]\": \"Click me\"\n" +
	"	},\n" +
	"	doStuff: function(e) {\n" +
	"		//do stuff\n" +
	"	}\n" +
	"});\n"
);

var slide12 = SlideComponent(
	"The end", ""
);

// initialize slide
var initSlide = document.querySelector(window.location.hash || "#slide-1");
initSlide = initSlide || slide1.el;
initSlide.classList.add("open");