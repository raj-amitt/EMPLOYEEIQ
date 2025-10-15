import React, {useState, createContext, useContext, useEffect} from 'react'
import axios from 'axios'

const userContext = createContext();
const AuthContext=({children})=> {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
       const verifyUser = async ()=>{
        try {
          const token = localStorage.getItem("token")
          if(token){
             const response = await axios.get("http://localhost:3000/api/auth/verify",{
            headers:{
              "Authorization": `Bearer ${token}` 
            }
          })
                    console.log(response)

          if(response.data.success){
            setUser(response.data.user);
          }
          }
          else{
            setUser(null);
            setLoading(false);
          }         
        } catch (error) {
          console.log(error)
          if(error.response && error.response.data.error){
            setUser(null); //using useNavigate in useEffect to redirect to login page was giving me errors so we used this method
                    }
        }
        finally{
          setLoading(false);
        }
       }
       verifyUser()
    },[])

    const login =(user)=>{
        setUser(user)
    }
    const logout = ()=>{
      setUser(null)
      localStorage.removeItem("token");
    }
  return (
    <userContext.Provider value={{user, login, logout, loading}}>
        {children}
    </userContext.Provider>
  )
}
export const useAuth =()=> useContext(userContext) //now we can use this hook in any component to access the user context

export default AuthContext
