var Absurd = require("absurd");

Absurd(function(api) {
	api.add({
		body: {
			"font-size": "24px"
		}
	});

	api.import([
		"bower_components/google-code-prettify/src/prettify.css"
	]);
	
}).compileFile("css/styles.css", function(err, css) {
	if (err) {
		console.log(err);
	}
});