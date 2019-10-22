import React, { Component } from "react";
import "./Client.css";

export default class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      result: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit = async e => {
    e.preventDefault();
    let name = this.state.name;
    let age = this.state.age;
    let todo = { name: name, age: age };

    fetch("http://localhost:1234", {
      method: "POST",
      // headers: {
      //   "Content-Type": "text/plain"
      // },                         
      body: JSON.stringify(todo)
    })
  };

  handleDisplay = () =>{
    fetch('http://localhost:1234/demo')
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData)
        this.setState({
          result : jsonData
        })
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
  }
  render() {
    return (
      <div className="form-wrapper">
        <form onSubmit={this.handleSubmit} id="myform">
          <div>
            <label className="label-txt" htmlFor="name">
              Enter your name:{" "}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label className="label-txt" htmlFor="age">
              Enter your age:{" "}
            </label>
            <input
              id="age"
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </div>
          <div className="btn-wrapper">
            <button className="submit-btn" type="submit">
              Submit
            </button>
            <button className="submit-btn" onClick={this.handleDisplay} type="submit">
              Display
            </button>
          </div>
        </form>
        {this.state.result && (
          <div className="end-display">
            <div>
              Name:<span>{this.state.result.name}</span>
            </div>
            <div>
              Age: <span>{this.state.result.age}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}