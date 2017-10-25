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
      isModalVisible: false,
    };
  }

  openModal() {
    this.setState(() => ({
      isModalVisible: true,
    }));
  }

  closeModal() {
    this.setState(() => ({
      isModalVisible: false,
    }));
  }

  render() {
    let modal = null;
    if (this.state.isModalVisible) {
      modal = (<NewAnimeModal close={this.closeModal.bind(this)} />);
    }

    return (
      <Card
        className={cx(style.card, style.add)}
        bodyStyle={bodyStyle}
        onClick={this.openModal.bind(this)}
      >
        <Icon type="plus" /> Anime
        {modal}
      </Card>
    );
  }
}

export default NewAnimeCard;
