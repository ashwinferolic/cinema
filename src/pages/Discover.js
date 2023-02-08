import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMoviesDiscover,
  setSelectedMenu,
  clearMovies,
} from '../redux/actions';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';
import MoviesList from '../components/MoviesList';
import Header from '../components/Header';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Discover = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const config = useSelector((state) => state.config);
  const { secure_base_url } = config.loading ? '' : config.base.images;

  const { name } = useParams();
  const lowercasedName = name.replace(/\s+/g, '_').toLowerCase();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get('page');

  useEffect(() => {
    dispatch(setSelectedMenu(name));

    scroll.scrollToTop({
      smooth: true,
    });

    dispatch(getMoviesDiscover(lowercasedName, page));
    dispatch(clearMovies());
  }, [dispatch, lowercasedName, page, name]);

  if (movies.loading) return <p> Loading... </p>;
  if (config.loading) return <p> Loading... </p>;

  return (
    <Wrapper>
      <Helmet>
        <title> {`${config.selected} Movies`} </title>
      </Helmet>
      {!config.loading && <Header title={config.selected} subtitle="movies" />}
      {!config.loading && (
        <MoviesList movies={movies} baseUrl={secure_base_url} />
      )}
    </Wrapper>
  );
};

export default Discover;
