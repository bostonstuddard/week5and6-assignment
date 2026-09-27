const express = require("express");
const app = express();
const PORTNO = 3000;

// Middleware for static pages and HTML form submissions.
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Escape user-submitted text before including it in an HTML response.
function escapeHTML(value) {
	return String(value ?? "").replace(/[&<>"']/g, function (character) {
		const entities = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;"
		};
		return entities[character];
	});
}

// Routes
app.get("/", function (req, res) {
	res.send(`Response from localhost:${PORTNO}/ <a href="/home.html">Open the forms</a>`);
});

app.get("/search", function (req, res) {
	const keyword = escapeHTML(req.query.keyword);
	res.send(`
		<!doctype html>
		<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Search Results</title>
		</head>
		<body>
			<h1>Search Results</h1>
			<p>You searched for: ${keyword}</p>
			<a href="/home.html">Back to Home</a>
		</body>
		</html>
	`);
});

app.post("/register", function (req, res) {
	const username = escapeHTML(req.body.username);
	const email = escapeHTML(req.body.email);
	res.send(`
		<!doctype html>
		<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Registration Confirmation</title>
		</head>
		<body>
			<h1>Registration Confirmation</h1>
			<p>Username: ${username}</p>
			<p>Email: ${email}</p>
			<a href="/home.html">Back to Home</a>
		</body>
		</html>
	`);
});

app.listen(PORTNO, function () {
	console.log(`Listening on Port: ${PORTNO}`);
});
