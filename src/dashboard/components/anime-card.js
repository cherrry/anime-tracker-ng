import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

import style from 'dashboard/components/anime-card.css';

function AnimeCard({title, episodes}) {
  return (
    <Card title={title} noHovering className={style.card}>
      {episodes.map((episode, idx) => (
        <Card.Grid key={idx} className={style.grid}>
          {episode.label}
        </Card.Grid>
      ))}
    </Card>
  );
}

AnimeCard.propTypes = {
  title: PropTypes.string.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    torrentLink: PropTypes.string.isRequired,
  })),
};

export default AnimeCard;
