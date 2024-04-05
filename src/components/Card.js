import React from 'react';
import '../styles/card.css';
import spade from '../imgs/spade.png';
import heart from '../imgs/heart.png';
import diamond from '../imgs/diamond.png';
import club from '../imgs/club.png';
import jokerBlack from '../imgs/joker-hat-black.png';
import jokerRed from '../imgs/joker-hat-red.png';
import cardBackdrop from '../imgs/card.png';

const suits = {
  spade: spade,
  heart: heart,
  diamond: diamond,
  club: club
};

const Card = ({id, suit, value, color, shape , isFlipped, onClick}) => {
// const Card = ({ id, value, color, isFlipped, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  const suitImg = shape === 'joker' ? (color === 'black' ? jokerBlack : jokerRed) : suits[shape];
  const backgroundColor = isFlipped ? 'white' : 'gray';
  const backdrop = isFlipped ? 'none' : `url(${cardBackdrop})`;
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      style={{
        backgroundImage: isFlipped ? 'none' : `url(${cardBackdrop})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor:  'white', display: isFlipped ? 'flex' : 'block', justifyContent: 'center' , alignContent:  'center' }}
      onClick={handleClick}
    >
      
      {isFlipped && <>
        <img src={suitImg} alt={shape} />
        <span style={{color}}>{value}</span>
      </>}
    </div>
  );
}

export default Card;