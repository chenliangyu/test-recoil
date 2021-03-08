import React from 'react'
import { Button, Form, Input } from 'antd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { currentTodoState, requestIdState } from 'modules/todoWithListAtom.atom'
import styles from './TodoInfo.module.css'

const TodoInfo = (): JSX.Element => {
  const [todo, setTodo] = useRecoilState(currentTodoState)
  const updateRequestId = useSetRecoilState(requestIdState)
  const [form] = Form.useForm()
  const handleUpdate = async (values: Record<string, string>) => {
    const newTodo = { ...todo, ...values }
    setTodo(newTodo)
    await fetch(`/updateTodo/${todo.key}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
    updateRequestId((oldValue) => {
      return oldValue + 1
    })
  }
  form.setFieldsValue({ title: todo.title })
  return (
    <>
      <div className={styles.title}>todo 详情</div>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        name="basic"
        onFinish={handleUpdate}
      >
        <Form.Item label="key">{todo.key}</Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 19 }}>
          <div className={styles.buttonWrapper}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  )
}

export default TodoInfo
