import React from 'react'

const Notification = ({ message, type }) => {

  const styles = {
    success: {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    },
    error: {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }

  if (message === null) {
    return null
  }

  console.log(styles[type])

  return (
    <div style={styles[type]}>
      {message}
    </div>
  )
}

export default Notification