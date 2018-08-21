console.log("JS is loaded into the page");


function getAllProducts(){
	$.ajax({
		type: "GET",
		url: "http://192.168.33.10:3000/allProducts",
		dataType: "json",
		success: function(products){
			console.log(products);
		},
		error: function(err){
			console.log("Error "+err.status);
			console.log(err);
		}
	});
}

function getInStockProducts(){
	$.ajax({
		type: "GET",
		url: "http://192.168.33.10:3000/inStock",
		dataType: "json",
		success: function(products){
			console.log(products);
		},
		error: function(err){
			console.log("Error "+err.status);
			console.log(err);
		}
	});
}

function getNoStockProducts(){
	$.ajax({
		type: "GET",
		url: "http://192.168.33.10:3000/noStock",
		dataType: "json",
		success: function(products){
			console.log(products);
		},
		error: function(err){
			console.log("Error "+err.status);
			console.log(err);
		}
	});
}
