import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUser(null)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      { user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged in</p>
          {blogList()}
        </div>
      }

      
    </div>
  )
}

export default App