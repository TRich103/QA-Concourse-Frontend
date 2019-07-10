import React from 'react';
import { Media } from 'reactstrap';

var imgStyle = {
  maxWidth: "256px",
  maxHeight: "256px",
  paddingRight : "10%",
  paddingTop: "1%"
};

var padding ={
  padding: "1%"
}

export default class ApartmentList extends React.Component {

  constructor(props) {
      super(props);
  }
  
  render() {

      return (
        <div style={padding}>
        <Media>
        <Media left href="#">
          <Media style={imgStyle} object src={this.props.img}/>
        </Media>
        <Media body>
          <Media heading>
            {this.props.heading}
          </Media>
          {this.props.body}
        </Media>
      </Media>
      </div>
      );
  };
};