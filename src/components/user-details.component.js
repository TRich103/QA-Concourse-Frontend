import React, { Component } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";
import AccessDenied from './modules/AccessDenied';
import { authService } from './modules/authService';
import moment from 'moment';
import '../css/trainee-details.css';
export default class UserDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            multerImage: DefaultImg,
			id: '',
			staff_fname: '',
            staff_lname: '',
            staff_email: '',
			currentUser: authService.currentUserValue,
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    setDefaultImage(uploadType) {
        if (uploadType === "multer"){
            this.setState({
                multerImage: DefaultImg
            });
        }
    }

    /** 
     *Function to upload image once it has been captured 
    */
   uploadImage(e,method){
       let imageObj ={};

       if (methid === multer){
           let imageFormObj = new FormData();

           imageFormObj.append("imageName", "multer-image-" + Date.now());
           imageFormObj.append("imageData", e.target.files[0]);
           /* 
           Stores a readable instance of the image
           being uploaded using multer
           */
          this.setState({
              multerImage: URL.createObjectURL(e.target.files[0])
          });
          axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    alert("Profile image successfully uploaded!");
                    this.setDefaultImage("multer");
                }
            })
            .catch((err) => {
                alert("There has been an error uploading the image");
                this.setDefaultImage("multer")
            });
       }
   }

    componentDidMount() {
        axios.get('http://'+process.env.REACT_APP_AWS_IP+':4000/admin/staff/'+this.state.currentUser.token._id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    staff_fname: response.data.fname,
                    staff_lname: response.data.lname,
                    staff_email: response.data.email,                 
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
	
    onSubmit(e) {   
        this.props.history.push('/user-edit/'+this.state.currentUser.token._id);
    }

render() {

	if(this.state.currentUser.token._id === this.state.currentUser.token._id) {
        return(
            <div className="details">
                <div className="detailsDiv">
                <div className="heading">
                <h1>{this.state.staff_fname} {this.state.staff_lname}</h1>
                <br></br>
                <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e, "multer")} Click here to upload a profile picture/>
                <img src={this.state.multerImage} alt="Upload a profile picture" className="process__image"/>
                <table onSubmit={this.onSubmit} className="trainee_table" cellPadding="20">
                    <tbody id="detailstbody">
                            <tr><th>First Name</th><td>{this.state.staff_fname}</td></tr>
                            <tr><th>Last Name</th><td>{this.state.staff_lname}</td></tr>
                            <tr><th>Email</th><td>{this.state.staff_email}</td></tr>
                            <tr>
							<th></th>
                            <td>
                                <form><input type="submit" value="Edit" className="edit-btn" /></form>
                            </td>
                            </tr>
                    </tbody>
                </table>
                </div>
                </div>
            </div>
		);
	}else{
      return (
		< AccessDenied />
		);
	}
    }
}

