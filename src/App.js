import React from 'react';
import GlobalStyle from './styles/GlobalStyles';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

function App() {
  return ( 
    <BrowserRouter>
      <Header />
      <Routes />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
