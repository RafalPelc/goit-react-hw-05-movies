import { useState, useEffect } from 'react';
import { useParams, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { searchMovieDetails } from 'components/SearchMovies';
import { Link } from 'react-router-dom';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkHref = location.state?.from ?? '/movie';

  const { poster, title, releaseYear, userScore, overview, genres } =
    movie ?? {};

  useEffect(() => {
    searchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const backToMovies = () => {
    navigate(backLinkHref);
  };

  return (
    <>
      <button type="button" onClick={backToMovies} className={css.movies_btn}>
        Back to movies
      </button>
      {movie && (
        <div>
          <div className={css.movies_container}>
            <img src={poster} alt={title} className={css.movies_img} />
            <div className={css.movies_info}>
              <h3 className={css.movies_title}>
                {title} ({releaseYear})
              </h3>
              <p>User Score: {userScore}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <p>{genres.map(({ name }) => name).join(' ')}</p>
            </div>
          </div>

          <p className={css.movies_add}>Additional information</p>

          <div className={css.info_list}>
            <li>
              <Link
                to={'cast'}
                state={{ from: location?.state?.from }}
                className={css.movies_links}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={'reviews'}
                state={{ from: location?.state?.from }}
                className={css.movies_links}
              >
                Reviews
              </Link>
            </li>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
