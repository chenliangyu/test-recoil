import { Input, Form, Modal } from 'antd'
import React from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import type { Todo } from 'types/todo'
import { addTodoVisibleState, todoListState, todosState } from 'modules/todoWithSingleAtom.atom'

const AddTodo = (): JSX.Element => {
  const [form] = Form.useForm()
  const [isVisible, setVisible] = useRecoilState(addTodoVisibleState)
  const setTodo = useRecoilCallback(({ set }) => async (todo: Todo) => {
    set(todosState(todo.key), todo)
    set(todoListState, (oldKeys) => {
      return [...oldKeys, todo.key]
    })
  })
  const handleSubmit = () => {
    const key = uuidv4()
    const values = form.getFieldsValue(true)
    const todo = { ...values, key }
    setTodo(todo)
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
