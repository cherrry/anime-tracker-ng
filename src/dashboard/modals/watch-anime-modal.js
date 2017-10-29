import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'antd';
import WebTorrent from 'webtorrent';

class WatchAnimeModal extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      episodeTitle: PropTypes.string.isRequired,
      torrentLink: PropTypes.string.isRequired,
      onCancel: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      blobUrl: '',
    };
  }

  componentDidMount() {
    this.bt = new WebTorrent();
    this.bt.add(this.props.torrentLink, (torrent) => {
      const file = torrent.files.find((file) => {
        return file.name.endsWith('.mp4');
      });
      file.appendTo(this.video);
    });
  }

  componentWillUnmount() {
    this.bt.destroy();
  }

  render() {
    const {title, episodeTitle, onCancel} = this.props;
    return (
      <Modal
        visible={true}
        title={`${title} - ${episodeTitle}`}
        onCancel={onCancel}
        footer={null}
        maskClosable={false}
        width={1320}
        height={805}
      >
        <div ref={(video) => this.video = video} />
      </Modal>
    );
  }
}

export default WatchAnimeModal;
