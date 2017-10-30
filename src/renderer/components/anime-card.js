import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

import WatchAnimeModal from 'renderer/modals/watch-anime-modal';
import style from 'renderer/components/anime-card.css';

class AnimeCard extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      labelRegexp: PropTypes.string.isRequired,
      episodes: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
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
    const {title, labelRegexp, episodes} = this.props;
    const {isWatching, watchingIdx} = this.state;

    const regexp = new RegExp(labelRegexp);
    const episodeTitle = (title) => {
      const match = regexp.exec(title);
      return (match && match[1]) || title;
    };
    return (
      <Card title={title} noHovering className={style.card}>
        {episodes.map((episode, idx) => (
          <Card.Grid
            key={idx}
            onClick={this.watch.bind(this, idx)}
            className={style.grid}
          >
            {episodeTitle(episode.title)}
          </Card.Grid>
        ))}
        {isWatching ? (
          <WatchAnimeModal
            title={title}
            episodeTitle={episodeTitle(episodes[watchingIdx].title)}
            torrentLink={episodes[watchingIdx].torrentLink}
            onCancel={this.endWatching.bind(this)}
          />
        ) : null}
      </Card>
    );
  }
}

export default AnimeCard;
