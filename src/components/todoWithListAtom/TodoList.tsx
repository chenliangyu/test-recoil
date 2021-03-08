import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useRecoilValue, useSetRecoilState, useRecoilCallback } from 'recoil'
import type { Todo } from 'types/todo'
import {
  TodoListState,
  addTodoVisibleState,
  currentTodoState,
  requestIdState,
  EmptyTodo,
} from 'modules/todoWithListAtom.atom'
import styles from './TodoList.module.css'

const useForceUpdate = () => {
  const [, setTick] = useState(0)
  const refreshList = () => {
    setTick((tick) => tick + 1)
  }
  return refreshList
}

const useTodoList = () => {
  const requestId = useRecoilValue(requestIdState)
  const getTodos = useRecoilCallback(
    ({ set }) => async () => {
      const responseData = await (await fetch('/todos')).json()
      const { todos } = responseData
      set(TodoListState, todos)
      set(currentTodoState, (oldTodo) => {
        if (oldTodo === EmptyTodo) {
          return todos[0]
        }
        return oldTodo
      })
    },
    [requestId]
  )
  useEffect(() => {
    getTodos()
  }, [getTodos])
}

const Row = React.memo(({ todo, rowIndex }: { todo: Todo; rowIndex: number }) => {
  const setCurrentTodo = useSetRecoilState(currentTodoState)
  const handleClick = () => {
    setCurrentTodo(todo)
  }
  const isOdd = rowIndex % 2 !== 0
  const className = `${styles.row} ${isOdd ? styles.odd : ''}`
  return (
    <div role="presentation" className={className} onClick={handleClick}>
      <div className={styles.keyCell}>{todo.key}</div>
      <div className={styles.titleCell}>{todo.title}</div>
    </div>
  )
})

const TodoTable = () => {
  useTodoList()
  const todos = useRecoilValue(TodoListState)
  return (
    <>
      {todos.map((todo, index) => {
        return <Row key={todo.key} todo={todo} rowIndex={index} />
      })}
    </>
  )
}

const TodoList = (): JSX.Element => {
  const setAddTodoState = useSetRecoilState(addTodoVisibleState)
  const forceUpdate = useForceUpdate()
  const addTodo = () => {
    setAddTodoState(true)
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.actionBar}>
        <Button className={styles.button} type="primary" onClick={addTodo}>
          添加
        </Button>
        <Button className={styles.button} type="primary" onClick={forceUpdate}>
          刷新
        </Button>
      </div>
      <div className={styles.list}>
        <div className={styles.header}>
          <div className={styles.keyCell} style={{ width: 400, height: 32 }}>
            Key
          </div>
          <div className={styles.titleCell} style={{ width: 200, height: 32 }}>
            Title
          </div>
        </div>
        <div className={styles.body}>
          <TodoTable />
        </div>
      </div>
    </div>
  )
}

export default TodoList
