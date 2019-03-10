# SelfProjects_Scrap-Results
Scrap Football Results 

## Procedure

### Generating the Raw Data
1. Navigate to the url https://www.soccer24.com
2. Select a date prior to today from the date picker to retrieve the results of games for the day.
3. Note. The website only features results for the current month.
4. Right-click on mouse and select Save as to to save the web page in the stored_web_pages folder.
5. Select the saved web page and open it in a new page.
6. Right click on mouse and select View page source
7. Select all the content on the page source displayed in the new page.
8. Paste the content in Notepad++ and save the file as sample.html format in the project folder.
9. In the server.js file, make the following changes:
9.1. Set the setFullYear as setFullYear(yy, m-1, d), where yy represents current year, m - current month, d current day
10. Save the changes to the server.js file
11. At the command prompt, run npm start

### Convert JSON to HTML
1. Navigate to the url http://convertjson.com/json-to-html-table.htm
2. Option 1 - Select the raw data file from the step above (ie the tips.txt file)
3. Option 3 - Select Format JSON
4. Select Convert JSON To HTML.


### Append the results data to the BetAnalysis.xls spreadsheet
1. Open the Betanalysis spreadsheet.
2. Place the curser after the last occupied row.
3. Copy the converted data in the Result Data box and paste it at the cusror position in the Bet analysis spreadhseet.