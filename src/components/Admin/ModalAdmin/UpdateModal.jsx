import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { getUpdate } from '../../../Services/ApiServices';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UpdateModal = ({ accessToken, visible, onClose, dataUpdate, onUpdate }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (dataUpdate) {
            const tagsString = Array.isArray(dataUpdate.tags)
                ? dataUpdate.tags.join(', ')
                : dataUpdate.tags || '';
            form.setFieldsValue({
                title: dataUpdate.title,
                description: dataUpdate.description,
                tags: tagsString,
            });
        }
    }, [dataUpdate, form]);

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            const tagsArray = values.tags.split(',').map(tag => tag.trim());

            await getUpdate(accessToken, dataUpdate.id, {
                title: values.title,
                description: values.description,
                tags: tagsArray
            });

            toast.success('Post updated successfully');
            onClose();
            onUpdate();
        } catch (error) {
            toast.error('Failed to update post');
        }
    };

    return (
        <Modal
            visible={visible}
            title="Update Post"
            onOk={handleUpdate}
            onCancel={() => onClose()}
            maskClosable={false}
            okText="Update data"
            cancelText="Cancel"
        >
            <Form
                name="updatePost"
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
                    <Input.TextArea placeholder="Separate tags with commas, e.g., Html, CSS" rows={8} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateModal