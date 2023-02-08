import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { clearMovies, getMoviesSearch } from '../redux/actions';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import MoviesList from '../components/MoviesList';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Search = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const config = useSelector((state) => state.config);
  const movies = useSelector((state) => state.movies);
  const { secure_base_url } = config.base.images;

  const search = useLocation().search;
  const page = new URLSearchParams(search).get('page');

  useEffect(() => {
    dispatch(getMoviesSearch(query, page));
    scroll.scrollToTop({
      smooth: true,
    });
    return () => clearMovies();
  }, [dispatch, query, page]);

  if (movies.loading) {
    return <p> Loading... </p>;
  } else if (movies.total_results === 0) {
    return (
      <NotFound
        title="Sorry!"
        subtitle={`There were no results for ${query}...`}
      />
    );
  }

  return (
    <Wrapper>
      <Helmet>
        <title> {`${query} - Search results`} </title>
      </Helmet>
      <Header title={query} subtitle="search results" />
      <MoviesList movies={movies} baseUrl={secure_base_url} />
    </Wrapper>
  );
};

export default Search;
