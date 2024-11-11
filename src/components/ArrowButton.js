import React from 'react';
import styled from "styled-components";

const ArrowButton = ({ direction, handleScroll, activeIndex, movieList }) => {
  const isDisabled = direction === 'left' ? activeIndex === 0 : activeIndex >= movieList?.length - 6;
  return (
    <ArrowButtonStyle
      direction={direction}
      onClick={() => handleScroll(direction)}
      disabled={isDisabled}
    >
     
    </ArrowButtonStyle>
  );
};

const ArrowButtonStyle = styled.div`
  margin: ${(props) => (props.direction === 'left' ? '0 0 0 -2px' : '0')};
  position: relative;
  cursor: pointer;
  background-color: #000000;
  border-top: 40px solid transparent;
  border-bottom: 40px solid transparent;
  ${(props) =>
    props.direction === 'left'
      ? 'border-right: 20px solid #ab0c0c;'
      : 'border-left: 20px solid #ab0c0c;'};
`;

export default ArrowButton;