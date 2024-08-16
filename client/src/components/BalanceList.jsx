import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const calculateBalances = (group) => {
  const balances = {};

  group.members.forEach((member) => {
    balances[member] = {};
    group.members.forEach((otherMember) => {
      if (member !== otherMember) {
        balances[member][otherMember] = 0;
      }
    });
  });

  group.expenses.forEach((expense) => {
    const share = expense.amount / expense.participants.length;
    expense.participants.forEach((participant) => {
      if (participant !== expense.paidBy) {
        balances[participant][expense.paidBy] += share;
      }
    });
  });

  const netBalances = {};

  Object.keys(balances).forEach((payer) => {
    Object.keys(balances[payer]).forEach((payee) => {
      const amountOwedByPayer = balances[payer][payee];
      const amountOwedByPayee = balances[payee][payer];
      const netAmount = amountOwedByPayer - amountOwedByPayee;

      if (netAmount > 0) {
        if (!netBalances[payer]) {
          netBalances[payer] = {};
        }
        netBalances[payer][payee] = netAmount;
      } else if (netAmount < 0) {
        if (!netBalances[payee]) {
          netBalances[payee] = {};
        }
        netBalances[payee][payer] = -netAmount;
      }
    });
  });

  return netBalances;
};

const BalanceList = ({ group }) => {
  const balances = calculateBalances(group);

  const filteredBalances = Object.keys(balances).reduce((acc, member) => {
    const owes = Object.entries(balances[member])
      .filter(([_, amount]) => amount > 0)
      .map(([otherMember, amount]) => ({ otherMember, amount }));
    if (owes.length > 0) {
      acc[member] = owes;
    }
    return acc;
  }, {});

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Balance
      </Typography>
      {Object.keys(filteredBalances).length > 0 ? (
        Object.keys(filteredBalances).map((member) => (
          <div key={member}>
            <Typography variant="h4">{member}</Typography>
            <List>
              {filteredBalances[member].map(({ otherMember, amount }) => (
                <ListItem key={otherMember}>
                  <ListItemText primary={`Owes ${otherMember} ₹${amount.toFixed(2)}`} />
                </ListItem>
              ))}
            </List>
          </div>
        ))
      ) : (
        <Typography variant="body1">No balances to show</Typography>
      )}
    </div>
  );
};

export default BalanceList;







