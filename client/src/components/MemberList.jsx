import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MemberList = ({ group, updateGroup }) => {
  const [newMember, setNewMember] = useState('');

  const handleAddMember = () => {
    if (newMember.trim() === '') return;
    const updatedGroup = { ...group, members: [...group.members, newMember] };
    updateGroup(updatedGroup);
    setNewMember('');
  };

  const handleDeleteMember = (member) => {
    const updatedGroup = {
      ...group,
      members: group.members.filter((m) => m !== member),
      expenses: group.expenses
        .map((expense) => ({
          ...expense,
          participants: expense.participants.filter((p) => p !== member),
          paidBy: expense.paidBy === member ? '' : expense.paidBy,
        }))
        .filter((expense) => expense.paidBy && expense.participants.length > 0),
    };
    updateGroup(updatedGroup);
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Members
      </Typography>
      <List>
        {group.members.map((member) => (
          <ListItem key={member}>
            <ListItemText primary={member} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMember(member)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <TextField
        label="Add new member"
        variant="outlined"
        fullWidth
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddMember} fullWidth>
        Add Member
      </Button>
    </div>
  );
};

export default MemberList;






