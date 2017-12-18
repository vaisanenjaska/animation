import React from "react";
import { Paper } from "material-ui";
import schedule from "./schedule.json";
import theaters from "./theaters.json";
import movienames from "./movienames.json";
import { FormattedDate } from "react-intl";
import { Transition } from "react-transition-group";
import Seats from "./Seats";
import "./App.css";

export default class Booking extends React.Component {
  state = {
    schedule: schedule,
    selectedTheater: theaters[0],
    selectedMovie: movienames[0],
    clickedShowing: null,
    switchViews: false
  };

  saveSeats = (seats, theater, movie) => {
    let schedule = this.state.schedule;
    schedule[theater][movie].seats = seats;
    this.setState({
      schedule: schedule,
      switchViews: true
    });
    setTimeout(() => {
      this.setState({ clickedShowing: null });
    }, 300);
  };

  render() {
    let transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 }
    };

    let view = (
      <div>
        <br />
        <Paper className="Booking-paper">
          <div className="Booking-div">
            <select
              className="Booking-select"
              value={this.state.selectedTheater}
              onChange={e => this.setState({ selectedTheater: e.target.value })}
            >
              <optgroup className="Booking-optgroup">
                {theaters.map((value, index) => {
                  return (
                    <option className="Booking-option" key={index}>
                      {value}
                    </option>
                  );
                })}
              </optgroup>
            </select>
            <select
              className="Booking-select"
              value={this.state.selectedMovie}
              onChange={e => this.setState({ selectedMovie: e.target.value })}
            >
              <optgroup className="Booking-optgroup">
                {movienames.map((value, index) => {
                  return (
                    <option className="Booking-option" key={index}>
                      {value}
                    </option>
                  );
                })}
              </optgroup>
            </select>
            <table className="Booking-table" align="center">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Room</th>
                </tr>
                {this.state.schedule[this.state.selectedTheater][
                  this.state.selectedMovie
                ].map((value, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        this.setState({
                          switchViews: true
                        });
                        setTimeout(
                          () =>
                            this.setState({
                              clickedShowing: value
                            }),
                          300
                        );
                      }}
                    >
                      <td>
                        <FormattedDate
                          year="numeric"
                          month="numeric"
                          day="numeric"
                          hour="numeric"
                          minute="numeric"
                          value={value.date}
                        />
                      </td>
                      <td>{value.room}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Paper>
      </div>
    );

    if (this.state.clickedShowing) {
      view = (
        <div>
          <Seats
            showing={this.state.clickedShowing}
            theater={this.state.selectedTheater}
            movie={this.state.selectedMovie}
            saveSeats={this.saveSeats}
          />
          <button
            className="Booking-button"
            onClick={() => {
              this.setState({
                switchViews: true
              });
              setTimeout(() => {
                this.setState({ clickedShowing: null });
              }, 300);
            }}
          >
            Back
          </button>
        </div>
      );
    }
    return (
      <Transition
        onExit={() => this.setState({ switchViews: false })}
        in={!this.state.switchViews}
        timeout={300}
      >
        {state => {
          return (
            <div className="App-transition" style={transitionStyles[state]}>
              {view}
            </div>
          );
        }}
      </Transition>
    );
  }
}
