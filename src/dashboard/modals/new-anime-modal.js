import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

import { inputLayout } from 'dashboard/modals/form-layout';

class NewAnimeForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form title="New Anime Form">
        <Form.Item label="Title" {...inputLayout}>
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: "Please enter new anime's title.",
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Keyword" {...inputLayout}>
          {getFieldDecorator('keyword', {
            rules: [
              {
                required: true,
                message: 'Please enter keyword string for source filetering.',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Label Extractor" {...inputLayout}>
          {getFieldDecorator('labelExtractor', {
            rules: [
              {
                type: 'regexp',
                message: 'Label extractor must be a valid regexp.',
              },
              {
                required: true,
                message: "Please define extractor from episode source's title.",
              },
            ],
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}

NewAnimeForm = Form.create()(NewAnimeForm);

function NewAnimeModal() {
  return (
    <Modal title="Add New Anime" visible={true}>
      <NewAnimeForm />
    </Modal>
  );
}

export default NewAnimeModal;
