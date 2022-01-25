import React, { useState } from 'react';
import Detail from './Detail';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';


const Gallery = ({ images, searchOptions }) => {
	if (!images) {
		<Container
			className='d-flex  justify-content-center align-items-center align-content-center'
			style={{ minHeight: '90vh' }}>
			<span style={{ paddingRight: '1em' }}>Loading results{'  '}</span>
			<Spinner animation='border' variant='dark' size='sm' />
		</Container>;
	}
	const [error, setError] = useState(false);
	const [show, setShow] = useState(false);
	const [activeItem, setActiveItem] = useState(null);

	const handleShow = () => {
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
		setError(false);
		setActiveItem(null);
	};

	const handleError = () => {
		setError(true);
	};

	const getDetail = (itemId) => {
		fetch(`${searchOptions.url}/collection/${itemId}?key=${searchOptions.key}`)
			.then((res) => res.json())
			.then((res) => {
				setActiveItem(res);
			})
			.then((res) => handleShow())
			.catch((err) => {
				handleError();
				handleShow();
			});
	};

	return (
		<CardGroup fluid='true' style={{width: 'fit-cover'}}>
            <Row md='5' sm='2' >
			{images.map((object) => {
                return (
                    <Card key={object.id} style={{margin: '.4em', padding: '0'}}>
						{object.webImage && (
                            <Card.Img
                                variant='top'
                                style={{maxWidth: '100%'}}
                                src={object.webImage ? object.webImage.url : ''}
                                alt={object.title}
							/>
                            )}
						<Card.Body>
							{object.webImage ? (
                                ''
                                ) : (
                                    <Card.Title>No Image Available</Card.Title>
                                    )}
							<Card.Text className='text-muted'>{object.longTitle}</Card.Text>
							<Button
								onClick={() => getDetail(object.objectNumber)}
								variant='outline-dark'>
								Details
							</Button>
						</Card.Body>
					</Card>
				);
			})}
            {(activeItem || error) && (
                <Detail
                    objectDetail={activeItem}
                    show={show}
                    handleClose={handleClose}
                    error={error}
                />
            )}
            </Row>
		</CardGroup>
	);
};

export default Gallery;