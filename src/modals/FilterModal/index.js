import React, { useState } from 'react';
import { Modal } from 'antd';
import Actions from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Consts from '../../constants/consts';
import {
    Form,
    Radio,
    Select
} from 'antd';

const { Option } = Select;

export default (props) => {
    const [filter, setFilter] = useState([
        {
            name: ['parameter', 'comparator'],
        }
    ]);
    const dispatch = useDispatch();
    const handleOk = () => {
        dispatch(Actions.filterApplied({
            parameter: filter[0].value,
            comparator: filter[1].value
        }))
        props.toggleModalVisbility(false);
    };

    const handleCancel = () => {
        props.toggleModalVisbility(false);
    };

    return (
        <Modal title={Consts.FILTER_MODAL_TITLE} onOk={handleOk} onCancel={handleCancel} {...props}>
            <Form
                fields={filter}
                onFieldsChange={(_, allFields) => {
                    setFilter(allFields);
                }}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                size="large"
            >
                <Form.Item label={Consts.FILTER_PARAMETER} name="parameter">
                    <Radio.Group>
                        <Radio.Button value={Consts.PRICE}>{Consts.PRICE}</Radio.Button>
                        <Radio.Button value={Consts.QUANTITY}>{Consts.QUANTITY}</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="comparator" label={Consts.FILTER_ORDER}>
                    <Select>
                        <Option value={Consts.LOW_TO_HIGH}>{Consts.LOW_TO_HIGH}</Option>
                        <Option value={Consts.HIGH_TO_LOW}>{Consts.HIGH_TO_LOW}</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
