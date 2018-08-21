// Requires.
const http = require("http");
const fs = require("fs");
const path = require("path");
const data = require("./data/products");

// Server variable.
var server = http.createServer(function(request, response){
    console.log(`${request.method} request for ${request.url}`);
    // var page;

	// Separate GET and POST requests.
	if(request.method === "GET"){
		// If the url is any of these, then the user is on the specified page.
	    if(request.url === "/" || request.url === "/home" || request.url === "/index"){
			// Specify starting page
	        // page = "home";

			// Read the html file for the page and display it if there is no errors.
	        fs.readFile("./public/index.html", "UTF-8", function(error, contents){
	            if(error){
	                console.log("error, something went wrong");
	            } else {
	                response.writeHead(200, {"Content-Type": "text/html"});
	                response.end(contents);
	            }
	        });
	    } else if(request.url === "/about"){
	        fs.readFile("./public/about.html", "UTF-8", function(error, contents){
	            if(error){
	                console.log("error, something went wrong");
	            } else {
	                response.writeHead(200, {"Content-Type": "text/html"});
	                response.end(contents);
	            }
	        });
	    } else if(request.url === "/contact"){
	        fs.readFile("./public/contact.html", "UTF-8", function(error, contents){
	            if(error){
	                console.log("error, something went wrong");
	            } else {
	                response.writeHead(200, {"Content-Type": "text/html"});
	                response.end(contents);
	            }
	        });
	    } else if(request.url === "/news"){
	        fs.readFile("./public/news.html", "UTF-8", function(error, contents){
	            if(error){
	                console.log("error, something went wrong");
	            } else {
	                response.writeHead(200, {"Content-Type": "text/html"});
	                response.end(contents);
	            }
	        });
	    } else if(request.url.match(/.js/)){
	        var jsPath = path.join(__dirname, "public", request.url);
	        var fileStream = fs.createReadStream(jsPath, "UTF-8");
	        response.writeHead(200, {"Content-Type": "text/javascript"});
	        fileStream.pipe(response);
	    } else if(request.url.match(/.css$/)){
	        var cssPath = path.join(__dirname, "public", request.url);
	        var fileStream = fs.createReadStream(cssPath, "UTF-8");
	        response.writeHead(200, {"Content-Type": "text/css"});
	        fileStream.pipe(response);
	    } else if(request.url.match(/.jpg$/)){
			var imagePath = path.join(__dirname, "public", request.url);
			var imageStream = fs.createReadStream(imagePath);
			response.writeHead(200, {"Content-Type": "image/jpeg"});
			imageStream.pipe(response);
		} else if(request.url.match(/.png/)){
			var imagePath = path.join(__dirname, "public", request.url);
			var imageStream = fs.createReadStream(imagePath);
			response.writeHead(200, {"Content-Type": "image/png"});
			imageStream.pipe(response);
		} else if(request.url === "/allProducts"){
			response.writeHead(200, {"Content-Type": "text/json"});
			response.end(JSON.stringify(data));
		} else if(request.url === "/inStock"){
			inStock(response);
		}

	    // else if(request.url === "/contact"){
	    //     page = "contact";
	    // } else if(request.url === "/about"){
	    //     page = "about";
	    // } else {
	    //     page = "404 page not found";
	    // }

	    // response.writeHead(200, {"Content-Type": "text/html"});
	    // response.end(`
	    //     <html>
	    //         <head>
	    //             <title>Node Server</title>
	    //         </head>
	    //         <body>
	    //             <h1>${page}</h1>
	    //             <p>${request.url}</p>
	    //             <p>${request.method}</p>
	    //         </body>
	    //     </html>
	    //     `);
	}else if(request.method === "POST"){
		if(request.url === "/formSubmit"){
			console.log(request);
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.end("The form was submitted");
		}
	}


});

// Server is on port 3000
server.listen(3000);

console.log("The server is running on port 3000");

function inStock(response){
	var stock = data.filter(function(item){
		return item.inStock;
	});

	response.end(JSON.stringify(stock));
}
