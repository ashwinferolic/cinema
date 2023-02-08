import React from 'react';
import styled from 'styled-components';
import Stars from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';

const StarWrapper = styled(Stars)`
  line-height: 1;
`;

const FontAwesome = styled(FontAwesomeIcon)`
  color: inherit;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-right: 10px;
  @media ${(props) => props.theme.mediaQueries.smaller} {
    margin-right: 5px;
  }
`;

const Rating = ({ number }) => {
  return (
    <StarWrapper
      emptySymbol={<FontAwesome icon={farFaStar} size="lg" />}
      fullSymbol={<FontAwesome icon={fasFaStar} size="lg" />}
      initialRating={number}
      readonly
    />
  );
};

export default Rating;
