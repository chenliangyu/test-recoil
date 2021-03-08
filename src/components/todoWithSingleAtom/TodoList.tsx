import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil'
import type { Todo } from 'types/todo'
import { isEqual } from 'lodash-es'
import {
  todosState,
  todoListState,
  currentTodoState,
  addTodoVisibleState,
  requestIdState,
} from 'modules/todoWithSingleAtom.atom'
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
    ({ snapshot, set }) => async () => {
      const responseData = await (await fetch('/todos')).json()
      const { todos } = responseData
      const keys: string[] = []
      todos.forEach((todo: Todo) => {
        set(todosState(todo.key), (oldValue) => {
          if (isEqual(oldValue, todo)) {
            return oldValue
          }
          return todo
        })
        keys.push(todo.key)
      })
      set(todoListState, keys)
      const currentTodoKey = await snapshot.getPromise(currentTodoState)
      if (!currentTodoKey) {
        set(currentTodoState, todos[0].key)
      }
    },
    [requestId]
  )
  useEffect(() => {
    getTodos()
  }, [getTodos])
}

const Row = React.memo(({ todoKey, rowIndex }: { todoKey: string; rowIndex: number }) => {
  const setCurrentTodo = useSetRecoilState(currentTodoState)
  const todo = useRecoilValue(todosState(todoKey))
  const handleClick = () => {
    setCurrentTodo(todo.key)
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

const TodoTable = ({ todoKeys }: { todoKeys: string[] }) => {
  return (
    <>
      {todoKeys.map((key, index) => {
        return <Row key={key} todoKey={key} rowIndex={index} />
      })}
    </>
  )
}

const TodoList = (): JSX.Element => {
  const keys: string[] = useRecoilValue(todoListState)
  const setAddTodoState = useSetRecoilState(addTodoVisibleState)
  useTodoList()
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
          <TodoTable todoKeys={keys} />
        </div>
      </div>
    </div>
  )
}

export default TodoList
