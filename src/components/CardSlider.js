import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLockCard, archiveCard, setAsDefault, addToGPay } from '../redux/actions';
import { Card, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LockOutlined, ArchiveOutlined } from '@mui/icons-material';
import { formatCardNumber, maskCardNumber } from '../utils/cardValidation';

const CardSlider = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards.cards);
  const [activeCardId, setActiveCardId] = useState(null);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const handleLock = (cardId) => {
    try {
      dispatch(toggleLockCard(cardId));
      const card = cards.find(card => card.id === cardId);
      const lockStatus = card.locked ? 'Unlocked' : 'Locked';
      toast.success(`Card ${lockStatus}!`);
    } catch (error) {
      toast.error('Error toggling card lock status');
      console.error('Error in handleLock:', error);
    }
  };

  const handleArchive = (cardId) => {
    dispatch(archiveCard(cardId));
    toast.success('Card Archived!');
  };

  const handleSetDefault = (cardId) => {
    dispatch(setAsDefault(cardId));
    toast.success('Card Set as Default!');
  };

  const handleAddToGPay = (cardId) => {
    dispatch(addToGPay(cardId));
    toast.success('Card Added to GPay!');
  };

  const handleShowCardNumber = (cardId) => {
    if (activeCardId === cardId) {
      setShowCardNumber(!showCardNumber);
    } else {
      setShowCardNumber(false);
    }
  };

  const handleSlideChange = (cardId) => {
    setActiveCardId(cardId);
    setShowCardNumber(false);
  };

  return (
    <div className="card-slider">
      {cards.map((card) => (
        <Card 
          key={card.id} 
          className={`card ${card.locked ? 'locked' : ''} ${card.archived ? 'archived' : ''}`}
          onClick={() => handleSlideChange(card.id)}
        >
          <div className="card-header">
            <h3>{card.name}</h3>
            <Button 
              variant="contained" 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                handleLock(card.id);
              }}
            >
              <LockOutlined />
            </Button>
            <Button 
              variant="contained" 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                handleArchive(card.id);
              }}
            >
              <ArchiveOutlined />
            </Button>
          </div>
          <div className="card-body">
            <div className="card-number">
              {activeCardId === card.id && showCardNumber 
                ? formatCardNumber(card.cardNumber)
                : maskCardNumber(card.cardNumber)
              }
              <Button onClick={(e) => {
                e.stopPropagation();
                handleShowCardNumber(card.id);
              }}>
                {showCardNumber ? 'Hide' : 'Show'} Card Number
              </Button>
            </div>
            {card.default && <span className="default-tag">Default</span>}
            <Button onClick={(e) => {
              e.stopPropagation();
              handleSetDefault(card.id);
            }}>Set as Default</Button>
            <Button onClick={(e) => {
              e.stopPropagation();
              handleAddToGPay(card.id);
            }}>Add to GPay</Button>
          </div>
        </Card>
      ))}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default CardSlider;
