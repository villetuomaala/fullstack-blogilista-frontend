import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import messages from './utils/messages'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMessageType, setNotificationMessageType] = useState(null)

  const LOGGED_IN_USER = 'loggedInUser'
  const NOTIFICATION_TIMEOUT_MS = 4000

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(LOGGED_IN_USER)
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
      blogService.setToken(JSON.parse(loggedInUser).token)
    }
  }, [])

  const blogPostRef = useRef()

  const showNotification = (type, message, timeout) => {
    setNotificationMessage(message)
    setNotificationMessageType(type)
    setTimeout( () => {
      setNotificationMessage(null)
      setNotificationMessageType(null)
    }, timeout)
  }

  const loginForm = () => (
     <form onSubmit={handleLogin}>
      <div>
        username 
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password 
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogList = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  const blogForm = () => (
    <Togglable buttonLabel="Add new blog" ref={blogPostRef}>
      <BlogForm submit={addBlog} />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.loginUser({ username, password })
      window.localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('success', messages.login.success(), NOTIFICATION_TIMEOUT_MS)
    } catch (error) {
      setUser(null)
      setUsername('')
      setPassword('')
      showNotification('error', error.response.data.error, NOTIFICATION_TIMEOUT_MS)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem(LOGGED_IN_USER)
    setUser(null)
    blogService.setToken(null)
    showNotification('success', messages.logout.success(), NOTIFICATION_TIMEOUT_MS)
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create({
        ...blogObject,
        userId: user.id
      })
      setBlogs(blogs.concat(newBlog))
      blogPostRef.current.toggleVisibility()
      showNotification('success', messages.models.blog.insert.success(newBlog.title, newBlog.author), NOTIFICATION_TIMEOUT_MS)
    } catch (error) {
      showNotification('error', messages.models.blog.insert.failure(error.response.data.error), NOTIFICATION_TIMEOUT_MS)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationMessageType} />

      { user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged in <Button type="button" handler={handleLogout} buttonName="logout" /></p>
          {blogList()}
          <br /> 
          {blogForm()}
        </div>
      }

      
    </div>
  )
}

export default App