import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../redux/actions';
import { toast } from 'react-toastify';
import { Dialog, DialogTitle, DialogContent, TextField, Button, FormControlLabel, 
         Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { validateCardNumber, validateExpiryDate, hasDefaultCard } from '../utils/cardValidation';
import 'react-toastify/dist/ReactToastify.css';
import './AddCardForm.css';

const AddCardForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards.cards);
  
  const [cardDetails, setCardDetails] = useState({
    name: '',
    bankName: '',
    cardType: '',
    cardNumber: '',
    validTill: '',
    cvv: '',
    isDefault: false,
    addToGPay: false,
    locked: false,
    archived: false,
    id: Date.now().toString()
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!cardDetails.name || cardDetails.name.length > 35) {
      toast.error('Name must be between 1 and 35 characters');
      return false;
    }

    if (!cardDetails.bankName) {
      toast.error('Bank name is required');
      return false;
    }

    if (!cardDetails.cardType) {
      toast.error('Please select a card type');
      return false;
    }

    if (!validateCardNumber(cardDetails.cardNumber)) {
      toast.error('Please enter a valid 16-digit card number');
      return false;
    }

    if (!validateExpiryDate(cardDetails.validTill)) {
      toast.error('Please enter a valid future date (MM/YYYY)');
      return false;
    }

    if (!cardDetails.cvv || !/^\d{3,4}$/.test(cardDetails.cvv)) {
      toast.error('Please enter a valid CVV');
      return false;
    }

    if (cardDetails.isDefault && hasDefaultCard(cards, cardDetails.cardType)) {
      toast.error(`A default ${cardDetails.cardType} card already exists`);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        dispatch(addCard(cardDetails));
        toast.success('Card added successfully!');
        onClose();
      } catch (error) {
        toast.error('Error adding card');
        console.error('Error:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Card</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="add-card-form">
          <TextField
            fullWidth
            label="Card Holder Name"
            name="name"
            value={cardDetails.name}
            onChange={handleInputChange}
            required
            inputProps={{ maxLength: 35 }}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Bank Name"
            name="bankName"
            value={cardDetails.bankName}
            onChange={handleInputChange}
            required
            margin="normal"
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Card Type</InputLabel>
            <Select
              name="cardType"
              value={cardDetails.cardType}
              onChange={handleInputChange}
            >
              <MenuItem value="Credit">Credit</MenuItem>
              <MenuItem value="Debit">Debit</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            required
            inputProps={{ maxLength: 16 }}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Valid Till"
            name="validTill"
            type="month"
            value={cardDetails.validTill}
            onChange={handleInputChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="CVV"
            name="cvv"
            type="password"
            value={cardDetails.cvv}
            onChange={handleInputChange}
            required
            inputProps={{ maxLength: 4 }}
            margin="normal"
          />

          <div className="checkbox-group">
            <FormControlLabel
              control={
                <Checkbox
                  name="isDefault"
                  checked={cardDetails.isDefault}
                  onChange={handleInputChange}
                />
              }
              label="Set as Default Card"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="addToGPay"
                  checked={cardDetails.addToGPay}
                  onChange={handleInputChange}
                />
              }
              label="Add to GPay"
            />
          </div>

          <div className="form-actions">
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Card
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardForm;
