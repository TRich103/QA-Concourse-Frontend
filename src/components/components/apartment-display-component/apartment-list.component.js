import React from "react";
import ApartmentDisplay from './apartment-display.component';
import apartment from "./apartment.jpg";
import apartment2 from "./apartment2.jpg"


//Just a demo shwoing a list of apartment displays
export default class ApartmentList extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {

        return (
            <div>
                <ApartmentDisplay
                    heading = "QA apartment 1"
                    img = {apartment}
                    body = "Sample latin description for apartment 1: Cras sit amet nibh libero, in gravida nulla. 
                            Nulla vel metus scelerisque ante sollicitudin commodo. 
                            Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. 
                            Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
                />
                <ApartmentDisplay
                    heading = "QA apartment 2"
                    img = {apartment2}
                    body = "Sample latin description for apartment 2: Cras sit amet nibh libero, in gravida nulla. 
                            Nulla vel metus scelerisque ante sollicitudin commodo. 
                            Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. 
                            Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
                />
            </div>
        );
    };
};