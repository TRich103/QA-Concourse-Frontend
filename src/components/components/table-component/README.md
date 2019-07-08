# QA-table-service

A table component that populates with given JSON data. The component itself can be found in qa-table.component.js


### JSON formatting
The component accepts a JSON object containing "Headers" and "Rows" as an array of JSON objects. The "Headers" JSON object contains the column names and width(remove for default widths) and "Rows" contains the data for each row in the table.

Example JSON:
```
{
  Headers: [{'header':'Name', 'width':400}, {'header':'Age', 'width':400}, {'header':'Button', 'width':400}],
  Rows: [{'Name': 'John', 'Age': '22', 'Button': <button>Click Me!</button>},
         {'Name': 'Jane', 'Age': '26', 'Button': <button>No, Click Me!</button>}]
}
```
Please note, the keys used in "Rows" much match the value of "headers" in the Header JSON object for the table to populate correctly.


### Demo Deployment

-Open a command window in root Git directory and run:

```
npm install
npm start
```
Changing the JSON in generic-div.component.js will change what data the table is populated with.
