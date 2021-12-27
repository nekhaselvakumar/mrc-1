import React, { Component } from "react";
import axios from "axios";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeprojectname = this.onChangeprojectname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      projectName: "",
      description: "",
    };
  }

  onChangeprojectname(e) {
    this.setState({
      projectName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      projectName: this.state.projectName,
      description: this.state.description,
    };

    console.log(project);

    axios
      .post("http://localhost:5000/ongoing/add", project)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Project</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>projectname: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.projectName}
              onChange={this.onChangeprojectname}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Project"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
