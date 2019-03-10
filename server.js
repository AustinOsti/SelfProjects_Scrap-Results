const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// send console.log to tips.txt file ...
const file = fs.createWriteStream('./tips.txt');

const archiveFile = 'sample.html';
const url = 'https://www.soccer24.com/';

//* option 1 - use fs to retrieve archived results stored an a local file as sample.html
fs.readFile(archiveFile, 'utf-8', function(err, data) {
	if (err) {
		console.log(err);
		return;
	}
	d = new Date().setFullYear(2019, 2, 9);
	getData(data, d);	
});

/* option2 - for current results, use axios to retrive results ... under WIP ...
axios.get(url)
.then(function(response){
	d = new Date();
	getData(response.data, d);
//	console.log(response.data);	
})
.catch(function(error){
	console.log(error);
}); 
*/

//parse the HTML with Cheerio.js
let getData = function(html, d){
	data = [];	
	let league = {};
	const $ = cheerio.load(html);
	$('table.soccer tr')
	.each(function(i, elem){
		const results = $(elem).children("td:nth-child(6)").text();		
		if (results.length === 0) {
			league = {
				a: $(elem).children("td:nth-child(2)").text()
			}			
			Object.freeze(league);
		}	
		if (results.length > 0) {
			data.push({
				date: new Date(d),
				time: $(elem).children("td:nth-child(2)").text(),
				status: $(elem).children("td:nth-child(3)").text(),
				league: league.a.replace("Standings", ""),
				home: $(elem).children("td:nth-child(4)").text(),
				away: $(elem).children("td:nth-child(5)").text(),
				results: $(elem).children("td:nth-child(6)").text(),
				odds_1:	$(elem).children("td:nth-child(8)").text(),
				odds_X: $(elem).children("td:nth-child(9)").text(),
				odds_2: $(elem).children("td:nth-child(10)").text()
			});			
		}	
	});
	file.write(JSON.stringify(data));
	file.end();
}