import React from "react";
import PropTypes from "prop-types";
import "../styles/css/Temp.css";

const propTypes = {
  name: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired
};

const Temp = props => {
  return (
    <div className="temp__div">
      <h1>{props.name}</h1>
      <p>{Math.round(Number((props.temp - 273.15) * 1.8) + 32)}&deg;</p>
    </div>
  );
};

Temp.propTypes = propTypes;
export default Temp;
