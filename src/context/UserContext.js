import React, {useState} from 'react'
import { useEffect } from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
  const [jwt, setJWT] = useState(
    () => sessionStorage.getItem("jwt")
  )

  useEffect(() => {
    if (!jwt){
        console.log("No hay ningun jwt")
    } else{
        console.log(jwt)
    }

    
  }, [jwt])

  return <Context.Provider value={{
    jwt,
    setJWT
  }}>
    {children}
  </Context.Provider>
}

export default Context