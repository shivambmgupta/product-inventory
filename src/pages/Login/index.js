import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './style.module.css';
import globalStyles from '../../util/globalStyle.module.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import Actions from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Consts, { PASSWORD } from '../../constants/consts';

const SweetAlert = withReactContent(Swal)

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 2,
  },
};

export default (props) => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const { password } = values;
    if (password === PASSWORD) {
      dispatch(Actions.userLogin(values));
      props.history.push('/home')
    }
    else
      SweetAlert.fire({
        icon: 'error',
        title: Consts.INVALID_CREDENTIONLS_TITLE,
        text: Consts.INVALID_CREDENTIONLS_TEXT
      })
  };

  const onFinishFailed = (errorInfo) => {
  };

  return (
    <div className={globalStyles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <Form
          className={styles.form}
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                type: 'email',
                message: Consts.ERROR_EMAIL,
              },
            ]}
          >
            <Input className={styles.inputText} placeholder={Consts.EMAIL_PLACEHOLDER} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: Consts.ERROR_PASSWORD,
              },
            ]}
          >
            <Input.Password className={styles.inputText} placeholder={Consts.PASSWORD_PLACEHOLDER} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {Consts.LOGIN}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}