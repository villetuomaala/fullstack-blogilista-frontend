import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ blog }) => {
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

  const getBlogDescription = (blog) => {
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
          likes {blog.likes}<br />
          {blog.user ? blog.user.name : 'not available'}<br />
          {blog.id}
        </div>
      )
    }
  }

  return (
    <div style={blogStyle}>
      {getBlogDescription(blog)}
    </div>
  )
}

export default Blog
