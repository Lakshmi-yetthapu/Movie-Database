import {Link} from 'react-router-dom'
import './index.css'

const Navbar = () => (
  <>
    <div className="NavBar-container">
      <div>
        <h1>movieDB</h1>
      </div>
      <div>
        <Link to="/">Popular</Link>
        <Link to="/top-rated">Top Rated</Link>
        <Link to="/upcoming">Upcoming</Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
    </div>
  </>
)

export default Navbar
