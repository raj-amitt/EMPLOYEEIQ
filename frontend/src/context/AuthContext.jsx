import React, {useState, createContext, useContext} from 'react'


const userContext = createContext();
const AuthContext=({children})=> {
    const [user, setUser] = useState(null)
    const login =(user)=>{
        setUser(user)
    }
    const logout = ()=>{
      setUser(null)
      localStorage.removeItem("token");
    }
  return (
    <userContext.Provider value={{user, login, logout}}>
        {children}
    </userContext.Provider>
  )
}
export const useAuth =()=> useContext(userContext) //now we can use this hook in any component to access the uesr context

export default AuthContext
