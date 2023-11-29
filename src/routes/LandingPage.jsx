import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const [course, setCourse] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard', { state: { selectedCourse: course } });
    }

    const handleChange = (e) => {
        setCourse(e.target.value);
    }

    return (
        <>
            <Navbar />
            <Container>
                <Row className='mt-4 mb-4'>
                    <Col>
                        Use Learntube to learn any course, Use the form below to choose
                    </Col>
                </Row>

                <Row>
                    <Col xs='auto'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Select aria-label="Default select example" value={course} onChange={handleChange}>
                                <option value="">Select course to learn</option>
                                <option value="Reactjs">Reactjs</option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                            </Form.Select>
                            <Button className='mt-3' type='submit'>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
