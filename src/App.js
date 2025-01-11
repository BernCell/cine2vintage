import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites'
import Vintage from './pages/Vintage';

const App = () => {
  return (

<BrowserRouter>
  <Routes>

      <Route path='/' element={<Home />} >
      </Route>
      <Route path='/vintage' element={<Vintage />} >
      </Route>
      <Route path='/favorites' element={<Favorites />} >
      </Route>
      <Route path='*' element={<Home />} >
  </Route>

  </Routes>

</BrowserRouter>
    
    
  );
};

export default App;