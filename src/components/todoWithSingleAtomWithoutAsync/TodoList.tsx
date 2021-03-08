import React, { useState } from 'react'
import { Button } from 'antd'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  todosState,
  todoListState,
  currentTodoState,
  addTodoVisibleState,
} from 'modules/todoWithSingleAtom.atom'
import styles from './TodoList.module.css'

const useForceUpdate = () => {
  const [, setTick] = useState(0)
  const refreshList = () => {
    setTick((tick) => tick + 1)
  }
  return refreshList
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
