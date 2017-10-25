import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import PropTypes from 'prop-types';

import {inputLayout} from 'dashboard/modals/form-layout';

class NewAnimeModal extends Component {
  static get propTypes() {
    return {
      close: PropTypes.func.isRequired,
      form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        validateFields: PropTypes.func.isRequired,
      }).isRequired,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        /* eslint-disable */
        console.log('Add Anime: ', values);
        /* eslint-enable */
      }
    });
  }

  render() {
    const {close} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal
        title="Add New Anime"
        visible={true}
        onCancel={close}
        onOk={this.handleSubmit.bind(this)}
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

export default Form.create()(NewAnimeModal);
