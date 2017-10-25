import React from 'react';
import {Card} from 'antd';

import style from 'dashboard/components/anime-card.css';

function AnimeCard() {
  return (
    <Card title="Anime Title" noHovering className={style.card}>
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

export default AnimeCard;
