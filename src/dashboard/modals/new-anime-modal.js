import React, {Component} from 'react';
import {Modal, Form, Input, Table} from 'antd';
import PropTypes from 'prop-types';
import ellipsis from 'text-ellipsis';

import fetchFromSource from 'api/fetch-from-source';
import {inputLayout} from 'dashboard/modals/form-layout';

class NewAnimeModalBase extends Component {
  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        getFieldValue: PropTypes.func.isRequired,
        getFieldError: PropTypes.func.isRequired,
      }).isRequired,
      loaderKeywordValidator: PropTypes.func.isRequired,
      rawEpisodes: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        torrentLink: PropTypes.string.isRequired,
      })),
    };
  }

  render() {
    const {onCancel, onSubmit, loaderKeywordValidator, rawEpisodes} = this.props;
    const {getFieldDecorator, getFieldValue, getFieldError} = this.props.form;

    const labelRegExp = getFieldError('labelRegExp') ? '()' : getFieldValue('labelRegExp');
    const previewColumns = [
      {
        title: 'Label',
        dataIndex: 'title',
        render: (text) => {
          let match = (new RegExp(labelRegExp)).exec(text);
          return (match && match[1]) || 'N/A';
        },
        width: '12%',
      },
      {
        title: 'Torrent Link',
        dataIndex: 'torrentLink',
        width: '88%',
        render: (text) => ellipsis(text, 50),
      },
    ];

    return (
      <Modal
        visible={true}
        title="Add New Anime"
        okText="Add"
        onCancel={onCancel}
        onOk={onSubmit}
      >
        <Form hideRequiredMark>
          <Form.Item label="Anime Title" {...inputLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please enter new anime\'s title.',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Filter Keywords" {...inputLayout}>
            {getFieldDecorator('loaderKeyword', {
              rules: [
                {
                  required: true,
                  message: 'Please enter keyword string for source filetering.',
                },
                {validator: loaderKeywordValidator},
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Label RegExp" {...inputLayout}>
            {getFieldDecorator('labelRegExp', {
              rules: [
                {
                  type: 'regexp',
                  message: 'Label extractor must be a valid regexp.',
                },
                {
                  required: true,
                  message: 'Please define RegExp extractor from episode source\'s title.',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
        <Table
          size='small'
          pagination={false}
          rowKey='releasedAt'
          dataSource={rawEpisodes}
          columns={previewColumns}
        />
      </Modal>
    );
  }
}

const NewAnimeModel = Form.create()(NewAnimeModalBase);

class WrappedNewAnimeModel extends Component {
  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      rawEpisodes: [],
    };
  }

  onSubmit() {}

  loaderKeywordValidator(rule, value, callback) {
    callback();
    const title = this.form.getFieldValue('title');
    fetchFromSource({
      animeId: null,
      title,
      loader: {
        loaderKeyword: value,
        labelRegExp: '(.*)',
      },
    }, 3).then((animes) => {
      this.setState({rawEpisodes: animes.episodes});
    });
  }

  render() {
    const {onCancel} = this.props;
    const {rawEpisodes} = this.state;
    return (
      <NewAnimeModel
        wrappedComponentRef={(ref) => this.form = ref.props.form}
        onCancel={onCancel}
        onSubmit={this.onSubmit.bind(this)}
        loaderKeywordValidator={this.loaderKeywordValidator.bind(this)}
        rawEpisodes={rawEpisodes}
      />
    );
  }
}

export default WrappedNewAnimeModel;
