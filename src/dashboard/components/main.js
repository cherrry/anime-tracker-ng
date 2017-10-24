import React from 'react';
import { Row, Col, Card } from 'antd';

function Main() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>Content...</Card>
      </Col>
      <Col span={8}>
        <Card>Content...</Card>
      </Col>
      <Col span={8}>
      </Col>
    </Row>
  );
}

export default Main;
