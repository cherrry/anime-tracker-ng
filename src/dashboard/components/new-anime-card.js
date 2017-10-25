import React from 'react';
import { Card, Icon } from 'antd';
import cx from 'classnames';

import style from 'dashboard/components/anime-card.css';

const bodyStyle = {
  fontSize: '32px',
};

function NewAnimeCard() {
  return (
    <Card className={cx(style.card, style.add)} bodyStyle={bodyStyle}>
      <Icon type="plus" /> New Anime
    </Card>
  );
}

export default NewAnimeCard;
