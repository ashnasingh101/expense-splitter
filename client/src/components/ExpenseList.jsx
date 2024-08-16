import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ExpenseList = ({ group, updateGroup }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState([]);

  const handleParticipantChange = (participant) => {
    setParticipants((prevParticipants) =>
      prevParticipants.includes(participant)
        ? prevParticipants.filter((p) => p !== participant)
        : [...prevParticipants, participant]
    );
  };

  const handleAddExpense = () => {
    if (!description || !amount || !paidBy || participants.length === 0) return;
    const newExpense = {
      description,
      amount: parseFloat(amount),
      paidBy,
      participants,
    };
    const updatedGroup = { ...group, expenses: [...group.expenses, newExpense] };
    updateGroup(updatedGroup);
    setDescription('');
    setAmount('');
    setPaidBy('');
    setParticipants([]);
  };

  const handleDeleteExpense = (index) => {
    const updatedGroup = { ...group, expenses: group.expenses.filter((_, i) => i !== index) };
    updateGroup(updatedGroup);
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Expenses
      </Typography>
      <List>
        {group.expenses.map((expense, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${expense.description} - ₹${expense.amount}`}
              secondary={`Paid by: ${expense.paidBy}, Participants: ${expense.participants.join(', ')}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteExpense(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Amount"
        variant="outlined"
        type="number"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        margin="normal"
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Select who paid</InputLabel>
        <Select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} label="Select who paid">
          {group.members.map((member) => (
            <MenuItem key={member} value={member}>
              {member}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <Typography variant="h3">Select Participants</Typography>
        {group.members.map((member) => (
          <div key={member}>
            <Checkbox
              checked={participants.includes(member)}
              onChange={() => handleParticipantChange(member)}
            />
            {member}
          </div>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={handleAddExpense} fullWidth>
        Add Expense
      </Button>
    </div>
  );
};

export default ExpenseList;






