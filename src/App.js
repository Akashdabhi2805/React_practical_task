import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/store';
import CardSlider from './components/CardSlider';
import AddCardForm from './components/AddCardForm';
import './App.css';

function App() {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };
  const handleAddCard = () => {
    setShowAddCardModal(true);
  };

  const handleCloseModal = () => {
    setShowAddCardModal(false);
  };

  const handleCardDelete = (cardId) => {
    // Card deletion logic will be handled by Redux
    setSelectedCard(null);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setShowAddCardModal(true)}
        >
          Add Card
        </Button>
        
        <AddCardForm 
          open={showAddCardModal} 
          onClose={() => setShowAddCardModal(false)} 
        />
        
        <CardSlider />
      </div>
    </Provider>
  );
}

export default App;
