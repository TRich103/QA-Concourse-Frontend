import React, { Component } from 'react';
import axios from 'axios';
import '../css/history.css';
import { authService } from './modules/authService';
import AccessDenied from './modules/AccessDenied';
import { Button, ButtonGroup } from 'reactstrap';
import close from './icons/close2.svg';
import edit from './icons/add.svg';

export default class TraineeNotes extends Component {

    constructor(props) {
        super(props);

        this.clearAll = this.clearAll.bind(this);

        this.state = {
            userType: '',
            recordOf: '',
            record: [],
            note: '',
            currentUser: authService.currentUserValue,
            //currentUser: {token: {role: "admin", status: "Active", _id: "5d0bb39bd2ba63099c621593"}},
            notesArray: [],
        }
    }

    onSave = () => {

        axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/admin/notes/'+this.props.match.params.id, {note: this.state.note, addedBy: this.state.currentUser.token._id })
        .then(res => {
            console.log(res.data);
            window.location.reload();
        });
    }

    onChange = (e) => this.setState({ note: e.target.value });

    clearAll() {
        this.setState({
            notesArray: [],
        })
    }

    componentDidMount() {
        axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/admin/getRecord/' + this.props.match.params.id)
            .then(response => {
                this.setState({ record: response.data });
                console.log(this.state.record)
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/admin/staff/' + this.props.match.params.id)
            .then(response => {
                if (response.data === null) {
                    axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/trainee/' + this.props.match.params.id)
                        .then(response => {
                            if (response.data === null) {
                                this.setState({ recordOf: 'Not Found', userType: 'User' });
                            }
                            else {
                                this.setState({ recordOf: response.data.trainee_fname + " " + response.data.trainee_lname, userType: 'Trainee' });
                            }
                        })
                }
                else {
                    this.setState({ recordOf: response.data.email, userType: 'Staff' });
                }
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://' + process.env.REACT_APP_AWS_IP + ':4000/admin/getNotes/'+this.props.match.params.id)
        .then(response => {
            response.data.trainee_notes.map(note=>
                {
                    let nextNote = {"note":note.note};

                    this.state.notesArray.push(nextNote);
                }
                )
            console.log(response)
        })
    };

    render() {
        if (this.state.currentUser.token.role !== 'admin') {
            return (
                <AccessDenied />
            )
        }
        else {
            let recordOf = this.state.recordOf;
            let userType = this.state.userType;
            let other = this.state.other;
            const { notesArray, newNote } = this.state;
            return (
                <div className="BigBox">
                    <div className="QAtable">
                        <div>
                            <h2>Expenses for {userType} - {recordOf}</h2>
                            <hr />
                            <div>
                                &nbsp;&nbsp;&nbsp;<label>Note: </label>&nbsp;&nbsp;
                                <input onChange={this.onChange} type="text" ></input> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonGroup>  <Button type="submit" id="createNotesButton" onClick={this.onSave}>Add</Button> </ButtonGroup>

                                </div>
                                <table id="logTable" className="table table-striped" style={{ marginTop: 20 }} >
                                    <thead>
                                        <tr>
                                            <th>Notes</th>
                                            <th>Actions</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {notesArray.map((note, index) => {
                                            return (
                                                <tr>
                                                    <td>{note.note}</td>
                                                    <td>

                                                        <button className="actionBtn" onClick={() => {
                                                                            if (window.confirm('Are you sure you wish to delete this note?'))
                                                                            axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/admin/removeNotes/'+this.props.match.params.id, {"note": note.note, "location": index, "addedBy":this.state.currentUser.token._id}).then(() => window.location.reload()) } }>
                                                                            Delete
                                                                            <img src={close}></img>
                                                                            <img></img>
                                                        </button>
                                                        &nbsp;
                                                        <button className="actionBtn" onClick={() => {
                                                                            let newNote = prompt("Edit the note:", "" );
                                                                            if(newNote !== null){
                                                                            axios.post('http://'+process.env.REACT_APP_AWS_IP+':4000/admin/updateNotes/'+this.props.match.params.id, {"note": note.note, "newNote": newNote, "location": index, "addedBy":this.state.currentUser.token._id}).then(() => window.location.reload())
                                                                            }}}>
                                                                            Edit
                                                                            <img src={edit}></img>
                                                                            <img></img>
                                                        </button>
                                                   
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table >
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <ButtonGroup>
                                    <Button type="submit" id="createNoteBtn" style={{ marginBottom:30}} onClick={() => { document.location.href = "/"; }}>⭠ Back</Button>
                            </ButtonGroup>

                        </div>
                    </div>


            )
        }
    }
}
