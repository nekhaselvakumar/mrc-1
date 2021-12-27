import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Project = (props) => (
  <tr>
    <td>{props.project.projectName}</td>
    <td>{props.project.description}</td>
    <td>
      <Link to={"/edit/" + props.project._id}>EDIT</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteProject(props.project._id);
        }}
      >
        DELETE
      </a>
      {" | "}
      <a href="#">SUBSCRIBE</a>
    </td>
  </tr>
);

export default class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this);

    this.state = { projects: [] };
  }

  componentDidMount() {
    console.log("mbjh");
    axios
      .get("http://localhost:5000/ongoing/")
      .then((response) => {
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProject(id) {
    axios.delete("http://localhost:5000/ongoing/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      projects: this.state.projects.filter((el) => el._id !== id),
    });
  }

  projectList() {
    return this.state.projects.map((currentproject) => {
      return (
        <Project
          project={currentproject}
          deleteProject={this.deleteProject}
          key={currentproject._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Projects</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Projectname</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this.projectList()}</tbody>
        </table>
      </div>
    );
  }
}
