import React, { useState } from 'react'
import Button from './Button'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs }) => {
  const [viewMode, setViewMode] = useState('minified') 

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewModeChange = () => {
    setViewMode(viewMode === 'minified' ? 'extended' : 'minified')
  }

  const handleLikeBlog = async () => {
    const modifiedBlog = {...blog, likes: blog.likes + 1}
    const updatedBlog = await blogService.update(modifiedBlog)
    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b).sort((a, b) => a.likes - b.likes))
  }

  const getBlogDescription = () => {
    if (viewMode === 'minified') {
      return (
        <div>
          <strong>{blog.title}</strong> ::: {blog.author} <Button type="button" handler={handleViewModeChange} buttonName={viewMode === 'minified' ? 'view' : 'hide'} />
        </div>
      )
    } else if (viewMode === 'extended') {
      return (
        <div>
          <strong>{blog.title}</strong> ::: {blog.author} <Button type="button" handler={handleViewModeChange} buttonName={viewMode === 'minified' ? 'view' : 'hide'} /><br />
          {blog.url}<br />
          likes {blog.likes} <Button type="button" handler={handleLikeBlog} buttonName='like' /><br /> 
          {blog.user ? blog.user.name : 'not available'}<br />
          {blog.id}
        </div>
      )
    }
  }

  return (
    <div style={blogStyle}>
      {getBlogDescription()}
    </div>
  )
}

export default Blog
