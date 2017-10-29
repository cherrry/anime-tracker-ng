import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

import WatchAnimeModal from 'dashboard/modals/watch-anime-modal';
import style from 'dashboard/components/anime-card.css';

class AnimeCard extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      episodes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        torrentLink: PropTypes.string.isRequired,
      })),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isWatching: false,
      watchingIdx: null,
    };
  }

  watch(episodeIdx) {
    this.setState({
      isWatching: true,
      watchingIdx: episodeIdx,
    });
  }

  endWatching() {
    this.setState({
      isWatching: false,
    });
  }

  render() {
    const {title, episodes} = this.props;
    const {isWatching, watchingIdx} = this.state;
    return (
      <Card title={title} noHovering className={style.card}>
        {episodes.map((episode, idx) => (
          <Card.Grid
            key={idx}
            onClick={this.watch.bind(this, idx)}
            className={style.grid}
          >
            {episode.title}
          </Card.Grid>
        ))}
        {isWatching ? (
          <WatchAnimeModal
            title={title}
            label={episodes[watchingIdx].label}
            torrentLink={episodes[watchingIdx].torrentLink}
            onCancel={this.endWatching.bind(this)}
          />
        ) : null}
      </Card>
    );
  }
}

export default AnimeCard;
