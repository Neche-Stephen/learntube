import React, { useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col, Card }from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Courses() {
    const location = useLocation();
    const selectedCourse = location.state?.selectedCourse || 'No course selected';

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const API_KEY = 'AIzaSyDXtmxIH638wwtXK5Ly7AkOp1NoffKEx2M';

    const showVideoDetails = (videoId) => {
        // Handle showing video details or navigating to video page
        console.log(`Clicked video ID: ${videoId}`);
        // Add your logic to show video details or navigate to a specific video page
    };

    const fetchVideosOnCourse = async(e) => {
        const searchCourse = 'Top tutorials for beginners on ' + selectedCourse;
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchCourse}&key=${API_KEY}`
            );
            const data = await response.json();
            console.log(data.items)
            setSearchResults(data.items);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    // const

    useEffect(()=>{
        fetchVideosOnCourse();
    }, [])

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">Learntube</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className='course_results'>
                <Row className='mt-3'>
                    <Col>
                        <h1>Start Learning</h1>
                        <p> Learn {selectedCourse} now!</p>
                    </Col>
                </Row>
                <Row className=''>
                    {searchResults.map((item) => (
                    <Col sm = '6' lg ="3" key={item.id.videoId} className='mb-2'>
                        <a className='course_card' href={`https://www.youtube.com/watch?v=${item.id.videoId}`} target='_blank' rel="noreferrer" onClick={() => showVideoDetails(item.id.videoId)}>
                        <Card>
                            <Card.Img variant="top" src={item.snippet.thumbnails.default.url} alt={item.snippet.title}  />
                            <Card.Body>
                                <Card.Title>{item.snippet.title}</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </a>
                    </Col>
                     ))}
                </Row>
            </Container>
        </>
    );
}

export default Courses;
