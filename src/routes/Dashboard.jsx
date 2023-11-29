import React, { useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col, Card} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Accordion from 'react-bootstrap/Accordion';
import { searchVideo, getVideoById, getVideoByUrl, getVideoByTitle } from 'utubeapi-wrap';
import './all.css'

function Dashboard() {

    const location = useLocation();
    const selectedCourse = location.state?.selectedCourse || 'No course selected';

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const apiKey = 'AIzaSyDXtmxIH638wwtXK5Ly7AkOp1NoffKEx2M';

    const [inputUrl, setInputUrl] = useState('');
    const [inputId, setInputId] = useState('');
    const [inputTitle, setInputTitle] = useState('');
    const [videoInfo, setVideoInfo] = useState(null);
    const [error, setError] = useState('');
    
      const handleUrlSubmit = async (event) => {
        event.preventDefault();
        try {
          const videoData = await getVideoByUrl(inputUrl, apiKey);
          setVideoInfo(videoData);
          console.log(videoData)
          setError('');
        } catch (error) {
            console.log(error.message)
          setError(`Error fetching video by URL: ${error.message}`);
          setVideoInfo(null);
        }
      };
    
      const handleIdSubmit = async (event) => {
        event.preventDefault();
        console.log('going');
        try {
          const videoData = await getVideoById(inputId, apiKey);
          setVideoInfo(videoData);
            console.log('success')
            console.log(videoData)
          setError('');
        } catch (error) {
          setError(`Error fetching video by ID: ${error.message}`);
          setVideoInfo(null);
        }
      };
    
      const handleTitleSubmit = async (event) => {
        event.preventDefault();
        try {
          const videoData = await getVideoByTitle(inputTitle, apiKey);
          setVideoInfo(videoData);
          setError('');
        } catch (error) {
          setError(`Error fetching video by title: ${error.message}`);

          setVideoInfo(null);
        }
      };
    

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log('worky')

        try {
            const data = await searchVideo(searchQuery, apiKey); // Pass user's API key
            console.log('worked');
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const showVideoDetails = (videoId) => {
        // Handle showing video details or navigating to video page
        console.log(`Clicked video ID: ${videoId}`);
        // Add your logic to show video details or navigate to a specific video page
    };

    const closeSearchResults = () => {
        setSearchResults([]);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Learntube</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="#action1">Home</Nav.Link>
                </Nav>
                <Form  onSubmit={handleSearch} className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>

                {/* Display search results */}
            {
            searchResults.length > 0 &&  
            <Container className='search_results'>
                    <Row className='justify-content-center p-3'>
                        <Col>
                            <Row className='mb-2'><Col><Button onClick={closeSearchResults}>Close search</Button></Col></Row>
                            <Row className='align-items-stretch justify-content-center'>
                            {searchResults.map((item) => (
                            <Col xs ="3" key={item.id.videoId}>
                                <a className='utube_card' href={`https://www.youtube.com/watch?v=${item.id.videoId}`} onClick={() => showVideoDetails(item.id.videoId)} target='_blank' rel="noreferrer">
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
                        </Col>
                    </Row>
        </Container>
            }

            <Container>
                <Row className='mt-3'>
                    <Col>
                        <h1>Dashboard</h1>
                        <p>Selected Course: {selectedCourse}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Learn {selectedCourse}</Accordion.Header>
                            <Accordion.Body>
                                <Link to = '/courses' state={{selectedCourse:selectedCourse}}><Button>Start Learning</Button></Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>{selectedCourse} Projects</Accordion.Header>
                            <Accordion.Body>
                                <Link to = '/projects' state={{selectedCourse:selectedCourse}}><Button>Start Working on Projects</Button></Link>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </Col>
                </Row>
                <Row  className='mt-5'>
                    <Col>
                        Enjoy our special feature that allows you to search for learning videos based on the video title, url or id
                    </Col>
                </Row>
                <Row  className='mt-3'>
                    <Col>
                        <Form onSubmit={handleUrlSubmit}>
                                <Form.Group controlId="urlInput">
                                <Form.Label>Enter Video URL:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                                />
                                <Button className='mt-3' variant="primary" type="submit">Get Video by URL</Button>
                                </Form.Group>
                        </Form>
                    </Col>

                    <Col>
                    <Form onSubmit={handleIdSubmit}>
                    <Form.Group controlId="idInput">
                    <Form.Label>Enter Video ID:</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        placeholder="VIDEO_ID"
                    />
                    <Button className='mt-3' variant="primary" type="submit">Get Video by ID</Button>
                    </Form.Group>
                </Form>
                    </Col>

                    <Col>
                    <Form onSubmit={handleTitleSubmit}>
                    <Form.Group controlId="titleInput">
                    <Form.Label>Enter Video Title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        placeholder="Video Title"
                    />
                    <Button className='mt-3' variant="primary" type="submit">Get Video by Title</Button>
                    </Form.Group>
                </Form>
                    </Col>

                </Row>

                <Row>
                {error && <p>Error: {error}</p>}

                {videoInfo && (
                <div>
                    <h2>Video Info</h2>
                    <p>Title: {videoInfo.snippet.title}</p>
                    {/* Display other information as needed */}
                </div>
                )}
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
