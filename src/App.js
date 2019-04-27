import React, { Component } from "react";
import Header from "./containers/Header";
import Screen from "./containers/Screen";
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import "./App.css";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ["movie-list"]: [],
      value: "",
      id: 2
    };
    this.handleChange = this.handleChange.bind(this);
    this.displayTodos = this.displayTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    // Initialize the App Client
    this.client = Stitch.initializeDefaultAppClient("movie-list-ahslf");
    // Get a MongoDB Service Client
    // This is used for logging in and communicating with Stitch
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    // Get a reference to the todo database
    this.db = mongodb.db("movie-list");
    this.displayTodosOnLoad();
  }

  displayTodos() {
    // query the remote DB and update the component state
    this.db
      .collection("movie")
      .find({}, { limit: 1000 })
      .asArray()
      .then(todos => {
        this.setState({ ["movie-list"]: todos });
      });
  }
  displayTodosOnLoad() {
    // Anonymously log in and display comments on load
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(this.displayTodos)
      .catch(console.error);
  }
  addTodo(movie) {
    console.log(movie);
    // insert the todo into the remote Stitch DB
    // then re-query the DB and display the new todos
    this.db
      .collection("movie")
      .insertOne({
        owner_id: this.client.auth.user.id,
        movie_id: movie.id,
        user_id: this.state.id,
        movie_info: movie
      })
      .then(this.displayTodos)
      .catch(console.error);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Screen addTodo={this.addTodo} />
        <Header bottom />
        <h3>This is a todo app</h3>
        <hr />
        <p>Add a Todo Item:</p>
        <form onSubmit={this.addTodo}>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {/* Map over the todos from our remote DB */}
          {this.state["movie-list"].map(todo => {
            return (
              <li>
                {todo.movieName}

                <span
                  onClick={e => {
                    this.db
                      .collection("movie")
                      .deleteOne({
                        owner_id: this.client.auth.user.id,
                        movie_id: "2",
                        user_id: "23",
                        movieName: todo.movieName
                      })
                      .then(this.displayTodos);
                  }}
                >
                  Del
                </span>
              </li>
            );
          })}
        </ul>

        <div>
          <h1>Comet</h1>
          {this.state["movie-list"]
            .filter(movie => movie.user_id == 1)
            .map(todo => (
              <span>{todo.movie_info.title}</span>
            ))}
        </div>
        <div>
          <h1>L</h1>
          {this.state["movie-list"]
            .filter(movie => movie.user_id == 2)
            .map(todo => (
              <span>{todo.movie_info.title}</span>
            ))}
        </div>
      </div>
    );
  }
}
