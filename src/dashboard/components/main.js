import React from 'react';
import { Layout, Row, Col, Menu, Card } from 'antd';
import style from 'dashboard/components/main.css';

function Main() {
  return (
    <Layout>
      <Layout.Header>
        <span className={style.title}>Anime Tracker</span>
      </Layout.Header>
      <Layout.Content className={style.content}>
        <Row gutter={16}>
          <Col span={8}>
            <Card>Content...</Card>
            <Card>Content...</Card>
          </Col>
          <Col span={8}>
            <Card>Content...</Card>
          </Col>
          <Col span={8}>
            <Card>Content...</Card>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer className={style.footer}>
        Anime Tracker &copy;2017 Created By Cherry Ng
      </Layout.Footer>
    </Layout>
  );
}

export default Main;
