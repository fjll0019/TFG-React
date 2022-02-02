import httpClient from '../httpClient';

export default function getUsers() {
  try {
    const resp = httpClient.get("//localhost:5000/listUsers")
    const { data = [] } = resp
    if (Array.isArray(data)) {
      const users = data.map(user => {
        const { nombre, email, datos } = user
        return { nombre, email, datos }
      })
      return users
    }
  } catch (error) {
    if (error.response.status === 401) {
    }
  }
}