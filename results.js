const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// send extracted data to tips.txt file ...
const file = fs.createWriteStream('./tips.txt');

const archiveFile = 'sample.html';
const url = 'https://www.soccer24.com/';

// set the date of the results 
//	d = new Date().setFullYear(2019, 2, 10);
d = new Date();
d.setDate(d.getDate() - 1);

//* option 1 - use fs to retrieve archived results stored an a local file as sample.html
let extractData = function(archiveFile, d) {
	return new Promise(function(resolve, reject) {		
		fs.readFile(archiveFile, 'utf-8', function(err, data) {
			if (err) {
				reject(err);
			}		
			resolve(data);
		});	
	});
}

//parse the HTML with Cheerio.js
let getData = function(html, d){
	return new Promise(function(resolve, reject) {		
		data = [];	
		let league = {};
		const $ = cheerio.load(html);
		$('table.soccer tr')
		.each(function(i, elem){
			let results = $(elem).children("td:nth-child(6)").text();
			if (results.length === 0) {	
				league = {
					a: $(elem).children("td:nth-child(2)").text()
				}
				Object.freeze(league);
			}
			results = results.replace(/\s+/g, '').trim();
			status = $(elem).children("td:nth-child(3)").text().trim();
			odds_1 = $(elem).children("td:nth-child(8)").text().trim()
			if (results.length > 0 && odds_1 != "-") {
				if (status != "Postp" || status != "Canc") {
					data.push({
						date: new Date(d),
						time: $(elem).children("td:nth-child(2)").text().trim(),
						status: status,
						league: league.a.replace(/Standings|Draw|Live/g, "").trim(),
						home: $(elem).children("td:nth-child(4)").text().trim(),
						away: $(elem).children("td:nth-child(5)").text().trim(),
						results: results,
						odds_1:	odds_1,
						odds_X: $(elem).children("td:nth-child(9)").text(),
						odds_2: $(elem).children("td:nth-child(10)").text()
					});					
				}
			}	
		});
		file.write(JSON.stringify(data));
		file.end();
		resolve();
	});
}

// delete the archived data file to prevent duplicates
let deleteDataFile = function(fileToDelete) {
	return new Promise(function(resolve, reject) {	
		fs.unlink(fileToDelete, function (err) {
			if (err) throw err;
			// if no error, file has been deleted successfully
			console.log('Sample file deleted & process complete!');
		});	
		resolve();
	});
}

var promise = extractData(archiveFile, d);
promise.then(function(data) {
	return getData(data, d);
})			
.then(function() {
	return deleteDataFile(archiveFile);
})
.catch(function (err) {	
	console.log(err);
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


