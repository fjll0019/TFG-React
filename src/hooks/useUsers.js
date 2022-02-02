import httpClient from '../httpClient';

const getUsers = async () => {
  try {
    const resp = await httpClient.get("//localhost:5000/listUsers")
    const data = resp.data.usuarios
    if (Array.isArray(data)) {
      const users = data.map(user => {
        const { datos, name, email } = user
        return { datos, name, email }
      })
      return users
    }

  } catch (error) {
    if(error==="Network Error"){
    }else if (error.response.status === 401) {
    }
  }
}

export const useUsers = async() => {

  const datos =[]
  const name =""
  const email = ""
  var usuarios = {datos,name,email}
  await getUsers().then(users => {
      if (Array.isArray(users)) {
        const users2 = users.map(user => {
          const { datos, name, email } = user
          return { datos, name, email }
        })
        usuarios=users2
      }
    })
  return {usuarios}
}