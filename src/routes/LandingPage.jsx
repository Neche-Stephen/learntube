import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/dashboard', { state: { message: 'Hello from HomePage!' } });
        // console.log('yea');
    }

  return (
    <>
        <Navbar />
        <Container>
            <Row>
                <Col>
                    Use Learntube to learn any course, Use the form below to choose
                </Col>
            </Row>

            <Row>
                <Col xs = 'auto'>
                    <Form onSubmit={handleSubmit}>
                    <Form.Select aria-label="Default select example">
                        <option>Select course to learn</option>
                        <option value="React">React</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                    </Form.Select>
                    <Button type = 'submit'>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
      

    </>
  )
}
