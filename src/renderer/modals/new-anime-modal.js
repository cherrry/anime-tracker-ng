import React, {Component} from 'react';
import {Modal, Form, Input, Table} from 'antd';
import PropTypes from 'prop-types';
import ellipsis from 'text-ellipsis';

import addNewAnime from 'common/api/add-new-anime';
import fetchFromSource from 'common/api/fetch-from-source';
import {inputLayout} from '@/modals/form-layout';

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
      filterKeywordsValidator: PropTypes.func.isRequired,
      isLoadingPreview: PropTypes.bool.isRequired,
      rawEpisodes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        torrentLink: PropTypes.string.isRequired,
      })),
    };
  }

  render() {
    const {
      onCancel, onSubmit,
      filterKeywordsValidator,
      isLoadingPreview, rawEpisodes,
    } = this.props;
    const {getFieldDecorator, getFieldValue, getFieldError} = this.props.form;

    const labelRegExp = getFieldError('labelRegexp')
      ? '(.*)' : getFieldValue('labelRegexp');
    const previewColumns = [
      {
        title: 'Episode',
        dataIndex: 'label',
        render: (text) => {
          let match = (new RegExp(labelRegExp)).exec(text);
          return (match && match[1]) || text;
        },
        width: 100,
      },
      {
        title: 'Torrent Link',
        dataIndex: 'torrentLink',
        render: (text) => ellipsis(text, 40),
      },
    ];

    return (
      <Modal
        visible={true}
        title={getFieldValue('title') || 'Add New Anime'}
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
            {getFieldDecorator('filterKeywords', {
              rules: [
                {
                  required: true,
                  message: 'Please enter keyword string for source filetering.',
                },
                {validator: filterKeywordsValidator},
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Label RegExp" {...inputLayout}>
            {getFieldDecorator('labelRegexp', {
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
          loading={isLoadingPreview}
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
      isLoadingPreview: false,
      rawEpisodes: [],
    };
  }

  onSubmit() {
    this.form.validateFields((err, {title, filterKeywords, labelRegexp}) => {
      if (!err) {
        addNewAnime({
          title: title,
          filterKeywords,
          labelRegexp,
        }).then((result) => {
          this.props.onCancel();
        });
      }
    });
  }

  filterKeywordsValidator(rule, value, callback) {
    callback();
    const title = this.form.getFieldValue('title');
    this.setState({
      isLoadingPreview: true,
    });
    fetchFromSource({
      animeId: null,
      title,
      filterKeywords: value,
      labelRegexp: '(.*)',
    }, 5).then((animes) => {
      this.setState({
        isLoadingPreview: false,
        rawEpisodes: animes.episodes,
      });
    });
  }

  render() {
    const {onCancel} = this.props;
    const {rawEpisodes, isLoadingPreview} = this.state;
    return (
      <NewAnimeModel
        wrappedComponentRef={(ref) => this.form = ref.props.form}
        onCancel={onCancel}
        onSubmit={this.onSubmit.bind(this)}
        filterKeywordsValidator={this.filterKeywordsValidator.bind(this)}
        rawEpisodes={rawEpisodes}
        isLoadingPreview={isLoadingPreview}
      />
    );
  }
}

export default WrappedNewAnimeModel;
