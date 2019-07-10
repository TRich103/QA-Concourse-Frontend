# QA-form-component

A form component that generates forms from an array of JSON objects. The component itself can be found in qa-form.component.js


### JSON formatting
The component accepts an array of one or more JSON objects. Each object consists of a "FieldText" property for the prompt the user receives, a "Type" property (which can be "text", "select", "radio", "checkbox", "password", "email", "number, "textarea", "date" or "color" and a "UniqueID" property which should be unique for each JSON.

Note that "radio", "select" and "checkbox" types also require an "Options" property containing an array of strings.

Example data:
```
[{"FieldText": "Name", "Type": "text" , "UniqueID": "namefield"},
 {"FieldText": "Role", "Type": "select", "UniqueID": "rolefield", "Options": ["Admin", "Trainer", "Recruiter"] },
 {"FieldText": "Technologies", "Type": "checkbox", "UniqueID": "techfield", "Options": ["Java", "Python", "Javascript",}
```

Data the user inputs is entered into the formData JSON object.

Example formData object:
```
{Name:"John Smith", Role:"Trainer", Technologies:["Java","Python"]}
```

### Submitting the form

Pass in a function to the "submit" prop of the component, that takes the formData JSON as it's parameter. See example.js for an example implementation.

### Dependencies

Add these in your package.json dependencies:
```
"react": "^16.8.6",
"react-bootstrap": "^1.0.0-beta.9",
```
### Demo Deployment

-Open a command window in root Git directory and run:

```
npm install
npm start
```
Changing the JSON array in example.js will change what data the table is populated with.
