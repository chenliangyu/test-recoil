import React from 'react'
import { Button, Form, Input } from 'antd'
import { useRecoilValue, useRecoilState } from 'recoil'
import { currentTodoState, todosState } from 'modules/todoWithSingleAtom.atom'
import styles from './TodoInfo.module.css'

const TodoInfo = (): JSX.Element => {
  const currentTodoKey = useRecoilValue(currentTodoState)
  const [todo, setTodo] = useRecoilState(todosState(currentTodoKey))
  const [form] = Form.useForm()
  const handleUpdate = async (values: Record<string, unknown>) => {
    const newTodo = { ...todo, ...values }
    setTodo(newTodo)
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
        <Form.Item label="key">{currentTodoKey}</Form.Item>
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
