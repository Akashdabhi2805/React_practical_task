const initialState = {
    cards: [],
  };
  
  const cardReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CARD':
        return { ...state, cards: [...state.cards, action.payload] };
      case 'TOGGLE_LOCK_CARD':
        return {
          ...state,
          cards: state.cards.map(card =>
            card.id === action.payload
              ? { ...card, locked: !card.locked }
              : card
          )
        };
      case 'ARCHIVE_CARD':
        return {
          ...state,
          cards: state.cards.map(card =>
            card.id === action.payload
              ? { ...card, archived: !card.archived }
              : card
          )
        };
      case 'SET_DEFAULT':
        return {
          ...state,
          cards: state.cards.map(card =>
            card.id === action.payload
              ? { ...card, default: true }
              : { ...card, default: false }
          )
        };
      case 'ADD_TO_GPAY':
        return {
          ...state,
          cards: state.cards.map(card =>
            card.id === action.payload
              ? { ...card, gPay: true }
              : card
          )
        };
      default:
        return state;
    }
  };
  
  export default cardReducer;
  