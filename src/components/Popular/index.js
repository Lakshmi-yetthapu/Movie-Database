import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const API_KEY = 'your_api_key_here'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

class Popular extends Component {
  state = {
    movies: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      )
      const data = await response.json()
      this.setState({movies: data.results})
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  render() {
    const {movies} = this.state

    return (
      <>
        <Navbar />
        <div className="movie-grid">
          {movies.map(movie => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              <Link to={`/movie/${movie.id}`}>
                <button className="view-details-button">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default Popular
