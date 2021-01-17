import React, {useState} from 'react'
import Button from './Button'

const BlogForm = ({ submit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      author: author,
      likes: 0,
      url: url,
      title: title
    }

    submit(data)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      title: <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} /><br />
      author: <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
      url: <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} /><br />
      <Button buttonName="create" type="submit" />
    </form>
  )
}

export default BlogForm