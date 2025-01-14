import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import SearchedMovies from './components/SearchedMovies'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Popular} />
        <Route path="/top-rated" exact component={TopRated} />
        <Route path="/upcoming" exact component={Upcoming} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/search" component={SearchedMovies} />
      </Switch>
    </Router>
  )
}

export default App
