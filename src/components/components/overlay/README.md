# QA-overlay

An overlay that renders on top of the rest of the pages contents, and can contain content itself.


### Customisation

Enter the stuff you want to show as props into the component with the variable name "content", and enter a string into the "title" prop i.e. <Overlay content={<div>variable pointing to content here</div>} title="Overlay Title">

You can also get rid of the transparent backdrop behind the overlay and modify the minimum height in QAOVerlay.css, which has comments telling you how to do so.

### Dependencies
Stick these in the dependencies section of your package.json file to allow you to use this component:

    "acorn": "^6.1.1",
    "bootstrap": "^4.3.1",
    "core-js": "^3.1.4",
    "jquery": "^3.4.1",
    "react": "^16.8.6",
    "react-bootstrap": "^1.0.0-beta.9",
    "react-dom": "^16.8.6",
    "react-scripts": "3.0.1",
    "typescript": "^3.5.1"

### Demo Deployment

-Open a command window in root Git directory and run:

```
npm install
npm start
```
