import React from "react";
import axios from "axios";
export default class MovieFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: "all",
      movie: "",
      results: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.movieRef = React.createRef();
  }
  handleInputChange(e) {
    this.setState({
      results: [],
      genre: this.state.genre
    });

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=62c6ce483c7a22d21edca90a14f3853c&language=en-US&genre=35&query=${
          e.target.value
        }&page=1&include_adult=false`
      )
      .then(resp => {
        this.setState({
          results: this.filterMovies(resp.data.results, 28)
        });
      });
  }

  handleSelectChange(e) {
    this.setState({
      genre: e.target.value,
      results: []
    });
  }

  filterMovies(movies, genre) {
    if (genre !== "all") {
      return movies.filter(movie => movie.genre_ids.indexOf(genre) !== -1);
    } else {
      return movies;
    }
  }
  render() {
    return (
      <div className="movie-filter" onChange={this.handleSelectChange}>
        <select value={this.state.genre} className="movie-filter__category">
          <option value="all">All genres</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="35">Romance</option>
          <option value="10749">Comedy</option>
        </select>
        <div className="filter__search-field--container">
          <input
            type="text"
            className="filter__search-field"
            onChange={this.handleInputChange}
            placeholder="Search for movies"
          />
          {this.state.results.length > 0 && (
            <div className="filter__search-results">
              {this.state.results.map(item => {
                return (
                  <div className="search-result__item">
                    <img
                      className="search-result__item__image"
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                        item.poster_path
                      }`}
                      alt="movie poster"
                    />
                    <span>{item.title}</span>
                    <a
                      href="#!"
                      onClick={() => {
                        this.props.addTodo(item);
                      }}
                    >
                      <img src={require("../assets/images/+.png")} alt="add" />
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button className="filter__search-btn">
          <img src={require("../assets/images/search.png")} alt="search item" />
        </button>
      </div>
    );
  }
  componentDidMount() {}
}
