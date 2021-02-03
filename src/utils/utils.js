const getLoggedInUser = () => window.localStorage.getItem('loggedInUser')

const setLoggedInUser = (user) => window.localStorage.setItem('loggedInUser', JSON.stringify(user))

const unsetLoggedInUser = () => window.localStorage.removeItem('loggedInUser')


export default { getLoggedInUser, setLoggedInUser, unsetLoggedInUser }