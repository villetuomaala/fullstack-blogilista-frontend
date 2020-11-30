import React from 'react'

const Button = ({ handler, buttonName ,type}) => (
  <button type={type} onClick={handler}>{buttonName}</button> 
)

export default Button
