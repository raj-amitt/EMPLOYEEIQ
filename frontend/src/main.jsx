import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContext from './context/AuthContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </ AuthContext>, //this means that the app will be passed as a children 
)
