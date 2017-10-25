import React, {Component} from 'react';
import {Card, Icon} from 'antd';
import cx from 'classnames';

import NewAnimeModal from 'dashboard/modals/new-anime-modal';

import style from 'dashboard/components/anime-card.css';

const bodyStyle = {
  fontSize: '24px',
};

class NewAnimeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
    };
  }

  openModal() {
    this.setState(() => ({
      modal: (<NewAnimeModal close={this.closeModal.bind(this)} />),
    }));
  }

  closeModal() {
    this.setState(() => ({
      modal: null,
    }));
  }

  render() {
    return (
      <Card
        className={cx(style.card, style.add)}
        bodyStyle={bodyStyle}
        onClick={this.openModal.bind(this)}
      >
        <Icon type="plus" /> Anime
        {this.state.modal}
      </Card>
    );
  }
}

export default NewAnimeCard;
