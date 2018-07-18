import React, { Component } from "react";
import axios from "axios";
import Temp from "./Temp";
import "../styles/css/Weather.css";
class Weather extends Component {
  constructor() {
    super();
    this.state = {
      zip: "",
      degrees: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getWeather(e) {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${
          this.state.zip
        },us&APPID=617ea9b2ad1249452a078d7eeb25239b`
      )
      .then(resp => {
        this.setState({ degrees: [resp.data] });
      })
      .catch(err => console.log(err));

    e.preventDefault();
  }
  render() {
    const { degrees } = this.state;
    const view = degrees.map((e, i) => {
      return <Temp key={i} name={e.name} temp={e.main.temp} />;
    });
    return (
      <div className="weather__div">
        <p>Search by Zipcode</p>
        <form className="weather-form" onSubmit={this.getWeather}>
          <input
            onChange={this.handleInput}
            placeholder="Zipcode"
            name="zip"
            required
          />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
        <div className="weather__temp">{view}</div>
      </div>
    );
  }
}

export default Weather;
