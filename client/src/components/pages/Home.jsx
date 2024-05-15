import { useState, useEffect } from 'react'
import axios from 'axios'
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
    <>
      <Container fluid style={{ height: '100%'}}>
        <Row className='justify-content-center'>
          <Col xs={12}>
            <div
              className='hero-image'
              style={{
                // backgroundImage: 'placeholder2.jpg',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '50%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
              }}
            >
              <div className='hero-text' 
              style={{
                display: 'flex', 
                justifyContent: 'center', 
                flexDirection: 'column',
                width: '100%',
                height: '100%'
                }}>
                <h1 className='hero-font oleo-script-bold'
                style={{
                  color: 'rgba(255, 255, 255)',
                  fontWeight: 700,
                  fontSize: '20rem',
                  padding: 'none',
                  display: 'flex',
                  justifyContent: 'center', 
                  margin: 'none',
                  height: '100%',
                  transform: 'translateY(+5%)'
                }}>
                  PupPals
                </h1>
                <p className='text-white' 
                style={{ 
                  fontSize: '2rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginRight: '20%',
                  fontStyle: 'italic',
                  transform: 'translateY(-150%)'
                }}>
                  An app for matching pups
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center' style={{ marginTop: '20px' }}>
          <Col xs={12} md={6} lg={4} className='mb-4'>
            <Card className='h-400' style={{ padding: '20px' }}>
              <Card.Body>
                <Card.Title>About PupPals</Card.Title>
                <Card.Text>
                  PupPals is an app that helps you find the perfect playmate for your furry friend. Connect with other puppy owners, arrange playdates, and let your pups enjoy some fun and socialisation.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className='mb-4'>
            <Card className='h-200' style={{ padding: '20px' }}>
              <Card.Body>
                <Card.Title>Our Pups</Card.Title>
                <Carousel>
                  <Carousel.Item>
                    <img className='image-carousel d-block w-100' src='https://i.ibb.co/8NZPtZd/pup13.jpg' alt='Placeholder 1' />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className='image-carousel d-block w-100' src='https://i.ibb.co/qxyGy72/pup15.jpg' alt='Placeholder 2' />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className='image-carousel d-block w-100' src='https://i.ibb.co/TtRPM7q/pup16.jpg' alt='Placeholder 3' />
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}