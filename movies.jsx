import React, { Component } from "react";
import MovieTable from "./movieTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../fakeMovieService";
import { paginate } from "../util/paginate";
import { getGenres } from "../fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    sortColoumn: { path: "title", order: "asc" },
    genres: [],
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "allGenres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleGenreSelect = (genre) => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    // console.log(page);

    this.setState({ currentPage: page });
  };
  handleSort = (sortColoumn) => {
    // console.log(path);

    this.setState({ sortColoumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColoumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;
    if (count === 0) return <p>No Movies Are Availabale</p>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColoumn.path], [sortColoumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col-9">
            <p>Showing movies {filtered.length}</p>
            <MovieTable
              movies={movies}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColoumn={sortColoumn}
            />
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
