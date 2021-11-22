import httpClient from '../httpClient';

export default function getUsers() {
  try {
    const resp = httpClient.get("//localhost:5000/listUsers")
    console.log(resp)
    const { data = [] } = resp
    if (Array.isArray(data)) {
      const users = data.map(user => {
        const { nombre, email, datos } = user
        return { nombre, email, datos }
      })
      console.log(users)
      return users
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log("Error: 401")
    }
  }
}