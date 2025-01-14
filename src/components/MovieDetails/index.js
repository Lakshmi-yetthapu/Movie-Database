import {React} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const API_KEY = 'your_api_key_here'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

const MovieDetails = () => {
  const {id} = useParams()
  const [movieDetails, setMovieDetails] = React.useState(null)
  const [castDetails, setCastDetails] = React.useState([])

  React.useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        )
        const movieData = await movieResponse.json()
        setMovieDetails(movieData)

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
        )
        const castData = await castResponse.json()
        setCastDetails(castData.cast)
      } catch (error) {
        console.error('Error fetching movie details or cast:', error)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (!movieDetails) return <div>Loading...</div>

  return (
    <>
      <Navbar />
      <div className="movie-details-container">
        <div className="movie-details">
          <img
            src={`${IMAGE_URL}${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h2>{movieDetails.title}</h2>
            <p>
              <strong>Rating:</strong> {movieDetails.vote_average}
            </p>
            <p>
              <strong>Duration:</strong> {movieDetails.runtime} mins
            </p>
            <p>
              <strong>Genre:</strong>{' '}
              {movieDetails.genres.map(genre => genre.name).join(', ')}
            </p>
            <p>
              <strong>Release Date:</strong> {movieDetails.release_date}
            </p>
            <p>
              <strong>Overview:</strong> {movieDetails.overview}
            </p>
          </div>
        </div>

        <div className="cast-details">
          <h3>Cast</h3>
          <div className="cast-grid">
            {castDetails.map(cast => (
              <div className="cast-card" key={cast.id}>
                <img
                  src={`${IMAGE_URL}${cast.profile_path}`}
                  alt={cast.name}
                  className="cast-image"
                />
                <h4>{cast.name}</h4>
                <p>{cast.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieDetails
