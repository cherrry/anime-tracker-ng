import React from 'react';
import { Layout, Row, Col, Menu, Card, Modal } from 'antd';
import AnimeCard from 'dashboard/components/anime-card';
import NewAnimeModal from 'dashboard/modals/new-anime-modal';
import style from 'dashboard/main.css';

function Main() {
  return (
    <Layout>
      <Layout.Header>
        <span className={style.title}>Anime Tracker</span>
      </Layout.Header>
      <Layout.Content className={style.content}>
        <Row gutter={16}>
          <Col span={8}>
            <AnimeCard />
          </Col>
          <Col span={8}>
            <AnimeCard />
          </Col>
          <Col span={8}>
            <AnimeCard />
          </Col>
          <Col span={8}>
            <AnimeCard />
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer className={style.footer}>
        Anime Tracker &copy;2017 Created By Cherry Ng
      </Layout.Footer>
      <NewAnimeModal />
    </Layout>
  );
}

export default Main;
