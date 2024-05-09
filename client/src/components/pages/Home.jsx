import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
//Imports for Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

export default function Home() {
  const [pups, setPups] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function getPupData() {
      try {
        const { data } = await axios.get('/api/pups')
        setPups(data)
      } catch (error) {
        setError(error.message)
      }
    }
    getPupData()
  }, [])

  return (
    <div className='text-center' style={{ fontFamily: 'Arial, sans-serif' }}>
      <Container fluid>
      <Row className='justify-content-center'>
        <Col xs={12}>
          <div
            className='hero-image'
            style={{
              backgroundImage: 'placeholder2.jpg',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid grey',
            }}
          >
            <div className='hero-text'>
              <h1
                className='text-white'
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '3rem',
                  backgroundColor: '#FDE49E',
                  padding: '10px',
                }}
              >
                PupPals
              </h1>
              <p className='text-dark' style={{ fontSize: '1 rem' }}>
                An app for matching pups
              </p>
            </div>
          </div>
          </Col>
        </Row>
        <Row className='justify-content-center'style={{ marginTop: '100px' }}>
          <Col xs={12} md={4}>
            <Card className='h-100'>
              <Card.Body>
                <Card.Title>About PupPals</Card.Title>
                <Card.Text>
                  PupPals is an app that helps you find the perfect playmate for your furry friend. Connect with other puppy owners, arrange playdates, and let your pups enjoy some fun and socialisation.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className='h-100'>
              <Card.Body>
                <Card.Title>Blank Component</Card.Title>
                <Card.Text>
                  This is a blank component that will be filled in later.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className='h-100'>
              <Card.Body>
                <Card.Title>Our Pups</Card.Title>
                <Carousel>
                  <Carousel.Item>
                    <img className='d-block w-100' src='placeholder1.jpg' alt='Placeholder 1' />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className='d-block w-100' src='placeholder2.jpg' alt='Placeholder 2' />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className='d-block w-100' src='placeholder3.jpg' alt='Placeholder 3' />
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}