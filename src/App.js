import React, { useState, useEffect } from 'react';
import data from './data.json';
import artObjects from './artobjects.json';
import { Navigate, Route, Routes } from 'react-router-dom';
import CarouselContainer from './components/CarouselContainer';
import Navigation from './components/Navigation';
import About from './components/About';
import Search from './components/Search';


import './App.css';
import Gallery from './components/Gallery';

function App() {
  const [searchOptions, setSearchOptions] = useState({
		key: process.env.REACT_APP_API_KEY,
		url: 'https://www.rijksmuseum.nl/api/en/',
		numberOfResults: 15,
	});
  const [galleryImages, setGalleryImages] = useState(artObjects);

  const getGalleryImages = () => {
		const url = `${searchOptions.url}/collection?key=${searchOptions.key}&ps=${searchOptions.numberOfResults}`;
		fetch(url)
			.then((res) => res.json())
			.then((res) => setGalleryImages(res.artObjects))
			.catch(console.error);
	};

	useEffect(() => {
		getGalleryImages();
	}, []);

  return (
		<div className='container'>
			<Navigation />
			<main>
				<Routes>
					<Route path='/home' element={<CarouselContainer data={data} />} />
					<Route path='/about' element={<About />} />
					<Route
						path='/gallery'
						element={
							<Gallery
								images={galleryImages}
								searchOptions={searchOptions}
								getGalleryImages={getGalleryImages}
							/>
						}
					/>
					<Route
						path='/search'
						element={<Search searchOptions={searchOptions} />}
					/>
					<Route path='*' element={<Navigate to='/home' />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
