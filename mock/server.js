const express = require('express') // 引入express
const Mock = require('mockjs')
const bodyParser = require('body-parser')

const app = express() // 实例化express

app.use(bodyParser.json())

app.use(function setCrossOrign(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const todos = Mock.mock({
  'todos|10': [
    {
      key: '@guid',
      title: '@ctitle',
    },
  ],
})

app.use('/todos', function listTodo(req, res) {
  res.json(todos)
})

app.use('/addTodo', function addTodo(req, res) {
  const todo = req.body
  todos.todos.push(todo)
  res.json({
    status: 'ok',
  })
})

app.use('/deleteTodo/:id', function deleteTodo(req, res) {
  const { id } = req.params
  todos.todos = todos.todos.filter(({ key }) => {
    return key === id
  })
  res.json({
    status: 'ok',
  })
})

app.use('/updateTodo/:id', function updateTodo(req, res) {
  const { id } = req.params
  const todo = todos.todos.find(({ key }) => {
    return key === id
  })
  todo.title = req.body.title
  res.json({
    status: 'ok',
  })
})

app.listen('8090', () => {
  console.log('监听端口 8090')
})
