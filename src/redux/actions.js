// Card Actions
export const ADD_CARD = 'ADD_CARD';
export const TOGGLE_CARD_NUMBER = 'TOGGLE_CARD_NUMBER';
export const TOGGLE_LOCK_CARD = 'TOGGLE_LOCK_CARD';
export const ARCHIVE_CARD = 'ARCHIVE_CARD';
export const SET_DEFAULT = 'SET_DEFAULT';
export const ADD_TO_GPAY = 'ADD_TO_GPAY';

export const addCard = (cardData) => ({
  type: ADD_CARD,
  payload: cardData
});

export const toggleCardNumber = (cardId) => ({
  type: TOGGLE_CARD_NUMBER,
  payload: cardId
});

export const toggleLockCard = (cardId) => ({
  type: TOGGLE_LOCK_CARD,
  payload: cardId
});

export const archiveCard = (cardId) => ({
  type: ARCHIVE_CARD,
  payload: cardId
});

export const setAsDefault = (cardId, cardType) => ({
  type: SET_DEFAULT,
  payload: { cardId, cardType }
});

export const addToGPay = (cardId) => ({
  type: ADD_TO_GPAY,
  payload: cardId
});
  