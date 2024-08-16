import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Paper, CssBaseline, ThemeProvider } from '@mui/material';
import Home from './pages/Home.jsx';
import Group from './pages/Group.jsx';
import theme from './theme';
import { generateUniqueId } from './utils/generateId';
import './App.css';

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      const userId = generateUniqueId();
      localStorage.setItem('userId', userId);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" className="app-container">
        <Paper elevation={3} className="app-paper">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/group/:id" element={<Group />} />
            </Routes>
          </Router>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;






