import React, { Component } from "react";
import Like from "./common/like";

class MovieTable extends Component {
  raiseSort = (path) => {
    const sortColoumn = { ...this.props.sortColoumn };
    if (sortColoumn.path == path)
      sortColoumn.order = sortColoumn.order === "asc" ? "desc" : "asc";
    else {
      sortColoumn.path = path;
      sortColoumn.order = "asc";
    }
    this.props.onSort(sortColoumn);
  };
  render() {
    const { movies, onDelete, onSort } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.raiseSort("title")}>Title</th>
              <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
              <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
              <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like />
                </td>
                <td>
                  <button
                    onClick={() => onDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MovieTable;
