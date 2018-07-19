import React, { Component } from "react";
import axios from "axios";
import Temp from "./Temp";
import "../styles/css/Weather.css";
class Weather extends Component {
  constructor() {
    super();
    this.state = {
      zip: "",
      degrees: [],
      error: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  handleInput(e) {
    this.setState({ zip: e.target.value });
  }
  showError() {}
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
      .catch(() => this.setState({ error: true }));

    e.preventDefault();
  }
  render() {
    const { degrees, error } = this.state;
    const view = degrees.map((e, i) => {
      return <Temp key={i} name={e.name} temp={e.main.temp} />;
    });
    return (
      <div className="weather__div">
        <p className="weather__title">Temp Getter</p>
        {error && (
          <p className="weather__err">
            Please enter a valid 5-digit US zipcode
          </p>
        )}
        <form className="weather-form" onSubmit={this.getWeather}>
          <input
            onChange={this.handleInput}
            placeholder="Zipcode"
            name="zip"
            type="number"
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
