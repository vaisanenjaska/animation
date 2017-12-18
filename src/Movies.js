import React from "react";
import PropTypes from "proptypes";
import { Paper } from "material-ui";
import americanassassin from "./images/AmericanAssassin_1080.jpg";
import bladerunner2049 from "./images/BladeRunner2049_1080.jpg";
import starwarstlj from "./images/StarWarsTLJ_1080t.jpg";
import jumanji from "./images/Jumanji_1080u.jpg";
import suburbicon from "./images/Suburbicon_1080.jpg";
import thejourney from "./images/TheJourney_1080.jpg";
import "./App.css";

export default class Movies extends React.Component {
  static propTypes = {
    movies: PropTypes.object
  };

  getMoviePic = movie => {
    switch (movie) {
      case "American Assassin":
        return americanassassin;
      case "Blade Runner 2049":
        return bladerunner2049;
      case "Star Wars: The Last Jedi":
        return starwarstlj;
      case "Jumanji: Welcome to the Jungle":
        return jumanji;
      case "The Journey":
        return thejourney;
      case "Suburbicon":
        return suburbicon;
      default:
        return;
    }
  };

  render() {
    let movies = this.props.movies;
    let movieList = [];

    for (let movie in movies) {
      let premiere = movies[movie].premiere ? (
        <li>Premiere: {movies[movie].premiere}</li>
      ) : null;
      movieList.push(
        <div key={movie} className="Movies-paper">
          <Paper>
            <li style={{ width: "100%", textAlign: "center" }}>
              <h3>{movie}</h3>
              <div
                style={{
                  width: "33%",
                  display: "inline-block"
                }}
              >
                <img
                  style={{
                    float: "left",
                    marginLeft: "15px"
                  }}
                  alt="pic"
                  src={this.getMoviePic(movie)}
                />
              </div>
              <div
                style={{
                  width: "33%",
                  display: "inline-block"
                }}
              >
                <p>{movies[movie].description}</p>
              </div>
              <div
                style={{
                  width: "33%",
                  display: "inline-block"
                }}
              >
                <ul
                  style={{
                    listStyleType: "none"
                  }}
                  align="center"
                >
                  <li>Director: {movies[movie].director}</li>
                  <li>
                    Starring:{" "}
                    {movies[movie].starring.map((value, index) => {
                      return (
                        <span key={value}>
                          {value}
                          <br />
                        </span>
                      );
                    })}
                  </li>
                  <li>Duration: {movies[movie].duration}</li>
                  <li>
                    Genres:{" "}
                    {movies[movie].genres.map((value, index) => {
                      return (
                        <span key={value}>
                          {value}
                          <br />
                        </span>
                      );
                    })}
                  </li>
                  {premiere}
                </ul>
              </div>
            </li>
          </Paper>
        </div>
      );
    }

    return (
      <ul
        style={{
          listStyleType: "none",
          padding: "0px"
        }}
        align="center"
      >
        {movieList}
      </ul>
    );
  }
}
