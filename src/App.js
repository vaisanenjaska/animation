import React, { Component } from "react";
import Booking from "./Booking";
import Movies from "./Movies";
import { Transition } from "react-transition-group";
import _ from "lodash";
import currentmovies from "./currentmovies";
import upcomingmovies from "./upcomingmovies";
import "./App.css";

class App extends Component {
  state = {
    img: 0,
    currentView: <Booking />,
    viewChanged: false
  };

  render() {
    let transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 }
    };

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NorthKino</h1>
        </header>
        <div className="App-container">
          <div
            className="App-button"
            onClick={() => {
              if (
                !_.isEqual(
                  this.state.currentView,
                  <Movies movies={currentmovies} />
                )
              ) {
                this.setState({
                  viewChanged: true
                });
                setTimeout(
                  () =>
                    this.setState({
                      currentView: <Movies movies={currentmovies} />
                    }),
                  300
                );
              }
            }}
          >
            Current Movies
          </div>
          <div
            className="App-button"
            onClick={() => {
              if (
                !_.isEqual(
                  this.state.currentView,
                  <Movies movies={upcomingmovies} />
                )
              ) {
                this.setState({
                  viewChanged: true
                });
                setTimeout(
                  () =>
                    this.setState({
                      currentView: <Movies movies={upcomingmovies} />
                    }),
                  300
                );
              }
            }}
          >
            Upcoming Movies
          </div>
          <div
            className="App-button"
            onClick={() => {
              if (!_.isEqual(this.state.currentView, <Booking />)) {
                this.setState({ viewChanged: true });
                setTimeout(
                  () =>
                    this.setState({
                      currentView: <Booking />
                    }),
                  300
                );
              }
            }}
          >
            Booking
          </div>
        </div>
        <Transition
          onExit={() => this.setState({ viewChanged: false })}
          in={!this.state.viewChanged}
          timeout={300}
        >
          {state => {
            return (
              <div className="App-transition" style={transitionStyles[state]}>
                {this.state.currentView}
              </div>
            );
          }}
        </Transition>
      </div>
    );
  }
}

export default App;
