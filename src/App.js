import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import styled from 'styled-components';
import Discover from './pages/Discover';
import { useDispatch } from 'react-redux';
import { init } from './redux/actions';
import Sidebar from './components/Sidebar';
import Genre from './pages/Genre';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;

  @media ${(props) => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }
  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <Router>
      <Sidebar />
      <Wrapper>
        <ContentWrapper>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/discover/popular" />}
            />
            <Route path="/discover/:name" element={<Discover />} />
            <Route path="/genres/:name" element={<Genre />} />
          </Routes>
        </ContentWrapper>
      </Wrapper>
    </Router>
  );
};

export default App;
