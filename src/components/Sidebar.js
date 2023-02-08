import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { slide as Menu } from 'react-burger-menu';
import slidestyle from '../utils/slidestyle';
import tmdbLogoGreen from '../svg/tmdbgreen.svg';
import MenuItem from '../components/MenuItem';
import SearchBar from '../components/SearchBar';

const WrapperStickyBox = styled(StickyBox)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.colors.lighter};
  box-shadow: 0 2px 40px var(--shadow-color);
  z-index: 999;
`;

const Hamburger = styled.div`
  width: 25px;
  height: auto;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: space-around;
  background-color: transparent;
  line-height: 1;
  cursor: pointer;
`;

const Bar = styled.span`
  height: 4px;
  width: 100%;
  display: inline-block;
  background-color: var(--color-primary);
  margin: 2px 0;
  border-radius: 10px;
  transform: all 0.3s;
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0 0 1rem 1rem;

  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const LinkWrap = styled(Link)`
  text-decoration: none;
  display: block;
  outline: none;
  margin-bottom: 0.5rem;
`;

const StyledCoffee = styled.a`
  font-size: 1.2rem;
  display: flex !important;
  outline: none;
  justify-content: center !important;
  align-items: center !important;
  background-color: #fff;
  color: #000;
  padding: 0.5rem 2rem;
  border-radius: 3px;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.6px;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
  margin: 2rem auto;
  transition: 0.3s all linear;

  &img {
    width: 27px;
    box-shadow: none;
    border: none;
    vertical-align: middle;
  }
`;

const CopyRight = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  color: #fff;
  margin-bottom: 2rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
  margin-left: 4px;
  font-weight: 500;
  color: inherit;
`;

const TmdbSvg = styled.img`
  max-width: 100%;
  height: 3rem;
  display: inline-block !important;
  margin-bottom: 1.4rem !important;
`;

const Sidebar = () => {
  const config = useSelector((state) => state.config);
  const { staticCategories, genres, loading, selected } = config;
  const [isOpened, setisOpened] = useState(false);

  const isMenuOpen = ({ isOpened }) => {
    setisOpened(isOpened);
  };

  return (
    <>
      <WrapperStickyBox>
        <Hamburger onClick={() => setisOpened(true)}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
        <SearchBar />
      </WrapperStickyBox>
      <Menu isOpen={isOpened} onStateChange={isMenuOpen} styles={slidestyle}>
        <Heading> Discover </Heading>
        {renderStatic(staticCategories, selected, setisOpened)}
        <Heading> Genres </Heading>
        {!loading && renderGenres(genres, selected, setisOpened)}

        <StyledCoffee>
          <img
            src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
            alt="Buy me a coffee"
          />
          <span style={{ marginLeft: '5px' }}> Buy me a coffee </span>
        </StyledCoffee>

        <CopyRight>
          CopyRight ©
          <StyledLink href="https://www.github.com/ferolic">Ferolic</StyledLink>
        </CopyRight>
        <TmdbSvg src={tmdbLogoGreen} alt="the tmdb api" />
      </Menu>
    </>
  );
};

const renderStatic = (categories, selected, setisOpened) => {
  return categories.map((category, i) => (
    <LinkWrap
      to={`/discover/${category}`}
      key={i}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        title={category}
        selected={selected === category ? true : false}
      />
    </LinkWrap>
  ));
};

const renderGenres = (genres, selected, setisOpened) => {
  return genres.map((genre) => (
    <LinkWrap
      to={`/genres/${genre.name}`}
      key={genre.id}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        title={genre.name}
        selected={selected === genre.name ? true : false}
      />
    </LinkWrap>
  ));
};

export default Sidebar;
