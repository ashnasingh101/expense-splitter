import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGroupById, updateGroup } from '../services/groupService';
import MemberList from '../components/MemberList';
import ExpenseList from '../components/ExpenseList';
import BalanceList from '../components/BalanceList';
import { Tabs, Tab, Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Group = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const fetchGroup = async () => {
      const data = await getGroupById(id);
      setGroup(data);
    };
    fetchGroup();
  }, [id]);

  const handleUpdateGroup = async (updatedGroup) => {
    const data = await updateGroup(group._id, updatedGroup);
    setGroup(data);
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return group ? (
    <div>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
        Back to Home
      </Button>
      <Typography variant="h2" align="center" gutterBottom>
        {group.name}
      </Typography>
      <Tabs value={currentTab} onChange={handleChangeTab} centered>
        <Tab label="Members" />
        <Tab label="Expenses" />
        <Tab label="Balance" />
      </Tabs>
      <Box hidden={currentTab !== 0}>
        <MemberList group={group} updateGroup={handleUpdateGroup} />
      </Box>
      <Box hidden={currentTab !== 1}>
        <ExpenseList group={group} updateGroup={handleUpdateGroup} />
      </Box>
      <Box hidden={currentTab !== 2}>
        <BalanceList group={group} />
      </Box>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Group;




