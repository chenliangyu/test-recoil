import { Input, Form, Modal } from 'antd'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import { addTodoVisibleState, requestIdState } from 'modules/todoWithListAtom.atom'

const AddTodo = (): JSX.Element => {
  const [form] = Form.useForm()
  const [isVisible, setVisible] = useRecoilState(addTodoVisibleState)
  const updateRequestId = useSetRecoilState(requestIdState)
  const handleSubmit = async () => {
    const key = uuidv4()
    const values = form.getFieldsValue(true)
    const todo = { ...values, key }
    await fetch(`/addTodo`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    updateRequestId((oldValue) => {
      return oldValue + 1
    })
    setVisible(false)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <Modal title="添加 Todo" visible={isVisible} onOk={handleSubmit} onCancel={handleCancel}>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 16 }} name="basic" form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTodo
