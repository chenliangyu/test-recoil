import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'
import styles from './App.module.css'
import {
  TodoList as SingleAtomTodoList,
  TodoInfo as SingleAtomTodoInfo,
  AddTodo as SingleAtomAddTod,
} from './components/todoWithSingleAtom'
import {
  TodoList as SingleAtomWithOutAsyncTodoList,
  TodoInfo as SingleAtomWithOutAsyncTodoInfo,
  AddTodo as SingleAtomWithOutAsyncAddTod,
} from './components/todoWithSingleAtomWithoutAsync'
import {
  TodoList as ListAtomTodoList,
  TodoInfo as ListAtomTotoInfo,
  AddTodo as ListAtomAddTodo,
} from './components/todoWithListAtom'

function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('The following atoms were modified:')
    // eslint-disable-next-line no-restricted-syntax
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      // eslint-disable-next-line no-console
      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}

const App = (): JSX.Element => {
  return (
    <Tabs defaultActiveKey="singleAtom">
      <Tabs.TabPane tab="单条记录为独立的 atom" key="singleAtom">
        <RecoilRoot>
          <DebugObserver />
          <div className={styles.page}>
            <div className={styles.left}>
              <SingleAtomTodoList />
            </div>
            <div className={styles.right}>
              <SingleAtomTodoInfo />
            </div>
            <SingleAtomAddTod />
          </div>
        </RecoilRoot>
      </Tabs.TabPane>
      <Tabs.TabPane tab="list 整体是一个 atom" key="listAtom">
        <RecoilRoot>
          <DebugObserver />
          <div className={styles.page}>
            <div className={styles.left}>
              <ListAtomTodoList />
            </div>
            <div className={styles.right}>
              <ListAtomTotoInfo />
            </div>
            <ListAtomAddTodo />
          </div>
        </RecoilRoot>
      </Tabs.TabPane>
      <Tabs.TabPane tab="单独记录为独立的 atom，但不获取远端数据" key="singleAtomWithoutAsync">
        <RecoilRoot>
          <DebugObserver />
          <div className={styles.page}>
            <div className={styles.left}>
              <SingleAtomWithOutAsyncTodoList />
            </div>
            <div className={styles.right}>
              <SingleAtomWithOutAsyncTodoInfo />
            </div>
            <SingleAtomWithOutAsyncAddTod />
          </div>
        </RecoilRoot>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default App
