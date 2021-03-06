import React, { FunctionComponent } from 'react';
import { Button, Form, Input, message } from 'antd';
import { login } from '../../services/login.service';
import { ILoginProps } from '../../interfaces/ILogin';

import { useAppDispatch } from '../../hooks/useApp';
import { setuser } from '../../redux/user/userSlice';
import { fetchOperationsData } from '../../redux/operations/operationsSlice';

import './Login.css';

const Login: FunctionComponent<ILoginProps> = ({ setToken }: ILoginProps) => {
  const dispatch = useAppDispatch();
  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const response = await login(values.username, values.password);
      setToken(response.data.token); // set token for user auth
      dispatch(setuser({userData: {id: response.data.id, groupId: response.data.groupId}, token: response.data.token})); //store user data
      dispatch(fetchOperationsData()); // initial operations data request
    } catch (error) {
      message.error(`Authentication failed: ${error.response.data.message}`);
    }
  };

  return (
    <div className="login-wrapper">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Username' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
