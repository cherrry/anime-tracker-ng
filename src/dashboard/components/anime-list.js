import React, {Component} from 'react';
import {Row, Col} from 'antd';

import animeEpisodeList from 'api/anime-episode-list';
import AnimeCard from 'dashboard/components/anime-card';
import NewAnimeCard from 'dashboard/components/new-anime-card';
import style from 'dashboard/components/anime-list.css';

class AnimeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animes: [],
    };
  }

  componentDidMount() {
    animeEpisodeList().then((animes) => {
      this.setState(() => ({animes}));
    });
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
