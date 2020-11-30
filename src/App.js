import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const LOGGED_IN_USER = 'loggedInUser'

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(LOGGED_IN_USER)
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.loginUser({ username, password })
      window.localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUser(null)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem(LOGGED_IN_USER)
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>

      { user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged in <LogoutButton logoutHandler={handleLogout} /></p>
          {blogList()}
        </div>
      }

      
    </div>
  )
}

export default App