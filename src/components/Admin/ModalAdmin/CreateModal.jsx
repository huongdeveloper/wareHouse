import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { getCreateNew } from '../../../Services/ApiServices';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateModal = ({ show, handleClose, onSuccess, accessToken }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        if (!accessToken) {
            toast.error('Access token is required!');
            return;
        }
        setLoading(true);
        try {
            const response = await getCreateNew(accessToken, values);
            toast.success('Data created successfully!');
            form.resetFields();
            handleClose();
            onSuccess();
        } catch (error) {
            toast.error('Failed to create data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Add new"
            open={show}
            onOk={() => form.submit()}
            onCancel={() => handleClose()}
            confirmLoading={loading}
            maskClosable={false}
            okText="Create new"
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 5 }}
                    label="Tags"
                    name="tags"
                    rules={[{ required: true, message: 'Please input at least one tag!' }]}
                >
                    <Input.TextArea placeholder="Separate tags with commas, e.g., Html, CSS"
                        rows={8}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateModal