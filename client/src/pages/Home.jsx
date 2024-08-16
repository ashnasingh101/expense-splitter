import React, { useState, useEffect } from 'react';
import { createGroup, getGroups, deleteGroup } from '../services/groupService';
import { Link } from 'react-router-dom';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    try {
      const newGroup = await createGroup(groupName);
      setGroups([...groups, newGroup]);
      setGroupName('');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      await deleteGroup(id);
      setGroups(groups.filter(group => group._id !== id));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  return (
    <div>
      <Typography variant="h1" align="center" gutterBottom>
        Expense Splitter
      </Typography>
      <TextField
        label="Enter group name"
        variant="outlined"
        fullWidth
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        margin="normal"
      />
      <Box my={2}>
        <Button variant="contained" color="primary" onClick={handleCreateGroup} fullWidth>
          Create Group
        </Button>
      </Box>
      <Typography variant="h2" align="center" gutterBottom>
        Groups
      </Typography>
      <List>
        {groups.map((group) => (
          <ListItem key={group._id} component={Link} to={`/group/${group._id}`}>
            <ListItemText primary={group.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteGroup(group._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;








