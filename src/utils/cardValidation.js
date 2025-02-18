export const validateCardNumber = (number) => {
  // Luhn Algorithm implementation
  const digits = number.replace(/\D/g, '');
  
  if (digits.length !== 16) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateExpiryDate = (date) => {
  const [month, year] = date.split('/');
  const expiry = new Date(year, month - 1);
  const today = new Date();
  return expiry > today;
};

export const hasDefaultCard = (cards, cardType) => {
  return cards.some(card => card.cardType === cardType && card.isDefault);
};

export const formatCardNumber = (number) => {
  return number.replace(/(\d{4})/g, '$1 ').trim();
};

export const maskCardNumber = (number) => {
  const last4 = number.slice(-4);
  return `•••• •••• •••• ${last4}`;
};
