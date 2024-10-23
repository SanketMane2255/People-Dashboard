
import Navbar from './components/Navbar'
import './App.css'
import Sidebar from './components/Sidebar'
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import Overview from './components/Overview'
import PeopleDirectory from './components/PeopleDirectory'

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Container fluid>

          <Row>
            <Col xs={12} md={2} className='mb-3'>
              <Sidebar />
            </Col>

            <Col xs={12} md={10} className='mb-3'>
              <Routes>
                <Route path='/' element={<Overview />} />
                <Route path='/directory' element={<PeopleDirectory />} />
              </Routes>
            </Col>
          </Row>


        </Container>
      </Router>
    </>
  )
}

export default App
