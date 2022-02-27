import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const URL =
    'https://react-http-3ec4f-default-rtdb.firebaseio.com/movies.json';
  const moviesFetcher = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();

      console.log(data);

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      const transformedData = loadedMovies.map((d) => {
        return {
          title: d.title,
          releaseDate: d.releaseDate,
          openingText: d.openingText,
          id: d.id,
        };
      });
      setMovies(transformedData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMovieHandler = async (movie) => {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    moviesFetcher();
  }, [moviesFetcher]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={moviesFetcher}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length === 0 && <p>Found no movies</p>}
        {!isLoading && movies.length > 0 && !error && (
          <MoviesList movies={movies} />
        )}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
