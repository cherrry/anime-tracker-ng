import React from 'react';
import { Layout, Row, Col } from 'antd';

import AnimeCard from 'dashboard/components/anime-card';
import NewAnimeCard from 'dashboard/components/new-anime-card';

import style from 'dashboard/main.css';

function Main() {
  return (
    <Layout>
      <Layout.Header>
        <span className={style.title}>Anime Tracker</span>
      </Layout.Header>
      <Layout.Content className={style.contentContainer}>
        <Row gutter={16} className={style.content}>
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
          <Col span={8}>
            <NewAnimeCard />
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
