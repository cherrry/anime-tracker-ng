import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'antd';
import WebTorrent from 'webtorrent';

class WatchAnimeModal extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
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
    /* eslint-disable */
    this.bt = new WebTorrent();
    console.log(WebTorrent.WEBRTC_SUPPORT);
    console.log(this.bt);
    console.log(this.props.torrentLink);
    this.bt.on('error', (err) => {
      console.error(err);
    });
    this.bt.add(this.props.torrentLink, (torrent) => {
      console.log(torrent);
      const file = torrent.files.find((file) => {
        console.log(file);
        return file.name.endsWith('.mp4');
      });
      file.getBlobURL((err, url) => {
        this.setState({
          blobUrl: url,
        });
      });
    });
    /* eslint-enable */
  }

  componentWillUnmount() {
    /* eslint-disable */
    this.bt.destroy(() => {
      console.log('destroyed');
    });
    /* eslint-enable */
  }

  render() {
    const {title, label, onCancel} = this.props;
    const {blobUrl} = this.state;
    return (
      <Modal
        visible={true}
        title={`${title} - ${label}`}
        onCancel={onCancel}
        footer={null}
        maskClosable={false}
      >
        {blobUrl}
      </Modal>
    );
  }
}

export default WatchAnimeModal;
