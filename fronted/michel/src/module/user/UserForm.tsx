import React from "react";
import { Form, Input, Button } from 'antd';

function UserForm() {
  const [formUser] = Form.useForm();

  const handleSubmit = () => {
    const values = formUser.getFieldsValue();
    console.log("Valores del formulario:", values);
  };

  return (
    <div>
      <Form
        form={formUser}
        name="layout-multiple-horizontal"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          label="Username"
          name="username"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Form.Item>
        <Form.Item>

        </Form.Item>
      </Form>
    </div>
  );
}

export default UserForm;
