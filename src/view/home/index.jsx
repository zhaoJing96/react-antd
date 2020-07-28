import React from 'react';
import { Row, Col } from 'antd';
import HomeLink from '../home/homeLink.jsx';
import HomeRoute from '../home/homeRoute.jsx'

function App() {
  return (
    <Row className="ui_app_box">
      <Col className='ui_app_link'>
          <HomeLink />
      </Col>
      <Col className='ui_app_route'>
        <HomeRoute />
      </Col>
    </Row>
  );
}
export default App;