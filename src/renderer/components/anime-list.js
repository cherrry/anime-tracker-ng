import React, {Component} from 'react';
import {Row, Col} from 'antd';

import animeEpisodeList from 'common/api/anime-episode-list';
import AnimeCard from '@/components/anime-card';
import NewAnimeCard from '@/components/new-anime-card';
import style from '@/components/anime-list.css';

class AnimeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: [],
    };
  }

  componentDidMount() {
    /* eslint-disable */
    animeEpisodeList().then((animes) => {
      console.log('with eposides', animes);
      this.setState(() => ({animes}));
    });
    /* eslint-enable */
  }

  render() {
    const {animes} = this.state;
    return (
      <Row gutter={16} className={style.row}>
        {animes.map((anime) => (
          <Col key={anime.title} span={8}>
            <AnimeCard {...anime} />
          </Col>
        ))}
        <Col span={8}>
          <NewAnimeCard />
        </Col>
      </Row>
    );
  }
}

export default AnimeList;
