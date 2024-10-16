import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';

import {COLORS } from '../helpers/consts';
import logo from '../assets/sierra.jpg';

const SideBar = () => {
  return (
    <Col className='d-none d-sm-block col-2 h-100 ' style={{backgroundColor: COLORS.primary}}>
       <Row className='mt-4'>
          <Col className='text-center px-0'>
              <img src={logo} alt='' style={{'width': '50%'}} />
          </Col>
      </Row>
      <Row>
        <Col className='text-white text-center py-5'><h2>{'Sierra Outfitters'}</h2></Col>
      </Row>
      
      {/* Inactive buttons */}
      <SideBarButton name='Chat' link='/' /> 
      <SideBarButton name='Locations' link='/' />
      <SideBarButton name='Contact Us' link='/' />
    </Col>
  );
}

const SideBarButton = (props) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };

  const handleMouseLeave = () => {
     setIsHover(false);
  };

  return (
    <Row 
      className='ms-4 my-3 fs-3'
      style={{color: isHover ? 'grey' : 'white'}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role='button'
    >
        <h4>{props.name}</h4>
    </Row>
  );
}

SideBarButton.propTypes = {
  name: PropTypes.string.isRequired,
}

export default SideBar;