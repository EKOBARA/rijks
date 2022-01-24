import React, { useState } from 'react';
import data from './data.json';
import CarouselContainer from './components/CarouselContainer';
import Navigation from './components/Navigation';
import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

function App() {
  const [searchOptions, setSearchOptions] = useState({
		key: process.env.REACT_APP_RIJKS_KEY,
		url: 'https://www.rijksmuseum.nl/api/en/',
		numberOfResults: 15,
	});
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route 
            exact
            path='/home' 
            element={<CarouselContainer data={data}/>} 
          />
          <Route path='*' element={<Navigate to='/home' />} /> 
        </Routes>
      </main>
    </>
  );
}

export default App;
