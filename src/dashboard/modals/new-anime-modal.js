import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import PropTypes from 'prop-types';

import {inputLayout} from 'dashboard/modals/form-layout';

class NewAnimeModalBase extends Component {
  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
      }).isRequired,
    };
  }

  render() {
    const {onCancel, onSubmit} = this.props;
    const {getFieldDecorator} = this.props.form;
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
  }

  onSubmit(event) {
    /* eslint-disable */
    console.log(this.form);
    /* eslint-enable */
  }

  render() {
    const {onCancel} = this.props;
    return (
      <NewAnimeModel
        wrappedComponentRef={(ref) => this.form = ref.props.form}
        onCancel={onCancel}
        onSubmit={this.onSubmit.bind(this)}
      />
    );
  }
}

export default WrappedNewAnimeModel;
