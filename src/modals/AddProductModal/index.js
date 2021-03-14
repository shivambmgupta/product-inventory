import React, { useState } from 'react';
import { Modal } from 'antd';
import Actions from '../../redux/actions';
import {
    Form,
    Input,
    InputNumber
} from 'antd';
import { useDispatch } from 'react-redux';
import Consts from '../../constants/consts'

const { TextArea } = Input;

export default (props) => {
    const [form] = Form.useForm();
    const [image, uploadImage] = useState(null);
    const [productDetails, setProductDetails] = useState([]);
    const dispatch = useDispatch();
    function showMyImage(fileInput) {
        var files = fileInput.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function () {
                return function (e) {
                    uploadImage(e.target.result)
                };
            })();
            reader.readAsDataURL(file);
        }
    }
    const handleOk = () => {
        if (productDetails.length === 0) return;
        const res = productDetails.every(detail => detail.errors?.length == 0)
        if (res) {
            dispatch(Actions.addProduct({
                name: productDetails[0].value,
                description: productDetails[1]?.value,
                price: productDetails[2].value,
                quantity: productDetails[3].value,
                image: image
            }))
            form.resetFields();
            uploadImage(null);
            props.toggleModalVisbility(false);
        }
    };

    const handleCancel = () => {
        props.toggleModalVisbility(false);
    };

    return (
        <Modal title={Consts.ADD_PRODUCT_MODAL_TITLE} onOk={handleOk} onCancel={handleCancel} {...props}>
            <Form
                preserve={false}
                onFieldsChange={(_, allFields) => {
                    setProductDetails(allFields);
                }}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                size="large"
                validateTrigger={['onChange', 'onBlur', 'onKeyDown']}
            >
                <Form.Item label={Consts.NAME} required name="name"
                    rules={[
                        {
                            message: Consts.VALID_NAME,
                            required: true
                        }
                    ]}
                >
                    <Input placeholder={Consts.NAME_PLACEHOLDER} />
                </Form.Item>
                <Form.Item label={Consts.DESCRIPTION} name="description" >
                    <TextArea placeholder={Consts.DESCRIPTION_PLACEHOLDER} rows={3} style={{ resize: "none" }} />
                </Form.Item>
                <Form.Item label={Consts.PRICE} required name="price"
                    rules={[
                        {
                            type: 'number',
                            message: Consts.VALID_PRICE,
                            required: true
                        }
                    ]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label={Consts.QUANTITY} required name="quantity"
                    rules={[
                        {
                            type: 'number',
                            message: Consts.VALID_QUANTITY,
                            required: true
                        },
                    ]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item >
                    <input type="file" accept="image/*" onChange={val => showMyImage(val.target)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
