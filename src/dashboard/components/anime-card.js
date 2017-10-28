import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

import style from 'dashboard/components/anime-card.css';

function AnimeCard({title}) {
  return (
    <Card title={title} noHovering className={style.card}>
      <Card.Grid className={style.grid}>07</Card.Grid>
      <Card.Grid className={style.grid}>06</Card.Grid>
      <Card.Grid className={style.grid}>05</Card.Grid>
      <Card.Grid className={style.grid}>04</Card.Grid>
      <Card.Grid className={style.grid}>03</Card.Grid>
      <Card.Grid className={style.grid}>02</Card.Grid>
      <Card.Grid className={style.grid}>01</Card.Grid>
    </Card>
  );
}

AnimeCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AnimeCard;
