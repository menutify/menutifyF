import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AllContext from './Context/AllContext.jsx'

createRoot(document.getElementById('root')).render(
  <AllContext>
    <GoogleOAuthProvider clientId='470881460994-mrovgi9mk8bmr56o4ptbansrlib03ve0.apps.googleusercontent.com'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </AllContext>
)
