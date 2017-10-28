import React from 'react';
import {Layout} from 'antd';

import AnimeList from 'dashboard/components/anime-list';
import style from 'dashboard/main.css';

function Main() {
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

export default Main;
