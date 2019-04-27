import React from "react";
import MovieFilter from "../containers/MovieFilter";
export default class Screen extends React.Component {
  render() {
    return (
      <div className="screen">
        <img
          className="title_image"
          src={require("../assets/images/a.png")}
          alt="title"
        />
        <img
          className="camera_image"
          src={require("../assets/images/camera.png")}
          alt="camera"
        />
        <img
          className="camera_image__light"
          src={require("../assets/images/light.png")}
          alt="camera"
        />
        <MovieFilter addTodo={this.props.addTodo} />
      </div>
    );
  }
}
