import React from "react";
import { Paper } from "material-ui";
import Proptypes from "proptypes";
import AnimateOnChange from "react-animate-on-change";
import "./App.css";

export default class Seats extends React.Component {
  static propTypes = {
    showing: Proptypes.object,
    theater: Proptypes.string,
    movie: Proptypes.string
  };

  state = {
    selectedSeats: []
  };

  handleOnClick = (event, seatIndex) => {
    if (this.state.selectedSeats.indexOf(seatIndex) < 0) {
      event.target.className = "Seats-tentative";
      let selectedSeats = this.state.selectedSeats;
      selectedSeats.push(seatIndex);
      this.setState({ selectedSeats: selectedSeats });
    } else {
      event.target.className = "Seats-free";
      let selectedSeats = this.state.selectedSeats;
      selectedSeats.find((value, index) => {
        if (value === seatIndex) {
          selectedSeats.splice(index, 1);
        }
        return null;
      });
      this.setState({ selectedSeats: selectedSeats });
    }
  };

  onPurchase = () => {
    let seats = this.props.showing.seats;
    for (let index of this.state.selectedSeats) {
      seats[index] = true;
    }
    this.props.saveSeats(seats, this.props.theater, this.props.movie);
  };

  populateTable = () => {
    let tableRows = [];
    let i = 0;
    let rowCount = 0;
    let items = [];
    let seats = this.props.showing.seats;
    for (let seatIndex in seats) {
      items.push(
        seats[seatIndex] ? (
          <td className="Seats-taken" key={seatIndex}>
            {parseInt(seatIndex, 10) + 1}
          </td>
        ) : (
          <td
            className="Seats-free"
            onClick={event => this.handleOnClick(event, seatIndex)}
            key={seatIndex}
          >
            {parseInt(seatIndex, 10) + 1}
          </td>
        )
      );
      i++;
      if (i === 10) {
        tableRows.push(<tr key={rowCount}>{items}</tr>);
        rowCount++;
        items = [];
        i = 0;
      }
    }
    return tableRows;
  };

  render() {
    return (
      <div>
        <table align="center">
          <tbody>{this.populateTable()}</tbody>
        </table>
        <Paper className="Seats-paper">
          <p>
            Total Price:{" "}
            <AnimateOnChange
              baseClassName=""
              animationClassName="Seats-p"
              animate={true}
            >
              {this.state.selectedSeats.length * 10}€
            </AnimateOnChange>
          </p>
        </Paper>
        <br />
        <button className="Seats-button" onClick={this.onPurchase}>
          Purchase
        </button>
      </div>
    );
  }
}
