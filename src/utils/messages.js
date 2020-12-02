const login = {
  success: () => 'Login success'
}

const logout = {
  success: () => 'Logout success'
}

const models = {
  blog: {
    insert: {
      success: (title, author) => `a new blog ${title} by ${author} added`,
      failure: (errorMsg) => `Failed to insert a new blog. Error: ${errorMsg}`
    }
  }
}

export default {login, logout, models}