import { searchMovieCredits } from 'components/SearchMovies';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams('movieId');
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    searchMovieCredits(movieId).then(setCredits);
  }, [movieId]);

  return (
    <div className={css.cast_container}>
      {credits.length > 0 && (
        <ul className={css.cast_list}>
          {credits.map(({ id, name, character, photo }) => {
            return (
              <li key={id} className={css.cast_item}>
                <img src={photo} alt={name} className={css.cast_img} />
                <div className={css.cast_description}>
                  <p className={css.cast_name}>{name}</p>
                  <p className={css.cast_character}>Character: {character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Cast;
