import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const API_KEY = 'your_api_key_here'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

class TopRated extends Component {
  state = {
    topMovies: [],
    currentPage: 1,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    const {currentPage} = this.state
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
      )
      const data = await response.json()
      this.setState({topMovies: data.results})
    } catch (error) {
      console.error('Error fetching top-rated movies:', error)
    }
  }

  handleNext = () => {
    this.setState(
      prevState => ({currentPage: prevState.currentPage + 1}),
      this.getTopRatedMovies,
    )
  }

  handlePrev = () => {
    this.setState(
      prevState => ({currentPage: Math.max(prevState.currentPage - 1, 1)}),
      this.getTopRatedMovies,
    )
  }

  render() {
    const {topMovies, currentPage} = this.state

    return (
      <>
        <Navbar />
        <div className="movie-grid">
          {topMovies.map(movie => (
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
        <div className="pagination-controls">
          <button
            type="button"
            className="pagination-button"
            onClick={this.handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <p className="page-number">{currentPage}</p>
          <button
            type="button"
            className="pagination-button"
            onClick={this.handleNext}
          >
            Next
          </button>
        </div>
      </>
    )
  }
}

export default TopRated
