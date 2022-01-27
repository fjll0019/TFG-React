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
      //console.log(users)
      return users
    }

  } catch (error) {
    console.log(error)
    if(error==="Network Error"){
      console.log("Error: 500")
    }else if (error.response.status === 401) {
      console.log("Error: 401")
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
  //console.log(usuarios)
  return {usuarios}
}