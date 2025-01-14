import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const API_KEY = 'your_api_key_here'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

class SearchedMovies extends Component {
  state = {
    searchQuery: '',
    searchedMovies: [],
  }

  handleSearchChange = event => {
    this.setState({searchQuery: event.target.value})
  }

  handleSearchSubmit = async event => {
    event.preventDefault()

    const {searchQuery} = this.state
    if (!searchQuery) return

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1`,
      )
      const data = await response.json()
      this.setState({searchedMovies: data.results})
    } catch (error) {
      console.error('Error fetching searched movies:', error)
    }
  }

  render() {
    const {searchQuery, searchedMovies} = this.state

    return (
      <>
        <Navbar />
        <div className="search-container">
          <form onSubmit={this.handleSearchSubmit} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search for movies..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>

          {searchedMovies.length > 0 ? (
            <div className="movie-grid">
              {searchedMovies.map(movie => (
                <div className="movie-card" key={movie.id}>
                  <img
                    src={`${IMAGE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <h3>{movie.title}</h3>
                  <p>Rating: {movie.vote_average}</p>
                  <Link to={`/movie/${movie.id}`}>
                    <button className="view-details-button">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No movies found. Please try again with a different query.</p>
          )}
        </div>
      </>
    )
  }
}

export default SearchedMovies
