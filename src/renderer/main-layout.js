import React from 'react';
import {Layout} from 'antd';

import AnimeList from '@/components/anime-list';
import style from '@/main-layout.css';

function MainLayout() {
  return (
    <Layout>
      <Layout.Header>
        <span className={style.title}>Anime Tracker</span>
      </Layout.Header>
      <Layout.Content className={style.contentContainer}>
        <AnimeList />
      </Layout.Content>
      <Layout.Footer className={style.footer}>
        Anime Tracker &copy;2017 Created By Cherry Ng
      </Layout.Footer>
    </Layout>
  );
}

export default MainLayout;
