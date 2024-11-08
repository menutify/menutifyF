import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='470881460994-mrovgi9mk8bmr56o4ptbansrlib03ve0.apps.googleusercontent.com'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
)
